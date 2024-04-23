/**
 * Calculate the greatest common divisor (GCD) of two numbers.
 * @param a - The first number.
 * @param b - The second number.
 * @returns The GCD of a and b.
 */
export function gcd(a: number, b: number): number {
 // Use the Euclidean algorithm to find the GCD
 while (b !== 0) {
  const t = b;
  b = a % b;
  a = t;
 }
 return a;
}

/**
 * Converts an aspect ratio string into its nearest 1-digit equivalent.
 * @param ratio - The aspect ratio in 'x:y' format.
 * @returns The nearest 1-digit aspect ratio as a string.
 */
export function nearestOneDigitAspectRatio(ratio: string): string {
 // check if the string contains ':'
 if (!ratio.includes(":")) throw new Error("Invalid aspect ratio string.");

 // Split the input string by ':' and convert to numbers
 const [x, y] = ratio.split(":").map(Number);

 // Compute the GCD of x and y
 const divisor = gcd(x, y);

 // Simplify the ratio by dividing both x and y by the GCD
 const simplifiedX = x / divisor;
 const simplifiedY = y / divisor;

 // Determine the scale to reduce the ratio to single digits
 const scale = Math.max(
  Math.floor(simplifiedX / 10) + 1,
  Math.floor(simplifiedY / 10) + 1,
 );

 // Apply the scale to both parts of the ratio
 const nearestX = Math.floor(simplifiedX / scale);
 const nearestY = Math.floor(simplifiedY / scale);

 // Construct and return the simplified ratio string
 return `${nearestX}:${nearestY}`;
}
