<template>
    <div class="MYDeg w-full bg-[#ffffff] rounded-2xl p-3 space-y-2 pb-6">
        <p class="font-semibold">Featured Match</p>

        <!-- shimmer -->
        <div v-if="!waitdata" class="animate-pulse flex space-x-8  bg-[#f5f6f9] p-1.5 rounded-xl">
            <div class="w-1/3 h-20  flex flex-col justify-center items-center space-y-4">
                <div class="w-10 h-10 rounded-full bg-slate-200"></div>
                <div class="w-10 h-2 rounded-full bg-slate-200"></div>
            </div>
            <div class="w-1/3 h-20  space-y-4 flex justify-center items-center flex-col text-red-700">
                <div class="w-10 h-3 rounded-full bg-slate-200"></div>
                <div class="w-14 h-3 rounded-full bg-slate-200"></div>

            </div>
            <div class="w-1/3 h-20  flex flex-col justify-center items-center  space-y-4">
                <div class="w-10 h-10 rounded-full bg-slate-200"></div>
                <div class="w-10 h-2 rounded-full bg-slate-200"></div>

            </div>
        </div>
        <!-- shimmer -->
        <div v-if="!waitdata"
            class="animate-pulse bg-gradient-to-r h-28 from-[#cde5df] via-[#f1f1f1] to-[#cde5df] p-1.5 rounded-xl space-y-3  ">
            <div class="flex justify-between text-[12px]">
                <div class="space-x-1"><span>Full time</span><span class="text-orange-600">Live</span></div>
                <div class="bg-green-700 rounded-[5px] px-[8px] py-[2px] font-medium text-[12px]"><span
                        class="text-white">bet</span><span class="text-yellow-300">365</span></div>
            </div>
        </div>


        <div v-if="waitdata" class="flex  bg-[#f5f6f9] p-1.5 rounded-xl">
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
        <div v-if="waitdata"
            class=" bg-gradient-to-r from-[#cde5df] via-[#f1f1f1] to-[#cde5df] p-1.5 rounded-xl space-y-3  ">
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
</template>

<script>
export default {
    mounted() {
        setTimeout(() => {
            this.waitdata = true;
        }, 1500);
    },
    data() {
        return {
            waitdata: false
        }
    }
}
</script>