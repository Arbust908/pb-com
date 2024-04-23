const startAt = Date.now();

/* Signed URL w Supabase
// https://twitter.com/john_komarnicki/status/1744084581844705452
const {data} = await client.storage
  .from("private-bucket")
  .createSignedUrl("my-private-file.png", 60, {
    // with a custom file name & transform
    download: `${dynamicValue}.photo.png`,
    transform: {
      width: 100,
      height: 100,
    },
  })

  // original window.location = data.signedURL
window.location.href = data.signedURL
*/

export default defineEventHandler(() => ({
 startAt,
 uptime: Date.now() - startAt,
 msg: "Hello from H3!",
}));
