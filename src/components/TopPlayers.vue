<template>
    <div class="MYDeg w-full bg-[#ffffff] rounded-2xl  space-y-2 ">
        <div class=" text-slate-800 p-3 border-b-[1px] border-gray-300">
            <p class=" text-[20px]">Top players</p>
            <p class=" text-gray-900 text-sm opacity-35">Best rated players from recent matches</p>
        </div>
        <div v-if="waitdata" class="">
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


        <!-- shimmer -->
        <div v-if="!waitdata" class="animate-pulse">
            <div v-for="(item, index) in topPlayers.slice(0, 1) "
                class="flex space-x-2 items-center   px-2 text-gray-900 text-opacity-75">
                <div class=" w-14  relative">
                    <div class="w-10 h-10 rounded-full bg-slate-200"></div>
                </div>
                <div class="w-full space-y-2 p-2">
                    <div class="w-20 h-2 bg-slate-200"></div>
                    <div class="w-24 h-2 bg-slate-200"></div>
                </div>
            </div>
            <div class="w-full h-64  p-2">
                <div class="flex bg-slate-200 w-full h-full rounded-xl"></div>
            </div>
            <div v-for="(item, index) in topPlayers.slice(1)"
                class="flex space-x-2 items-center py-3   px-2 text-gray-900 text-opacity-75">
                <div class=" w-14  relative">
                    <div class="w-10 h-10 rounded-full bg-slate-200"></div>
                </div>
                <div class="w-full space-y-2 p-2">
                    <div class="w-20 h-2 bg-slate-200"></div>
                    <div class="w-24 h-2 bg-slate-200"></div>
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
</template>
<script>
export default {
    mounted() {
        setTimeout(() => {
            this.waitdata = true;
        }, 2000);
    },
    data() {
        return {
            waitdata: false,

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