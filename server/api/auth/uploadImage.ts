import { defineEventHandler } from 'h3'
import { serverSupabaseClient } from '#supabase/server'

// https://twitter.com/MiguelSarenas/status/1749492415210070324
export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  try {
    const { bucketName, fileName, imageBuffer } = await readBody(event)
    // https://supabase.com/docs/guides/storage
    const { data, error } = await client.storage
      .from(bucketName)
      .upload(fileName, imageBuffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'image/png',
      })

    console.info(data, error)
    if (error)
      throw new Error(error.message)
    return { success: true, data }
  }
  catch (error: ToDoType) {
    return { error: error.message }
  }
})
