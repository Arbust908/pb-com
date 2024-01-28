const login = async (user: string, password: string) => {
    const validUser = 'devuser';
    const validPassword = 'devpassword';

    if (user === validUser && password === validPassword) {
        const newUser = { user, expiration: new Date(Date.now() + 86400000)};
        
        return { success: true, user: newUser };
    }
    return { error: 'Invalid credentials' };
}

export default defineEventHandler(async (event) => {
    const { user, password } = await readBody(event)

    if (!user || !password)
        return { error: 'We need Email and Password to login' }

    const loginResult = await login(user, password)

    if (loginResult.error)
        return { error: loginResult.error }

    return { success: true, user }
})
