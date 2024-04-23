export default defineEventHandler(async (event) => {
 const titleWithId = [
  ["Berserk", "801513ba-a712-498c-8f57-cae55b38cc92"],
  ["Jujutsu Kaisen", "c52b2ce3-7f95-469c-96b0-479524fb7a1a"],
  ["Dandadan", "68112dc1-2b80-4f20-beb8-2f2a8716a430"],
  ["Sousou No Frieren", "b0b721ff-c388-4486-aa0f-c2b0bb321512"],
  ["Kanan Sama Wa Akumade Choroi", "0e2cb981-70c8-4229-aff7-6be966852b03"],
  ["Rōninsei to Erōiyatsu", "6ab74d2b-9e71-4fb1-b148-31e08376f1ec"],
 ];

 const baseUrl = "https://api.mangadex.dev"; // 'https://api.mangadex.org'

 const fetchPromises = titleWithId.map(([title, id]) => {
  return $fetch(`${baseUrl}/manga/${id}`, {
   method: "GET",
  })
   .then((res) => {
    if (res.result === "ok") return { title, data: res.data };
   })
   .catch((err) => {
    console.error(err);
   });
 });

 const responses = await Promise.all(fetchPromises);

 return responses;
});
