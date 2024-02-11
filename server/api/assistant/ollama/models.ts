import ollama from 'ollama'

export default defineEventHandler(async () => {
    try {
        const llamas = await ollama.list()
        return llamas.models
    }
    catch (error) {
        console.error(error)
        return { error: error?.message }
    }
})
