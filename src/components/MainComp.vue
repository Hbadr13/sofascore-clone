<template>
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


        <!-- shimmer -->
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
</template>
<script>

export default {
    mounted() {
        setTimeout(() => {
            this.waitdata = true;
        }, 1400);
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
</style>
