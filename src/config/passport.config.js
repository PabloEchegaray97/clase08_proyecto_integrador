import passport from "passport";
import local from 'passport-local'
import UserModel from "../DAO/mongoManager/models/user.model.js";
import GitHubStrategy from 'passport-github2'
import { createHash, isValidPassword } from "../utils.js";

/**
App ID: 379133
Client ID: Iv1.9ab4ba689e8ec607
Secret: 02e811b889132c78baf0d4cd0662be09dd3d0bed
 */

const LocalStrategy = local.Strategy

const initializePassport = () => {

    passport.use('github', new GitHubStrategy(
        {
            clientID: 'Iv1.9ab4ba689e8ec607',
            clientSecret: '02e811b889132c78baf0d4cd0662be09dd3d0bed',
            callbackURL: 'http://127.0.0.1:8080/githubcallback'
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile)

            try {
                const user = await UserModel.findOne({ email: profile._json.email })
                if (user) {
                    console.log('User already exits ' + email)
                    return done(null, user)
                }

                const newUser = {
                    first_name: profile._json.name,
                    email: profile._json.email,
                    password: '',
                    age: 0,
                    last_name: '',
                    role: ''
                }
                const result = await UserModel.create(newUser)
                return done(null, result)
            } catch (e) {
                return done('Error to login wuth github' + e)
            }
        }
    ))

    // register Es el nomber para Registrar con Local
    passport.use('register', new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email'
        },
        async (req, username, password, done) => {
            const { first_name, last_name, age, role, email } = req.body
            try {
                const user = await UserModel.findOne({ email: username })
                if (user) {
                    console.log('User already exits')
                    return done(null, false)
                }

                const newUser = {
                    first_name,
                    last_name,
                    email,
                    password: createHash(password),
                    age,
                    role
                }
                const result = await UserModel.create(newUser)
                return done(null, result)
            } catch (e) {
                return done('Error to register ' + e)
            }
        }
    ))

    // login Es el nomber para IniciarSesion con Local
    passport.use('login', new LocalStrategy(
        { usernameField: 'email' },
        async (username, password, done) => {
            try {
                const user = await UserModel.findOne({ email: username }).lean().exec()
                if (!user) {
                    console.error('User doesnt exist')
                    return done(null, false)
                }

                if (!isValidPassword(user, password)) {
                    console.error('Password not valid')
                    return done(null, false)
                }

                return done(null, user)
            } catch (e) {
                return done('Error login ' + error)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id)
        done(null, user)
    })

}

export default initializePassport
