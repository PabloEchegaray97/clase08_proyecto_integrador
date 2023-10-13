export const generateUserErrorInfo = user => {
    return `
Uno o más propiedades están incompletas o son inválidas.
Lista de propiedades obligatorias:
- first_name: Must be a string (${user?.first_name})
- last_name: Must be a string (${user?.last_name})
- email: Must be a string (${user?.email})
    `;
}
export const generateUserLoginErrorInfo = (email) => {
    return `La propiedad email debe ser obligatoria, email: ${email}`
}