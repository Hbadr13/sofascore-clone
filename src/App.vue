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
        <CalendarComp />
        <TopLeagues />
        <AllLeagues />
      </div>
      <div class="MYDeg w-[100%] tablet:w-[42%]   bg-[#ffffff] p-2  rounded-2xl   ">
        <MainComp />
      </div>
      <div class=" w-[33%] hidden tablet:block  rounded-2xl  space-y-5">
        <Highlights />
        <FeaturedMatch />
        <TopPlayers />
        <LiveSoccer />
       
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
import CalendarComp from './components/CalendarComp.vue'
import MainComp from './components/MainComp.vue'
import FeaturedMatch from './components/FeaturedMatch.vue'
import Highlights from './components/Highlights.vue'
import TopPlayers from './components/TopPlayers.vue'
import LiveSoccer from './components/LiveSoccer.vue'
import { Calendar } from 'v-calendar';
import { ref } from 'vue';

export default {
  components: {
    Navbar,
    TopLeagues,
    AllLeagues,
    Footer,
    Calendar,
    CalendarComp,
    MainComp,
    Highlights,
    FeaturedMatch,
    TopPlayers,
    LiveSoccer
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
