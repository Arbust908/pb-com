import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
 const saltRounds = 10; // You can adjust the salt rounds based on your security requirement
 try {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
 } catch (error) {
  console.error("Error hashing password", error);
  throw error; // or handle error as per your application's error handling policy
 }
}

export async function verifyPassword(
 plainPassword: string,
 hashedPassword: string,
) {
 try {
  return await bcrypt.compare(plainPassword, hashedPassword);
 } catch (error) {
  console.error("Error verifying password", error);
  throw error; // or handle error accordingly
 }
}
