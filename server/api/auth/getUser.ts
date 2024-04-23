async function getUser(username: string) {
 return { username, password: "admin", email: "admin@email.com" };
}

export default defineEventHandler(async (event) => {
 try {
  const username = await readBody(event);
  console.info("User", username);

  const result = await getUser(username);
  console.info(result);
  if (!result) return { error: "User doesn`t exist" };

  return { success: true, username };
 } catch (error: ToDoType) {
  return { error: error.message };
 }
});
