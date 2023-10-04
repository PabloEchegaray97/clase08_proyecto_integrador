import passport from "passport";
import local from 'passport-local'
import UserModel from "../DAO/mongo/models/user.model.js";
import GitHubStrategy from 'passport-github2'
import { createHash, isValidPassword } from "../utils.js";
//
import jwt from 'passport-jwt'
import { userService } from '../services/index.js'


/**
App ID: 379133
Client ID: Iv1.9ab4ba689e8ec607
Secret: 02e811b889132c78baf0d4cd0662be09dd3d0bed
 */
const LocalStrategy = local.Strategy
//
const JWTStrategy = jwt.Strategy // La estrategia de JWT
export const ExtractJWT = jwt.ExtractJwt // La funcion de extraccion

export const cookieExtractor = req => {
    const token = (req?.cookies) ? req.cookies['coderCookie'] : null

    console.log('COOKIE EXTRACTOR: ', token)
    return token
}
//

const initializePassport = () => {

    //jwt
    passport.use(
        'jwt',
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
                secretOrKey: 'coderTokenForJWT'
            },
            async (jwt_payload, done) => {

                try {
                    return done(null, jwt_payload)
                } catch (e) {
                    return done(e)
                }
            })
    )
    //
    passport.use('github', new GitHubStrategy(
        {
            clientID: 'Iv1.9ab4ba689e8ec607',
            clientSecret: '02e811b889132c78baf0d4cd0662be09dd3d0bed',
            callbackURL: 'http://localhost:8080/api/session/ghcallback'
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile)

            try {
                const user = await userService.getUser({ email: profile._json.email })
                if (user) {
                    console.log('User already exits ' + profile._json.email)
                    return done(null, user)
                }

                const newUser = {
                    first_name: profile._json.name,
                    email: profile._json.email,
                    password: '',
                }
                const result = await userService.createUser(newUser)
                return done(null, result)
            } catch (e) {
                return done('Error logging with github' + e)
            }
        }
    ))

    passport.use('register', new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email'
        },
        async (req, username, password, done) => {
            const { first_name, last_name, age, role, email } = req.body
            try {
                console.log(username);
                const user = await userService.getUser({ email: username })
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
                    role,
                }
                const result = await userService.createUser(newUser)
                return done(null, result)
            } catch (e) {
                return done('Error registering ' + e)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await userService.getUserById(id) 
        done(null, user)
    })

}

export default initializePassport
