<template>

  <Navbar />
  <main class=" w-full  flex flex-col items-center justify-start bg-[#edf1f6] b-black pt-[115px]">
    <div class="w-full desktop:w-[1344px] tablet:w-[992px] flex space-x-0 tablet:space-x-5 ">
      <p class=" font-bold text-sm opacity-40 my-2">
        Soccer live scores and today schedule
      </p>
    </div>
    <div class="w-full desktop:w-[1344px] tablet:w-[992px] flex items-start space-x-0 tablet:space-x-5 ">
      <div class=" w-[25%] hidden tablet:block  rounded-2xl  space-y-5">
        <div class="MYDeg bg-white rounded-2xl">
          <calendar :attributes="attributes" style="width: 100%; border: 0px; border-radius: 16px; background: white; 
              font-family: 'Sofascore Sans', 'Arial Unicode MS', -apple-system, BlinkMacSystemFont, 
                           'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 
                           'Segoe UI Symbol';" />
          <div class="flex space-x-2 items-center py-3 px-2">
            <div class="w-2 h-2 rounded-full bg-blue-600"></div>
            <p class=" font-thin opacity-70 text-[12px] text-gray-400">Days with your Pinned leagues matches.</p>
          </div>
          <div class="w-full h-[1px] bg-gray-200"></div>
          <div class=" p-6 flex">
            <div class="bg-blue-600  rounded-[30px] px-2 py-0.5 text-white text-[12px]">Today</div>
          </div>
        </div>

        <TopLeagues />
        <AllLeagues />
      </div>
      <div class="MYDeg w-[100%] tablet:w-[42%]   bg-[#ffffff] p-2  rounded-2xl   ">
        <div class="flex justify-between items-center">
          <div class="border-[2px] flex   rounded-2xl space-x-8 font-semibold text-lg bg-[#edf1f6]">
            <div class="text-green-500 border-[1px] border-green-500 rounded-3xl py-1 px-4 -m-[2px]">
              ALL
            </div>
            <div class="text-red-600 p-1 flex items-center space-x-2">
              <div class="w-2 h-2 rounded-full bg-red-600"></div>
              <div class="">
                LIVE(62)
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div class="">
              Show adds
            </div>
            <img class="w-5 h-5" src='/src/assets/ball.svg'>
          </div>
        </div>
        <div class="w-full bg-[#f5f6f9] mt-2">
          <div class="p-4 font-bold opacity-65">
            Pinned Leagues
          </div>
          <div v-if="!waitdata" v-for="(match, index) in [1, 2, 3, 4, 5, 6, 7, 8]" :key="index"
            class=" border-b-[0.5px] p-4 ">
            <div class="animate-pulse flex space-x-4">
              <div class=" space-y-2">
                <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                <div class="bg-slate-200 h-2 w-10"></div>
                <div class="bg-slate-200 h-2 w-10"></div>
              </div>
              <div class="flex-1 space-y-6 py-">
                <div class="h-2 w-1/3 bg-slate-200 rounded"></div>
                <div class="h-2 w-2/5 bg-slate-200 rounded"></div>
                <div class="space-y-3">
                  <div class="grid grid-cols-5 gap-4">
                    <div class="h-2 bg-slate-200 rounded col-start-1 col-end-3"></div>
                    <div class="h-2 bg-slate-200 rounded col-start-1 col-end-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="waitdata" v-for="(match, index) in matches" :key="index"
            class="border-b-[1px] border-[#b8b9bda7] p-1 w-full space-y-2 text-[14px]">
            <div class="w-full flex space-x-3  ">
              <div class="w-[20%] flex justify-center items-center ">
                <img class="w-5 h-5" src='/src/assets/morocco.png'>
              </div>
              <div class="w-full border-r-[1px] border-[#b8b9bda7] pr-3">
                <p class=" opacity-40"> {{ match.country }}</p>
                <p class=" opacity-80 font-semibold"> {{ match.league }}</p>
              </div>
              <div class="w-[10%] flex  justify-center items-center   ">
                <img class="w-5 h-5 mr-2" src='/src/assets/ball.svg'>
              </div>
            </div>
            <button class=" w-full flex items-center space-x-3 hover:bg-slate-200">
              <div
                class="w-[20%] text-[12px]  flex flex-col justify-center items-center border-r-[1px] border-[#b8b9bda7] opacity-50 ">
                <p class=" whitespace-nowrap">{{ match.date }}</p>
                <p>-</p>
              </div>
              <div class="w-full   flex flex-col  items-start border-r-[1px]  border-[#b8b9bda7]  text-[14px]">
                <div class="flex space-x-1 items-center ">
                  <img class="w-5 h-5" src='/src/assets/club.png'>
                  <div class="opacity-80">
                    {{ match.club1 }}
                  </div>
                </div>
                <div class="flex space-x-1 items-center">
                  <img class="w-5 h-5" src='/src/assets/club2.png'>
                  <div class=" opacity-80">
                    {{ match.club2 }}
                  </div>
                </div>
              </div>
              <div class="w-[10%] flex justify-center ">
                <img class="w-5 h-5 mr-2" src='/src/assets/ball.svg'>
              </div>
            </button>
            <div>

            </div>

          </div>
          <div class="w-full flex justify-center p-4">
            <p class="py-1 px-2 bg-blue-700 rounded-xl text-white font-semibold text-[14px]">
              Show All Matches
            </p>
          </div>
        </div>


      </div>
      <div class=" w-[33%] hidden tablet:block  rounded-2xl  space-y-5">

        <!-- Highlights -->
        <div class="MYDeg w-full bg-[#ffffff] rounded-2xl p-3">
          <p>Highlights</p>
          <div class="flex overflow-hidden space-x-2">
            <div v-for="(item, index) in Highlights" class=" rounded-xl">
              <!-- <div class=" absolute">
              </div> -->
              <div class="w-[88px] h-[140px] relative">
                <div
                  class="absolute top-1 left-1 bg-blue-400 text-white font-medium py-[2px] px-2.5 text-[9px] rounded-xl">
                  NEW
                </div>
                <img class=" object-cover   w-full h-full rounded-xl" src="/src/assets/messi-ronaldo.png">
                <div
                  class="absolute  Z2 -bottom-7 h-1/2 w-full left-1 text-sm text-white font text-ellipsis overflow-hidden">
                  {{ item.match }}
                </div>
                <div class="MFDeg Z1 w-full h-10 bottom-0 absolute  rotate-180 opacity-60  rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Featured Match -->
        <div class="MYDeg w-full bg-[#ffffff] rounded-2xl p-3 space-y-2 pb-6">
          <p class="font-semibold">Featured Match</p>
          <div class="flex  bg-[#f5f6f9] p-1.5 rounded-xl">
            <div class="w-1/3 flex flex-col justify-center items-center">
              <img class="h-12" src="/src/assets/club.png">
              <p class="">Monza</p>
            </div>
            <div class="w-1/3 flex justify-center items-center flex-col text-red-700">
              <p class="font-bold text-3xl">
                0 - 0
              </p>
              <div class="font-semibold">1st half</div>
            </div>
            <div class="w-1/3 flex flex-col justify-center items-center">
              <img class="h-12" src="/src/assets/club2.png">
              <p class="">Cagliari</p>
            </div>
          </div>
          <div class=" bg-gradient-to-r from-[#cde5df] via-[#f1f1f1] to-[#cde5df] p-1.5 rounded-xl space-y-3  ">
            <div class="flex justify-between text-[12px]">
              <div class="space-x-1"><span>Full time</span><span class="text-orange-600">Live</span></div>
              <div class="bg-green-700 rounded-[5px] px-[8px] py-[2px] font-medium text-[12px]"><span
                  class="text-white">bet</span><span class="text-yellow-300">365</span></div>
            </div>
            <div class="flex space-x-2 ">
              <div v-for="(item) in ['1', 'X', '2']"
                class="MYDeg w-1/3 text-[12px] font-bold flex flex-col justify-center items-center bg-white">
                <div class=" opacity-40">
                  {{ item }}
                </div>
                <div class="flex justify-center items-center">
                  <img class="h-3" src="/src/assets/club.png">
                  <p>2.30</p>
                </div>
              </div>
            </div>
            <div class="flex justify-between text-[11px]  opacity-80">
              <div class="text-slate-500">Gamble responsibly 18+</div>
              <button class=" rounded-[5px] px-[8px] py-[2px] font-medium text-blue-600">
                Show more
              </button>
            </div>
          </div>
        </div>
        <!-- Top players -->

        <div class="MYDeg w-full bg-[#ffffff] rounded-2xl  space-y-2 ">
          <div class=" text-slate-800 p-3 border-b-[1px] border-gray-300">
            <p class=" text-[20px]">Top players</p>
            <p class=" text-gray-900 text-sm opacity-35">Best rated players from recent matches</p>
          </div>
          <div class="">
            <div v-for="(item, index) in topPlayers.slice(0, 1) "
              class="flex space-x-2 items-center   px-2 text-gray-900 text-opacity-75">
              <div class="text-[12px]">{{ index + 1 }}</div>
              <div class=" w-14  relative">
                <img class=" object-contain rounded-full" src="/src/assets/messi.jpg" alt="">
                <img class=" absolute  bottom-0 right-0 w-5" src="/src/assets/club.png" alt="">
              </div>
              <div class="w-full flex  items-center  p-2">
                <div class="w-full flex flex-col justify-center ">
                  <p>{{ item.name }}</p>
                  <p class="text-gray-900 opacity-35 text-[14px]">{{ item.match }}</p>
                </div>
                <div class="bg-[#037ab0] h-full p-0.5  rounded-md text-white ">{{ item.rating }}</div>
              </div>
            </div>
            <div class="w-full p-2">
              <img class=" object-contain rounded-3xl" src="/src/assets/map-sofascore.jpeg" alt="">
            </div>
            <div v-for="(item, index) in topPlayers.slice(1)"
              class="flex space-x-2 items-center  px-2 text-gray-900 text-opacity-75">
              <div class="text-[12px]">{{ index + 1 }}</div>
              <div class=" w-14  relative">
                <img class=" object-contain rounded-full" src="/src/assets/messi.jpg" alt="">
                <img class=" absolute  bottom-0 right-0 w-5" src="/src/assets/club.png" alt="">
              </div>
              <div class="w-full flex  items-center  border-b-2 p-2">
                <div class="w-full flex flex-col justify-center ">
                  <p>{{ item.name }}</p>
                  <p class="text-gray-900 opacity-35 text-[14px]">{{ item.match }}</p>
                </div>
                <div class="bg-[#037ab0] h-full p-0.5  rounded-md text-white ">{{ item.rating }}</div>
              </div>
            </div>
            <div class="p-3 flex space-x-2  justify-end items-center">
              <div class=" font-medium text-blue-600 ">
                Show more
              </div>
              <img class=" w-4" src="/src/assets/ball.svg" alt="">
            </div>
          </div>
        </div>
        <div class="MYDeg w-full bg-[#ffffff] rounded-2xl px-3 py-8 text-sm">
          <p>
            Live soccer results page on Sofascore offers real-time soccer scores of all live matches that are being
            played. Sofascore covers hundreds of soccer leagues, cups and tournaments with live updated results,
            statistics, league tables, video highlights and fixtures. From most popular soccer leagues (
            <button class="text-blue-400">UEFA ChampionsLeague</button>,
            <button class="text-blue-400">Premier League</button>,
            <button class="text-blue-400">UEFA Europa League</button>,
            <button class="text-blue-400">Ligue 1</button>,
            <button class="text-blue-400">Serie A</button>,
            <button class="text-blue-400">Bundesliga</button>,
            <button class="text-blue-400">LaLiga</button>,
            <button class="text-blue-400">Brasileiro Série A</button>,)
            top
            players ratings and statistics to soccer games played today, our soccer live score page covers all the
            information you need.
          </p>
        </div>
      </div>
    </div>
  </main>
  <Footer></Footer>


</template>
<script>
import Navbar from './components/Navbar.vue'
import TopLeagues from './components/Topleagues.vue'
import AllLeagues from './components/AllLeagues.vue'
import Footer from './components/Footer.vue'
import { Calendar } from 'v-calendar';
import { ref } from 'vue';

export default {
  components: {
    Navbar,
    TopLeagues,
    AllLeagues,
    Footer,
    Calendar
  }, mounted() {
    setTimeout(() => {
      this.waitdata = true;
    }, 1500); // 2000 milliseconds = 2 seconds
  },
  setup() { // Use setup() for composition API
    const attributes = ref([
      {
        highlight: true,
        dates: new Date(),

      },
      {
        key: 'today',
        dot: true,
        dates: { repeat: { weekdays: 5, } }, // Every Friday

      },
    ]);

    return {
      attributes
    };
  },
  data() {
    return {
      waitdata: false,
      matches: [
        {
          club1: 'Real Madrid',
          club2: 'Barcelona',
          country: 'Spain',
          date: '20:15 AM',
          league: 'La Liga'
        },
        {
          club1: 'Manchester United',
          club2: 'Liverpool',
          country: 'England',
          date: '21:00 AM',
          league: 'Premier League'
        },
        {
          club1: 'Bayern Munich',
          club2: 'Borussia Dortmund',
          country: 'Germany',
          date: '17:17 AM',
          league: 'Bundesliga'
        },
        {
          club1: 'Juventus',
          club2: 'Inter Milan',
          country: 'Italy',
          date: '20:18 AM',
          league: 'Serie A'
        },
        {
          club1: 'Paris Saint-Germain',
          club2: 'Olympique Marseille',
          country: 'France',
          date: '15:00 AM',
          league: 'Ligue 1'
        },
        {
          club1: 'Ajax',
          club2: 'PSV Eindhoven',
          country: 'Netherlands',
          date: '14:30 AM',
          league: 'Eredivisie'
        },
        {
          club1: 'Benfica',
          club2: 'FC Porto',
          country: 'Portugal',
          date: '21:00 AM',
          league: 'Primeira Liga'
        },
        {
          club1: 'Galatasaray',
          club2: 'Fenerbahçe',
          country: 'Turkey',
          date: '20:20 AM',
          league: 'Süper Lig'
        },
        {
          club1: 'River Plate',
          club2: 'Boca Juniors',
          country: 'Argentina',
          date: '19:00 AM',
          league: 'Primera División'
        },
        {
          club1: 'Celtic',
          club2: 'Rangers',
          country: 'Scotland',
          date: '18:00 AM',
          league: 'Scottish Premiership'
        },
      ],
      Highlights: [
        {
          match: 'Real Madrid VS Barcelona',
        },
        {
          match: 'Manchester United VS Liverpool',
        },
        {
          match: 'Bayern Munich VS Borussia Dortmund',
        },
        {
          match: 'Juventus VS Inter Milan',
        },
        {
          match: 'Paris Saint-Germain VS Olympique Marseille',
        }],
      topPlayers: [
        {
          name: 'Lionel Messi',
          rating: 9.5,
          match: 'La Liga Match',
          match: 'Barcelona vs. Real Madrid'
        },
        {
          name: 'Cristiano Ronaldo',
          rating: 9.4,
          match: 'Serie A Match',
          match: 'Juventus vs. Inter Milan'
        },
        {
          name: 'Neymar Jr.',
          rating: 9.3,
          match: 'Ligue 1 Match',
          match: 'PSG vs. Olympique Marseille'
        },
        {
          name: 'Robert Lewandowski',
          rating: 9.6,
          match: 'Bundesliga Match',
          match: 'Bayern Munich vs. Borussia Dortmund'
        },
        {
          name: 'Kevin De Bruyne',
          rating: 9.5,
          match: 'Premier League Match',
          match: 'Manchester City vs. Liverpool'
        },
        {
          name: 'Kylian Mbappé',
          rating: 9.4,
          match: 'Champions League Match',
          match: 'PSG vs. Real Madrid'
        },
        {
          name: 'Virgil van Dijk',
          rating: 9.3,
          match: 'UEFA Euro Qualifier',
          match: 'Netherlands vs. Germany'
        },
        {
          name: 'Sadio Mané',
          rating: 9.2,
          match: 'FA Cup Match',
          match: 'Liverpool vs. Chelsea'
        },
      ]
    };
  }
}
</script>
<style scoped>
.MYDeg {
  box-shadow: 0 1px 4px rgba(34, 34, 38, 0.08);
}

.MFDeg {

  box-shadow: 1px 25px 15px black inset;
}

.Z1 {
  z-index: 1;
}

.Z2 {
  z-index: 2;
}

.truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>./components/AllLeagues.vue
