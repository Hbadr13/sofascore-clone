<template>
    <div class="MYDeg w-full bg-[#ffffff] rounded-2xl p-3">
        <p>Highlights</p>
        <div class="flex overflow-hidden space-x-2">
            <div v-if="!waitdata" v-for="(match, index) in [1, 2, 3, 4, 5, 6, 7, 8]" :key="index"
                class=" border-b-[0.5px] ">
                <div class="animate-pulse flex space-x-1">
                    <div class="w-[92px] h-[140px] relative bg-slate-200 rounded-2xl p-2 ">
                        <div class="w-14 h-6 bg-slate-300 bg-opacity-40 absolute  top-2 left-2 px-2 rounded-lg"></div>
                        <div class="w-[80%] h-2 bg-slate-300 bg-opacity-40 absolute bottom-4 px-2 rounded-lg"></div>
                        <div class="w-[80%] h-2 bg-slate-300 absolute bg-opacity-40 bottom-8 px-2 rounded-lg"></div>
                    </div>

                </div>
            </div>
        </div>

        <div v-if="waitdata" class="flex overflow-hidden space-x-2">
            <div v-for="(item, index) in Highlights" class=" rounded-xl">
                <div class="w-[92px] h-[140px] relative">
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
</template>

<script>

export default {
    mounted() {
        setTimeout(() => {
            this.waitdata = true;
        }, 1700); // 2000 milliseconds = 2 seconds
    },
    data() {
        return {
            waitdata: false,

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
        }
    }
}
</script>