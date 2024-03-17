<template class="">
    <div class="MYDeg   space-y-1 pb-4  rounded-2xl bg-white">
        <div class=" p-4 font-medium text-black">Top leagues</div>
        <button class="w-full flex   items-center  px-5 py-0.5 space-x-5 hover:bg-slate-100"
            v-for="(item, index) in leagues" :key="index">
            <img class="w-5" src="../assets/ufa.png" alt="">
            <div class="text-[16px] font-thin opacity-90">
                {{ item }}
            </div>
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            leagues: [
                'UEFA Champions League',
                'UEFA Europa League',
                'Premier League',
                'LaLiga',
                'Bundesliga',
                'Serie A',
                'Ligue 1',
                'Eredivisie',
                'Brasileirão Série A',
                'CONMEBOL Libertadores',
                'CAF Champions League',
                'Botola Pro',
                'World Championship'
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