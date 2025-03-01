import { PlayerAPIJson } from '@/interface/api/player';
import { Input, Slider, cn } from '@nextui-org/react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import Image from 'next/image';
import moment from 'moment';
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)
type SliderStepMark = {
    value: number;
    label: string;
};
const PlayerAttributeOverview = ({ player }: { player: PlayerAPIJson | null }) => {
    const [AttributeOverview, setAttributeOverview] = useState<IAttributeOverviewsAPI | null>();
    const [marks, setmarks] = useState<SliderStepMark[] | null>(null)
    const [yearShift, setYearShift] = useState<any>(0);

    useEffect(() => {

        const getTheAttributeOverviews = async () => {
            try {
                if (!player)
                    return
                const response = await fetch(`https://www.sofascore.com/api/v1/player/${player.id}/attribute-overviews`, {})
                if (response.ok) {
                    const data: IAttributeOverviewsAPI = await response.json()
                    const _marks: SliderStepMark[] = Array.from(data.playerAttributeOverviews).map((overview, index) => {
                        return {
                            value: overview.yearShift,
                            label: (moment(new Date()).year() - (data.playerAttributeOverviews.length - 1 - overview.yearShift)) + ' ' + moment(new Date()).format("MMM"),
                        }
                    });
                    setYearShift(data.playerAttributeOverviews[data.playerAttributeOverviews.length - 1].yearShift)
                    setmarks(_marks)
                    setAttributeOverview(data)
                }
            } catch (error) {

            }
        }
        getTheAttributeOverviews()
    }, [player])
    return (
        <div className="p-5 bg-[rgb(21 177 104, 0.2)] flex flex-col items-center w-full">
            <div className="h-[350px] w-full  flex items-center justify-center">
                {
                    AttributeOverview ? <Radar
                        className=' '

                        data={{
                            labels: [
                                'ATT ' + AttributeOverview.playerAttributeOverviews[yearShift]?.attacking + ', ' + AttributeOverview.averageAttributeOverviews[0]?.attacking,
                                'TEC ' + AttributeOverview.playerAttributeOverviews[yearShift]?.technical + ', ' + AttributeOverview.averageAttributeOverviews[0]?.technical,
                                'TAC ' + AttributeOverview.playerAttributeOverviews[yearShift]?.tactical + ', ' + AttributeOverview.averageAttributeOverviews[0]?.tactical,
                                'DEF ' + AttributeOverview.playerAttributeOverviews[yearShift]?.defending + ', ' + AttributeOverview.averageAttributeOverviews[0]?.defending,
                                'CRE ' + AttributeOverview.playerAttributeOverviews[yearShift]?.creativity + ', ' + AttributeOverview.averageAttributeOverviews[0]?.creativity
                            ],
                            datasets: [
                                {
                                    label: 'avgAttr',
                                    data: [
                                        AttributeOverview.playerAttributeOverviews[yearShift]?.attacking,
                                        AttributeOverview.playerAttributeOverviews[yearShift]?.technical,
                                        AttributeOverview.playerAttributeOverviews[yearShift]?.tactical,
                                        AttributeOverview.playerAttributeOverviews[yearShift]?.defending,
                                        AttributeOverview.playerAttributeOverviews[yearShift]?.creativity],
                                    backgroundColor: 'rgba(255, 99, 132, 0.4)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1,
                                },
                                {
                                    label: 'plyrAttr',
                                    data: [
                                        AttributeOverview.averageAttributeOverviews[0]?.attacking,
                                        AttributeOverview.averageAttributeOverviews[0]?.technical,
                                        AttributeOverview.averageAttributeOverviews[0]?.tactical,
                                        AttributeOverview.averageAttributeOverviews[0]?.defending,
                                        AttributeOverview.averageAttributeOverviews[0]?.creativity],
                                    backgroundColor: 'rgb(11, 179, 42,0.4)',
                                    borderColor: 'rgb(11, 179, 42)',
                                    borderWidth: 1,
                                }
                            ],
                        }}

                    />
                        :
                        <div className='animate-pulse w-[70%] h-[70%] rounded-2xl bg-surface-s2' />
                }
            </div>
            <div className=" text-sm w-full px-4 flex justify-center">

                {
                    marks && AttributeOverview ? <Slider
                        onChange={(val: any) => setYearShift(AttributeOverview.playerAttributeOverviews.length - 1 - Number(val))}
                        maxValue={marks[marks.length - 1].value}
                        minValue={marks[0].value}

                        defaultValue={AttributeOverview.playerAttributeOverviews.length - 1 - yearShift}
                        // showTooltip={true}
                        showSteps={true}
                        size="sm"
                        style={{ fontSize: 4, fontWeight: 4 }}
                        step={1}
                        marks={marks}
                        renderValue={({ index, ...props }) => (<div >
                            {index}
                            xx
                        </div>)}
                        classNames={{
                            base: "max-w-md gap-3",
                            filler: "bg-gradient-to-r from-pink-300 to-cyan-300 dark:from-pink-600 dark:to-cyan-800 p",
                        }}
                        renderThumb={({ index, ...props }) => (
                            <div
                                {...props}
                                className="group  p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                            >
                                <span
                                    className={cn(
                                        "transition-transform bg-gradient-to-br shadow-small rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80",
                                        index === 0
                                            ? "from-pink-200 to-pink-500 dark:from-pink-400 dark:to-pink-600" // first thumb
                                            : "from-cyan-200 to-cyan-600 dark:from-cyan-600 dark:to-cyan-800", // second thumb
                                    )}
                                />
                            </div>
                        )}
                    /> : <div className='h-8 w-[80%] bg-on-surface-nLv5 rounded-xl mb-4'></div>
                }
            </div>

            <div className=" mt-4 animate-pulse p-2 w-full bg-surface-s2 rounded-xl flex items-center  justify-between space-x-2 ">
                <Image className='w-12 h-12 rounded-full' src={'https://www.sofascore.com/static/images/placeholders/player.svg'} alt='placeholder-player' width={500} height={500} />
                <Input radius='lg' variant={'faded'} type="search to compare players" label={<div className='text-lg  text-on-surface-nLv3'>search to compare players</div>} className='w-[calc(100%-50px)] ' />
            </div>
        </div>
    )
}
export default PlayerAttributeOverview