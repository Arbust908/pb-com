import { defineEventHandler } from 'h3'
import { serverSupabaseClient } from '#supabase/server'
import { ToDoType } from '~/types'

/* import { z } from 'zod' */
/* const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
}) */
/* 
1. draw a canvas with all your dots (dots, should be 2px by 2px and a ref variable so it can be changed and should be separated by 8px on both axis)
2. generate a perlin noise (i used http://kitfox.com/projects/perlinNoiseMaker/)
3. add `mask-image: url('/perlin-noise.webp');` to the canvas
4. add keyframes to translate the position of the perlin noise (`-webkit-mask-position: 0px 0px`)
Remember to to use Vue3, Script Setup Syntax and lang='ts'
*/

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  try {
    const user = await readBody(event)
    console.log(user)
    const { data, error } = await client.auth.signUp(user)

    console.info(data, error)
    if (error)
      throw new Error(error.message)

    return { success: true, data }
  }
  catch (error: ToDoType) {
    return { error: error.message }
  }
})
