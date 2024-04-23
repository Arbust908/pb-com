export default defineEventHandler(async (event) => {
 try {
  const { email, password } = await readBody(event);

  if (!email || !password)
   return { error: "We need Email and Password to login" };

  // Use serverSupabaseServiceRole to perform login logic
  const loginResult = await serverSupabaseServiceRole.login(email, password);

  if (loginResult.error) return { error: loginResult.error };

  return { success: true, user };
 } catch (error) {
  return { error: error.message };
 }
});
