'use client'
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { extractFormDate } from '@/utils/function';

export default function CalendarComp({ matchesDate, setMatchesDate }: { matchesDate: Dayjs | null, setMatchesDate: any }) {

    const router = useRouter()
    return (
        <div className="h-[408px] bg-white font-extrabold rounded-2xl">
            <LocalizationProvider  dateAdapter={AdapterDayjs}>
                <DemoContainer  components={['DateCalendar', 'DateCalendar']}>
                    <DemoItem    >
                        <DateCalendar
                        className=' h-[320px]'
                            // value={dayjs('2024-05-04')}
                            value={matchesDate}
                            onChange={(newValue) => { setMatchesDate(newValue); router.push(`/ma/sl/${extractFormDate(newValue.toDate())}`) }}
                        />
                        <div className=" relative  " >
                            <div className="flex space-x-2 items-center pb-3 pl-8">
                                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                <p className=" font-thin opacity-70 text-[12px] text-gray-400">Days with your Pinned leagues matches.</p>
                            </div>
                            <div className="w-full h-[1px] bg-gray-200"></div>
                            <div className=" pl-7 pt-1.5 flex ">
                                <Button
                                    onClick={() => { setMatchesDate(dayjs(new Date())); router.push(`/ma/sl/${extractFormDate(new Date())}`) }}
                                    className=' bg-blue-600 text-white text-[12px] h-7 rounded-2xl'
                                >
                                    Today
                                </Button>
                            </div>
                        </div>
                    </DemoItem>
                </DemoContainer>
            </LocalizationProvider>
        </div>
    );
}


{/* <template>
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
</template>
<script>
import { Calendar } from 'v-calendar';
import { ref } from 'vue';

export default {
    components: {
        Calendar,
    }, mounted() {
        setTimeout(() => {
            this.waitdata = true;
        }, 1500);
    },
    setup() {
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
}
</script> */}