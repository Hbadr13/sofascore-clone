<template>
    <header class="w-full  z-10 fixed">
        <div class="capitalize max-w-full flex flex-col items-center ">
            <div class="w-full bg-[#374df5]   tablet:h-[64px] h-[46px] flex justify-center items-center">
                <div class=" w-full desktop:w-[1344px] tablet:w-[992px] tablet:max-h-[64px]min-h-[46px]  ">
                    <div class=" relative w-full  flex justify-center items-center tablet:h-[64px]">
                        <a href=" /" class="h-full w-1/2  flex items-center pl-2 font-bold text-3xl  text-white">
                            <img class="w-10 h-10" src='/src/assets/ball.svg'>
                            sofascore
                        </a>
                        <input
                            class=" outline-none relative  -left-10  desktop:left-0 hidden tablet:block py-2 px-20 rounded-xl"
                            type="text">
                        <div
                            class="flex h-full w-1/2 uppercase  items-center justify-end p-2 space-x-3 tablet:space-x-10  text-white font-medium">
                            <div class="hidden tablet:flex items-center space-x-1 mx-2">
                                <div class="whitespace-nowrap">
                                    dropping odds
                                </div>
                                <img class="hidden tablet:block w-5 h-5" src='/src/assets/ball.svg'>
                            </div>
                            <div class="hidden tablet:flex items-center space-x-1">
                                <div class="">
                                    favorites
                                </div>
                                <img class="w-5 h-5" src='/src/assets/ball.svg'>
                            </div>
                            <img class="hidden tablet:block w-8 h-8 " src='/src/assets/ball.svg'>
                            <div class="flex p-2 space-x-2">
                                <img class="tablet:hidden block w-8 h-8 " src='/src/assets/ball.svg'>
                                <img class="tablet:hidden block w-8 h-8 " src='/src/assets/ball.svg'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex  w-full bg-[#2c3ec4]  justify-center">
                <div class=" w-full flex  items-center desktop:w-[1344px] tablet:w-[992px]  font-medium text-sm  ">
                    <button v-for="(sport, index) in filteredSports" :key="index"
                        :class="{ ' border-b-4   text-white': index === 0, 'text-slate-400': index != 0 }"
                        class="w-full">
                        <div class="flex flex-col justify-center items-center p-1 ">
                            <img class=" w-5 h-5" src='/src/assets/ball.svg'>
                            <div class="">
                                {{ sport }}
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    data() {
        return {
            windowWidth: window.innerWidth,
            sports: ['Soccer', 'Basketball', 'Tennis', 'Cricket', 'Rugby', 'Golf', 'Baseball', 'Boxing', 'MMA', 'Swimming', 'Athletics', 'Cycling', 'Fencing', 'Wrestling', 'Badminton', 'Volleyball', 'American Football', 'Table Tennis', 'Gymnastics']
        };
    },
    created() {
        window.addEventListener('resize', this.handleResize);
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    computed: {
        filteredSports() {
            if (this.windowWidth < 922)
                return this.sports.slice(0, 4); // Get the first 4 sports
            if (this.windowWidth < 1344)
                return this.sports.slice(0, 10);
            return this.sports.slice(0, 15);

        }
    },
    methods: {
        handleResize() {
            this.windowWidth = window.innerWidth;
        }
    }
};
</script>

<style scoped></style>
