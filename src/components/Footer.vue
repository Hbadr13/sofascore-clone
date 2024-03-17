<template>
    <div class=" bg-[#2c3ec4]  flex  capitalize max-w-full  flex-col items-center   mt-10">
        <div class=" w-full hidden tablet:flex  desktop:w-[1344px] tablet:w-[992px] space-x-14 py-10 text-white">
            <div class="w-1/2  space-y-4">
                <div class="text-xl ">About</div>
                <p class="text-[14px] font-normal  ">Live scores service at Sofascore livescore offers sports
                    live scores,
                    results and tables.
                    Follow your favourite teams right here live! Live score on Sofascore.com livescore is
                    automatically updated and you don't need to refresh it manually. With adding games you want
                    to follow in "My games" following your matches livescores, results and statistics will be
                    even more simple.</p>
            </div>
            <div class="w-1/2 text-[16px]  font-semibold space-y-4">
                <div class="text-xl">Top live scores and streaming</div>
                <div class="text-[14px] font-normal">
                    <div>Atlético Madrid - Barcelona</div>
                    <div>Manchester United - Liverpool</div>
                    <div>Manchester City - Newcastle United</div>
                    <div>Inter - Napoli</div>
                    <div>Real Sociedad - Cádiz</div>
                    <div>Sinner J. - Alcaraz C.</div>
                    <div>Paul T. - Medvedev D.</div>
                    <div>Los Angeles Lakers - Golden State Warriors</div>
                    <div>Boston Bruins - Philadelphia Flyers</div>
                    <div>France - England</div>
                </div>
            </div>
        </div>
        <div class="bg-gray-900 bg-opacity-15 w-full hidden tablet:flex justify-center">
            <div
                class=" w-full flex  items-center justify-between desktop:w-[1344px] tablet:w-[992px] text-white py-[32px] px-[8px]">
                <div class="flex items-center space-x-1">
                    <img class=" w-8 h-8" src='/src/assets/club2.png'>
                    <div class=" text-3xl">sofascore</div>
                </div>
                <div class="w-1/2 flex space-x-2 items-center">
                    <div class="">
                        When the fun stops, STOP
                    </div>
                    <img class=" w-8 h-8" src='/src/assets/club2.png'>
                </div>
                <div class="flex space-x-5 items-center">
                    <div class="">Visit us</div>
                    <img class=" w-8 h-8" src='/src/assets/club2.png'>
                    <img class=" w-8 h-8" src='/src/assets/club2.png'>
                    <img class=" w-8 h-8" src='/src/assets/club2.png'>
                    <img class=" w-8 h-8" src='/src/assets/club2.png'>

                </div>
            </div>
        </div>
        <div class=" w-full  flex  justify-center">
            <div
                class=" w-full flex  items-center justify-between desktop:w-[1344px] tablet:w-[992px] text-white py-[3px] px-[0px] tablet:px-[8px]">
                <div
                    class="flex   
                    flex-col-reverse tablet:flex-row space-y-10 tablet:space-y-0 space-x-0 tablet:space-x-5 items-center w-full justify-center   text-[15px]">
                    <div class=" w-full text-center tablet:w-1/4 whitespace-nowrap mt-8 tablet:mt-0">© 2024 Sofascore –
                        All Rights
                        Reserved.
                    </div>
                    <div
                        class=" flex w-full py-10 flex-col  justify-end tablet:flex-row space-y-8 bg-gray-900 tablet:bg-inherit bg-opacity-15 tablet:bg-opacity-100 tablet:space-y-0 space-x-0   tablet:space-x-2   desktop:space-x-5 items-center whitespace-nowrap">
                        <button class="">PRIVACY & COOKIE POLICY</button>
                        <button class="">SEND FEEDBACK</button>
                        <button class="">ADVERTISE</button>
                        <button class="">CONTACT</button>
                        <button class="">SOFASCORE LIVESCORE APP</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="bg-gray-900 bg-opacity-15 w-full tablet:hidden flex justify-center">
            <div class=" w-full flex  items-center justify-between  text-white py-[32px] px-[8px]">
                <div class="flex items-center space-x-1">
                    <img class=" w-8 h-8" src='/src/assets/club2.png'>
                    <div class=" text-3xl">sofascore</div>
                </div>
                <div class="w-1/2 flex space-x-2 items-center">
                    <div class="">
                        When the fun stops, STOP
                    </div>
                    <img class=" w-8 h-8" src='/src/assets/club2.png'>
                </div>
                <div class="flex space-x-5 items-center">
                    <div class="">Visit us</div>
                    <img class=" w-8 h-8" src='/src/assets/club2.png'>
                    <img class=" w-8 h-8" src='/src/assets/club2.png'>
                    <img class=" w-8 h-8" src='/src/assets/club2.png'>
                    <img class=" w-8 h-8" src='/src/assets/club2.png'>

                </div>
            </div>
        </div> -->
        <div class=" block tablet:hidden w-full h-36  border-t-[0.5px] border-blue-300  mt-8"></div>
    </div>
    <div
        class="w-full text-[13px] pt-2   px-4  border-b-2  bg-white border-gray-300 fixed  bottom-0   tablet:hidden flex justify-between items-center ">
        <div class="  flex flex-col justify-center items-center border-b-2 border-blue-700 px-5 w-1/4">
            <img class="w-8 h-8 " src="../assets/club2.png" alt="">
            <div class=" text-blue-600">Matches</div>
        </div>
        <div class="flex flex-col justify-center items-center px-5 w-1/4">
            <img class="w-8 h-8" src="../assets/club2.png" alt="">
            <div class=" text-gray-800">Leagues</div>
        </div>
        <div class="flex flex-col justify-center items-center px-5 w-1/4">
            <img class="w-8 h-8" src="../assets/club2.png" alt="">
            <div class=" text-gray-800">Favourites</div>
        </div>
        <div class="flex flex-col justify-center items-center px-5 w-1/4">
            <img class="w-8 h-8" src="../assets/club2.png" alt="">
            <div class=" text-gray-800">Menu</div>
        </div>
    </div>
</template>
<script>
export default {

};
</script>

<style scoped></style>
