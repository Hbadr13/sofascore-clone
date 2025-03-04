import { CountryChannelsAPIJson, TvChannelApi } from "@/interface/api/countryChannels"
import { MatchDetailsAPIJson } from "@/interface/api/matchs"
import { useEffect, useState } from "react"
import Image from 'next/image'
import { CustomScroll } from "react-custom-scroll"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { EventAPIJson } from "@/interface/api/event"
import DisplayImage from "@/utils/displayImage"
import CustomDropdown from "@/utils/customDropdown"
export interface ChannelsCompProps {
    currentMatch: MatchDetailsAPIJson | null | EventAPIJson
    type: string
}


const TvChannels = ({ currentMatch, type }: ChannelsCompProps) => {
    const [channels, setChannels] = useState<Array<TvChannelApi>>([])
    const [channelId, setChannelId] = useState<string>('MA')
    const [countryChannels, setCountryChannels] = useState<CountryChannelsAPIJson>()

    useEffect(() => {
        try {
            if (!currentMatch || !countryChannels)
                return
            const idOfChannels = countryChannels.countryChannels.get(channelId)
            if (!idOfChannels)
                return
            let chnls = []

            setChannels([])
            idOfChannels.map(async (id) => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tv/channel/${id}/event/${currentMatch.id}/votes`, {})
                    if (response.ok) {
                        const data = await response.json()
                        // chnls.push(data.tvChannelVotes)
                        setChannels((prv) => {
                            if (!prv.find((itm) => itm.tvChannel.name == data.tvChannelVotes.tvChannel.name)) {
                                return [...prv, data.tvChannelVotes]
                            }
                            else {
                                return [...prv]
                            }
                        })
                    }
                    // setChannels(chnls)
                } catch (error) {

                }
            })
        } catch (error) {

        }
    }, [channelId, currentMatch, countryChannels])

    useEffect(() => {
        const getCountryChannels = async () => {
            try {
                if (!currentMatch)
                    return
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tv/event/${currentMatch.id}/country-channels`, {});
                if (response.ok) {
                    const data = await response.json()
                    const countryChannelsMap = new Map<string, number[]>(Object.entries(data.countryChannels))
                    data.countryChannels = countryChannelsMap
                    setCountryChannels(data)
                }

            } catch (error) {
            }
        }
        getCountryChannels()
    }, [currentMatch])
    if (!countryChannels)
        return <></>
    return (
        <div className={`  ${type == 'lineup' ? ' bg-slate-100 p-2 rounded-xl  ' : 'MYDeg   w-full  bg-white rounded-2xl p-3'}  space-y-2`}>
            <div className="flex   items-center justify-between">
                <div className=" font-semibold">TV Channels</div>
                <CustomDropdown
                    buttonStyle='w-20'
                    buttonContent={
                        <div
                            className="flex p-2  rounded-2xl">
                            <div className="w-6 h-6">
                                <DisplayImage onErrorImage='flag'
                                    height={300}
                                    width={300}
                                    alt=''
                                    src={`https://cdn.alkora.app/static/images/flags/${channelId.toLowerCase()}.png`}
                                />
                            </div>
                        </div>
                    }
                    CustomDropdownStyle={{
                        right: '0px'
                    }}
                    CustomDropdownContent={
                        Array.from(countryChannels.countryChannels).map((item, index) =>
                            <button
                                onClick={() => setChannelId(item[0])}
                                key={item[0]}
                                className=" w-full hover:bg-on-surface-nLv4 rounded-lg p-0.5"
                            >
                                <div className=" flex space-x-2 items-center  justify-between" >
                                    <div className="w-10">
                                        {item[0]}
                                    </div>
                                    <div className="w-6 h-6">
                                        <Image
                                            height={300}
                                            width={300}
                                            alt=''
                                            src={`https://cdn.alkora.app/static/images/flags/${item[0].toLowerCase()}.png`}
                                        />
                                    </div>
                                </div>
                            </button>
                        )
                    }
                />
            </div>
            <div className={` ${type == 'lineup' ? 'bg-gray-300/25' : ' bg-gray-200/40 font-medium'} rounded-xl space-y-3 p-6`}>
                {channels.length != 0 ? channels.map((item, index) =>
                    <div key={index} className="flex  justify-start items-center   rounded-xl">
                        <div className="w-[60%] flex  space-x-2 items-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="rgb(75 85 99)" ><path fill="var(--on-surface-nLv3)" d="M20 4H2v14h7v2h6v-2h7V4h-2zm0 12H4V6h16v10z" fillRule="evenodd" width="24" height="24"></path></svg>
                            <div className=" text-sm truncate" >
                                {item.tvChannel?.name}
                            </div>
                        </div>
                        <div className="w-[40%] flex justify-end  space-x-2 items-center">
                            <div className="w-14 flex items-center space-x-1 bg-white border-1">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="rgb(34 197 94)" ><path d="M14.52 5.243 6.744 13.02l-1.697-1.697v-.002L2.5 8.778 4.228 7.05l2.546 2.544 6.05-6.048 1.697 1.697z" fill="var(--success-default)" fillRule="evenodd" ></path></svg>                                <div className="text-sm">{item.upvote}</div>
                            </div>
                            <div className="w-14 flex items-center space-x-1 bg-white border-1">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="rgb(244 63 94)" ><path d="M12.42 5.348 9.766 8l2.652 2.653-1.767 1.767-2.653-2.652-2.65 2.652-1.768-1.767 2.65-2.653-2.65-2.65L5.348 3.58 8 6.23l2.653-2.65 1.767 1.767z" fill="var(--error-default)" fillRule="evenodd"></path></svg>                                <div className="text-sm">{item.downvote}</div>
                            </div>
                        </div>
                    </div>
                ) :
                    <div className="w-full h-24 flex justify-center items-center ">
                        <div className=" text-gray-600">
                            No votes for selected country.
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default TvChannels