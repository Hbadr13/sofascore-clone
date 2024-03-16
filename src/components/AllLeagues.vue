<template class="">
    <div class="MYDeg  text-gray-700 space-y-2  rounded-2xl bg-white">
        <div class=" font-semibold px-4 pt-4">All leagues</div>
        <div class=" relative  p-2">
            <input placeholder="Filter"
                class=" font-normal border-2 outline-none relative text-xl text-gray-600 pl-10 py-1  w-full rounded-xl"
                type="text">
            <img class=" absolute top-4 left-5 w-7 h-7" src='/src/assets/search.png'>
        </div>
        <button class="relative w-full flex  items-center  justify-between px-5 py-0.5 space-x-5 hover:bg-slate-100"
            v-for="(item, index) in leagues" :key="index">
            <div class="flex items-center space-x-4">
                <img class="w-5 h-5" src="../assets/morocco.png" alt="">
                <div class="">
                    {{ item.country }}
                </div>
            </div>
            <div class="flex space-x-4 text-sm">
                <div v-if="item.count.split('/')[1] != undefined" class=" opacity-70">
                    <span class="text-red-800">{{ item.count.split('/')[0] }}</span> / <span>{{ item.count.split('/')[1]
                        }}</span>
                </div>
                <div v-if="item.count.split('/')[1] == undefined" class=" opacity-70">
                    {{ `${item.count.split('/')[0]}` }}
                </div>
                <img class="w-5 -rotate-90 opacity-45" src="../assets/arraw.svg" alt="" srcset="">
            </div>

        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            leagues: [
                { country: "Africa", count: "2/20" },
                { country: "Albania", count: "13" },
                { country: "American Samoa", count: "1" },
                { country: "Andorra", count: "1/3" },
                { country: "Angola", count: "1" },
                { country: "Anguilla", count: "2" },
                { country: "Argentina", count: "3/26" },
                { country: "Argentina Amateur", count: "8" },
                { country: "Armenia", count: "3" },
                { country: "Aruba", count: "2" },
                { country: "Australia", count: "70/120" },
                { country: "Austria", count: "6" },
                { country: "Bangladesh", count: "1" },
                { country: "Barbados", count: "2/33" },
                { country: "Belarus", count: "7" },
                { country: "Belgium Amateur", count: "29" },
                { country: "Belize", count: "1" },
                { country: "Botswana", count: "11/90" },
                { country: "Brazil", count: "13/101" },
                { country: "Brazil Amateur", count: "1/25" },
                { country: "Iran", count: "3" },
                { country: "Ireland", count: "8" },
                { country: "Italy", count: "49" },
                { country: "Italy Amateur", count: "96" },
                { country: "Ivory Coast", count: "5" },
                { country: "Jamaica", count: "1" },
                { country: "Japan", count: "28" },
                { country: "Japan Amateur", count: "1" },
                { country: "Jordan", count: "1" },
                { country: "Kazakhstan", count: "2" },
                { country: "Kenya", count: "12" },
                { country: "Kosovo", count: "7" },
                { country: "Kuwait", count: "1" },
                { country: "Latvia", count: "3" }
            ]

        }
    },
}

</script>

<style scoped>
.MYDeg {
    box-shadow: 0 1px 4px rgba(34, 34, 38, 0.08);
}
</style>