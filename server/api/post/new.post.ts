export default defineEventHandler(async () => {
 /* const user = await prisma.user.create({
    data: {
      name: 'Pancho',
      email: 'yo@panchoblanco.com',
      password: '123456',
    },
  })
  const tag = await prisma.tag.create({
    data: {
      name: 'Tech',
      description: 'Tech related posts',
      image: 'https://picsum.photos/200/300',
    },
  })

  const content = JSON.stringify({
    a: {
      '@aria-current': 'page',
      '@href': '/blog/',
      '@class': 'router-link-active router-link-exact-active rounded bg-slate-300 dark:bg-slate-700 hover:shadow-xl hover:bg-slate-400 dark:hover:bg-slate-600 transition transform hover:scale-105',
      '@data-v-d75a0a44': '',
      'div': [
        {
          '@class': 'h-24 w-full bg-gradient-to-tl from-rose-500 to-violet-500 rounded-t',
          '@data-v-d75a0a44': '',
        },
        {
          '@class': 'p-3',
          '@data-v-d75a0a44': '',
          'h2': {
            '@class': 'font-bold mb-2',
            '@data-v-d75a0a44': '',
            '#text': 'Nuevo Sitio',
          },
          'p': {
            '@class': 'leading-none',
            '@data-v-d75a0a44': '',
            '#text': 'Nuevamente empezamos con otro sitio con nueva tecnologia y mucha nuevas cosas',
          },
        },
      ],
    },
  })

  const post = await prisma.post.create({
    data: {
      title: 'How to use Prisma',
      content,
      published: true,
      description: 'Prisma is a toolkit for building database schemas',
      cover: 'https://picsum.photos/200/300',
      authorId: user.id,
    },
    include: {
      author: true,
      tags: true,
    },
  })

  await prisma.tagsOnPosts.create({
    data: {
      tagId: tag.id,
      postId: post.id,
    },
  }) */

 return "post";
});
