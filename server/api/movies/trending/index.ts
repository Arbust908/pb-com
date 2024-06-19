export default defineEventHandler(async (event) => {
    const timeWindow = await getQuery(event)
    console.log(timeWindow)

     return {
        "page": 1,
        "results": [
          {
            "backdrop_path": "/3TNSoa0UHGEzEz5ndXGjJVKo8RJ.jpg",
            "id": 614933,
            "original_title": "Atlas",
            "overview": "A brilliant counterterrorism analyst with a deep distrust of AI discovers it might be her only hope when a mission to capture a renegade robot goes awry.",
            "poster_path": "/bcM2Tl5HlsvPBnL8DKP9Ie6vU4r.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Atlas",
            "original_language": "en",
            "genre_ids": [
              878,
              28
            ],
            "popularity": 2334.605,
            "release_date": "2024-05-23",
            "video": false,
            "vote_average": 6.702,
            "vote_count": 494
          },
          {
            "backdrop_path": "/u1CqlLecfpcuOaugKi3ol9gDQHJ.jpg",
            "id": 95842,
            "original_name": "庆余年",
            "overview": "Zhang Qing, a present-day college student in culture and history major wants to study in professor Ye's postgraduate class, so he decides to write a historical fiction to elaborate his perspective of analyzing ancient literature history with modern concept. In the fiction, Zhang himself acts as a young man Fan Xian with mysterious life who lives in a remote seaside town of Kingdom Qing in his childhood, under the help of a mysterious mentor and a blindfolded watchman. Fan goes to the capital when he grows up, where he experiences plenty of ordeal and temper. Fan persists in adhering the rule of justice and goodness and lives his own glorious life.",
            "poster_path": "/vlHJfLsduZiILN8eYdN57kHZTcQ.jpg",
            "media_type": "tv",
            "adult": false,
            "name": "Joy of Life",
            "original_language": "zh",
            "genre_ids": [
              18,
              35
            ],
            "popularity": 420.719,
            "first_air_date": "2019-11-26",
            "vote_average": 8.101,
            "vote_count": 69,
            "origin_country": [
              "CN"
            ]
          },
          {
            "backdrop_path": "/shrwC6U8Bkst9T9J7fr1A50n6x6.jpg",
            "id": 786892,
            "original_title": "Furiosa: A Mad Max Saga",
            "overview": "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland they come across the Citadel presided over by The Immortan Joe. While the two Tyrants war for dominance, Furiosa must survive many trials as she puts together the means to find her way home.",
            "poster_path": "/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Furiosa: A Mad Max Saga",
            "original_language": "en",
            "genre_ids": [
              28,
              12,
              878
            ],
            "popularity": 1053.787,
            "release_date": "2024-05-22",
            "video": false,
            "vote_average": 7.723,
            "vote_count": 566
          },
          {
            "backdrop_path": "/z121dSTR7PY9KxKuvwiIFSYW8cf.jpg",
            "id": 929590,
            "original_title": "Civil War",
            "overview": "In the near future, a group of war journalists attempt to survive while reporting the truth as the United States stands on the brink of civil war.",
            "poster_path": "/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Civil War",
            "original_language": "en",
            "genre_ids": [
              10752,
              28,
              18
            ],
            "popularity": 2953.978,
            "release_date": "2024-04-10",
            "video": false,
            "vote_average": 7.145,
            "vote_count": 1155
          },
          {
            "backdrop_path": "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
            "id": 823464,
            "original_title": "Godzilla x Kong: The New Empire",
            "overview": "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
            "poster_path": "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Godzilla x Kong: The New Empire",
            "original_language": "en",
            "genre_ids": [
              878,
              28,
              12
            ],
            "popularity": 2706.072,
            "release_date": "2024-03-27",
            "video": false,
            "vote_average": 7.245,
            "vote_count": 2407
          },
          {
            "backdrop_path": "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
            "id": 693134,
            "original_title": "Dune: Part Two",
            "overview": "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
            "poster_path": "/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Dune: Part Two",
            "original_language": "en",
            "genre_ids": [
              878,
              12
            ],
            "popularity": 836.038,
            "release_date": "2024-02-27",
            "video": false,
            "vote_average": 8.167,
            "vote_count": 4256
          },
          {
            "backdrop_path": "/fY3lD0jM5AoHJMunjGWqJ0hRteI.jpg",
            "id": 940721,
            "original_title": "ゴジラ-1.0",
            "overview": "In postwar Japan, Godzilla brings new devastation to an already scorched landscape. With no military intervention or government help in sight, the survivors must join together in the face of despair and fight back against an unrelenting horror.",
            "poster_path": "/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Godzilla Minus One",
            "original_language": "ja",
            "genre_ids": [
              878,
              27,
              28
            ],
            "popularity": 1006.167,
            "release_date": "2023-11-03",
            "video": false,
            "vote_average": 7.658,
            "vote_count": 1288
          },
          {
            "backdrop_path": "/tkHQ7tnYYUEnqlrKuhufIsSVToU.jpg",
            "id": 437342,
            "original_title": "The First Omen",
            "overview": "When a young American woman is sent to Rome to begin a life of service to the church, she encounters a darkness that causes her to question her own faith and uncovers a terrifying conspiracy that hopes to bring about the birth of evil incarnate.",
            "poster_path": "/uGyiewQnDHPuiHN9V4k2t9QBPnh.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "The First Omen",
            "original_language": "en",
            "genre_ids": [
              27
            ],
            "popularity": 1667.008,
            "release_date": "2024-04-03",
            "video": false,
            "vote_average": 6.808,
            "vote_count": 300
          },
          {
            "backdrop_path": "/tkqsrARBZnWnKqv2O8n4PYry1LS.jpg",
            "id": 239770,
            "original_name": "Doctor Who",
            "overview": "The Doctor and his companion travel across time and space encountering incredible friends and foes.",
            "poster_path": "/8FHthx4Vu81J4X5BTLhJYK9Gtbs.jpg",
            "media_type": "tv",
            "adult": false,
            "name": "Doctor Who",
            "original_language": "en",
            "genre_ids": [
              10759,
              18,
              10765
            ],
            "popularity": 287.397,
            "first_air_date": "2024-05-11",
            "vote_average": 6.375,
            "vote_count": 72,
            "origin_country": [
              "GB"
            ]
          },
          {
            "backdrop_path": "/4CcUgdiGe83MeqJW1NyJVmZqRrF.jpg",
            "id": 937287,
            "original_title": "Challengers",
            "overview": "Tennis player turned coach Tashi has taken her husband, Art, and transformed him into a world-famous Grand Slam champion. To jolt him out of his recent losing streak, she signs him up for a \"Challenger\" event — close to the lowest level of pro tournament — where he finds himself standing across the net from his former best friend and Tashi's former boyfriend.",
            "poster_path": "/H6vke7zGiuLsz4v4RPeReb9rsv.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Challengers",
            "original_language": "en",
            "genre_ids": [
              10749,
              18
            ],
            "popularity": 461.116,
            "release_date": "2024-04-18",
            "video": false,
            "vote_average": 7.3,
            "vote_count": 837
          },
          {
            "backdrop_path": "/oavbmL3iddJUmC8nQjL6bLHwAP4.jpg",
            "id": 719221,
            "original_title": "Tarot",
            "overview": "When a group of friends recklessly violate the sacred rule of Tarot readings, they unknowingly unleash an unspeakable evil trapped within the cursed cards. One by one, they come face to face with fate and end up in a race against death.",
            "poster_path": "/gAEUXC37vl1SnM7PXsHTF23I2vq.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Tarot",
            "original_language": "en",
            "genre_ids": [
              27,
              53
            ],
            "popularity": 2019.501,
            "release_date": "2024-05-01",
            "video": false,
            "vote_average": 6.511,
            "vote_count": 226
          },
          {
            "backdrop_path": "/H5HjE7Xb9N09rbWn1zBfxgI8uz.jpg",
            "id": 746036,
            "original_title": "The Fall Guy",
            "overview": "Fresh off an almost career-ending accident, stuntman Colt Seavers has to track down a missing movie star, solve a conspiracy and try to win back the love of his life while still doing his day job.",
            "poster_path": "/tSz1qsmSJon0rqjHBxXZmrotuse.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "The Fall Guy",
            "original_language": "en",
            "genre_ids": [
              28,
              35
            ],
            "popularity": 1538.371,
            "release_date": "2024-04-24",
            "video": false,
            "vote_average": 7.311,
            "vote_count": 930
          },
          {
            "backdrop_path": "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
            "id": 653346,
            "original_title": "Kingdom of the Planet of the Apes",
            "overview": "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
            "poster_path": "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Kingdom of the Planet of the Apes",
            "original_language": "en",
            "genre_ids": [
              878,
              12,
              28
            ],
            "popularity": 8691.608,
            "release_date": "2024-05-08",
            "video": false,
            "vote_average": 6.948,
            "vote_count": 738
          },
          {
            "backdrop_path": "/5fWxvjOUvtUoSmiMEpFl77V6KZV.jpg",
            "id": 196322,
            "original_name": "Dark Matter",
            "overview": "Jason Dessen is abducted into an alternate version of his life. To get back to his true family, he embarks on a harrowing journey to save them from the most terrifying foe imaginable: himself.",
            "poster_path": "/c6MRUtPk0nEPQ9FBD9RdRKt2rIm.jpg",
            "media_type": "tv",
            "adult": false,
            "name": "Dark Matter",
            "original_language": "en",
            "genre_ids": [
              18,
              9648,
              10765
            ],
            "popularity": 440.68,
            "first_air_date": "2024-05-07",
            "vote_average": 7.881,
            "vote_count": 80,
            "origin_country": [
              "US"
            ]
          },
          {
            "backdrop_path": "/2eX8Lx5VAl7ZKhwd5WOuGYwa3PW.jpg",
            "id": 217667,
            "original_name": "Eric",
            "overview": "A desperate father battles his demons on the vibrant, dangerous, and intoxicating streets of '80s New York in a race to bring home his missing son.",
            "poster_path": "/9OV6McrRh1BAnrak3yVP9xYuUId.jpg",
            "media_type": "tv",
            "adult": false,
            "name": "Eric",
            "original_language": "en",
            "genre_ids": [
              18,
              9648
            ],
            "popularity": 300.934,
            "first_air_date": "2024-05-30",
            "vote_average": 7.4,
            "vote_count": 27,
            "origin_country": [
              "GB"
            ]
          },
          {
            "backdrop_path": "/wODqakS0jinTUECNS6n4VomQbew.jpg",
            "id": 967847,
            "original_title": "Ghostbusters: Frozen Empire",
            "overview": "When the discovery of an ancient artifact unleashes an evil force, Ghostbusters new and old must join forces to protect their home and save the world from a second Ice Age.",
            "poster_path": "/e1J2oNzSBdou01sUvriVuoYp0pJ.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Ghostbusters: Frozen Empire",
            "original_language": "en",
            "genre_ids": [
              14,
              12,
              35
            ],
            "popularity": 458.556,
            "release_date": "2024-03-20",
            "video": false,
            "vote_average": 6.65,
            "vote_count": 904
          },
          {
            "backdrop_path": "/vcFW09U4834DyFOeRZpsx9x1D3S.jpg",
            "id": 57243,
            "original_name": "Doctor Who",
            "overview": "The Doctor is a Time Lord: a 900 year old alien with 2 hearts, part of a gifted civilization who mastered time travel. The Doctor saves planets for a living—more of a hobby actually, and the Doctor's very, very good at it.",
            "poster_path": "/4edFyasCrkH4MKs6H4mHqlrxA6b.jpg",
            "media_type": "tv",
            "adult": false,
            "name": "Doctor Who",
            "original_language": "en",
            "genre_ids": [
              10759,
              18,
              10765
            ],
            "popularity": 637.198,
            "first_air_date": "2005-03-26",
            "vote_average": 7.5,
            "vote_count": 2898,
            "origin_country": [
              "GB"
            ]
          },
          {
            "backdrop_path": "/1m1rXopfNDVL3UMiv6kriYaJ3yE.jpg",
            "id": 882059,
            "original_title": "Boy Kills World",
            "overview": "When his family is murdered, a deaf-mute named Boy escapes to the jungle and is trained by a mysterious shaman to repress his childish imagination and become an instrument of death.",
            "poster_path": "/25JskXmchcYwj3jHRmcPm738MpB.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Boy Kills World",
            "original_language": "en",
            "genre_ids": [
              28,
              53,
              80,
              878
            ],
            "popularity": 1199.941,
            "release_date": "2024-04-24",
            "video": false,
            "vote_average": 6.833,
            "vote_count": 168
          },
          {
            "backdrop_path": "/ySgY4jBvZ6qchrxKnBg4M8tZp8V.jpg",
            "id": 1111873,
            "original_title": "Abigail",
            "overview": "A group of criminals kidnaps a teenage ballet dancer, the daughter of a notorious gang leader, in order to obtain a ransom of $50 million, but over time, they discover that she is not just an ordinary girl. After the kidnappers begin to diminish, one by one, they discover, to their increasing horror, that they are locked inside with an unusual girl.",
            "poster_path": "/5gKKSoD3iezjoL7YqZONjmyAiRA.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Abigail",
            "original_language": "en",
            "genre_ids": [
              27,
              53
            ],
            "popularity": 413.489,
            "release_date": "2024-04-18",
            "video": false,
            "vote_average": 6.843,
            "vote_count": 623
          },
          {
            "backdrop_path": "/2rmK7mnchw9Xr3XdiTFSxTTLXqv.jpg",
            "id": 37854,
            "original_name": "ワンピース",
            "overview": "Years ago, the fearsome Pirate King, Gol D. Roger was executed leaving a huge pile of treasure and the famous \"One Piece\" behind. Whoever claims the \"One Piece\" will be named the new King of the Pirates.\n\nMonkey D. Luffy, a boy who consumed a \"Devil Fruit,\" decides to follow in the footsteps of his idol, the pirate Shanks, and find the One Piece. It helps, of course, that his body has the properties of rubber and that he's surrounded by a bevy of skilled fighters and thieves to help him along the way.\n\nLuffy will do anything to get the One Piece and become King of the Pirates!",
            "poster_path": "/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg",
            "media_type": "tv",
            "adult": false,
            "name": "One Piece",
            "original_language": "ja",
            "genre_ids": [
              10759,
              35,
              16
            ],
            "popularity": 170.387,
            "first_air_date": "1999-10-20",
            "vote_average": 8.727,
            "vote_count": 4463,
            "origin_country": [
              "JP"
            ]
          }
        ],
        "total_pages": 1000,
        "total_results": 20000
      }
});
