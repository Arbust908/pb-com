import { useScheduler } from '#scheduler'

export default defineNitroPlugin(() => {
  /* startScheduler() */
})

const mangaUrlList = [
    `https://w15.mangafreak.net/Manga/Berserk`,
    'https://w15.mangafreak.net/Manga/Jujutsu_Kaisen',
    'https://w15.mangafreak.net/Manga/Dandadan',
    'https://w15.mangafreak.net/Manga/Sousou_No_Frieren',
    'https://w15.mangafreak.net/Manga/Kanan_Sama_Wa_Akumade_Choroi',
]

function startScheduler() {
  const scheduler = useScheduler()

  scheduler.run(() => {
    console.info('cool beans! I run every Hour! 😀', new Date().toISOString())
  }).hourly()

  // create as many tasks as you want here
  /*  everySecond
 everySeconds
 everyMinute
 everyMinutes
 everyTwoMinutes
 everyThreeMinutes
 everyFourMinutes
 everyFiveMinutes
 everyTenMinutes
 everyFifteenMinutes
 everyThirtyMinutes
 hourly
 hourlyAt
 everyOddHour
 everyHours
 everyTwoHours
 everyThreeHours
 everyFourHours
 everySixHours
 daily
 dailyAt
 everyDays
 weekly
 quarterly
 yearly */
}
