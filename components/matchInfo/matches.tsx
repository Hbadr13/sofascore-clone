import { MatchDetailsAPIJson } from '@/interface/api/matchs'
import { TeamStreaksApiJson } from '@/interface/api/teamStreaks'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Checkbox } from '@nextui-org/react'
import DisplayImage from '@/utils/displayImage'
export interface MatchesProps {
  currentMatch: MatchDetailsAPIJson | null
}
export interface displayFirstTournamentTitle {
  isSelected_tournament: boolean
}


const displayFirstTournamentTitle = ({ isSelected_tournament }: displayFirstTournamentTitle): boolean => {
  return false
}
const Matches = ({ currentMatch }: MatchesProps) => {
  const [waitdata, setWaitdata] = useState(true)
  const [h2hEvent, setH2hEvent] = useState<MatchDetailsAPIJson[]>([])
  const [teamStreaks, setTeamStreaks] = useState<TeamStreaksApiJson | null>(null)
  const [currentTeam, setCurrentTeam] = useState('h2h')
  const [isSelected1, setisSelected1] = React.useState(false);
  const [isSelected_tournament, setisSelected_tournament] = React.useState(false);

  useEffect(() => {
    (
      async () => {
        try {
          if (currentMatch == null)
            return
          setWaitdata(true)
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${currentMatch.id}/team-streaks`, {})
          if (response.ok) {
            const data = await response.json()
            setTeamStreaks(data)
            setWaitdata(false)
          }
        } catch (error) {

        }
      }
    )()
  }, [currentMatch])

  useEffect(() => {
    (
      async () => {
        try {

          if (currentMatch == null)
            return
          setWaitdata(true)
          setisSelected1(false)
          setisSelected_tournament(false)
          if (currentTeam == 'h2h') {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${currentMatch.customId}/h2h/events`, {})
            if (response.ok) {
              const data = await response.json()
              setH2hEvent(data.events)
              setWaitdata(false)
            }
          }
          else if (currentTeam == 'home' || currentTeam == 'away') {
            const response1 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team/${currentTeam == 'home' ? currentMatch.homeTeam.id : currentMatch.awayTeam.id}/events/next/0`, {})

            let events: MatchDetailsAPIJson[] = []

            if (response1.ok) {
              const data = await response1.json()
              events = data.events
            }
            const response2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team/${currentTeam == 'home' ? currentMatch.homeTeam.id : currentMatch.awayTeam.id}/events/last/0`, {})
            if (response2.ok) {
              const data = await response2.json()
              events = events.concat(data.events)
            }
            if (events.length) {
              setH2hEvent(events)
              setWaitdata(false)
            }
          }

        } catch (error) {

        }
      }
    )()
  }, [currentMatch, currentTeam])
  const checkTypeOfmatch = ({ match }: { match: MatchDetailsAPIJson }): boolean => {
    if (!currentMatch)
      return true
    if ((currentTeam == 'home' || currentTeam == 'h2h') && isSelected1)
      return match.homeTeam.shortName == currentMatch.homeTeam.shortName
    if (currentTeam == 'away' && isSelected1)
      return match.awayTeam.shortName == currentMatch.awayTeam.shortName
    return true
  }
  return (
    <div className=' font-normal'>
      <div className="text-center my-4 text-xl text-black font-medium">Team streaks</div>
      <div className=" space-y-2">
        {
          teamStreaks?.general.map((item, index) =>
            <div key={index} className='flex w-full  justify-between items-center px-5'>
              <div className="w-1/5 flex space-x-1 h-10 items-center">
                {
                  item.team == 'both' ?
                    <>
                      <DisplayImage onErrorImage='team' className="w-7 h-7" src={`https://sofascore.com/api/v1/team/${currentMatch?.homeTeam.id}/image/`} width={300} height={300} alt='/club' />
                      <DisplayImage onErrorImage='team' className="w-7 h-7" src={`https://sofascore.com/api/v1/team/${currentMatch?.awayTeam.id}/image/`} width={300} height={300} alt='/club' />
                    </>
                    :
                    <DisplayImage onErrorImage='team' className="w-7 h-7" src={`https://sofascore.com/api/v1/team/${item.team == 'home' ? currentMatch?.homeTeam.id : currentMatch?.awayTeam.id}/image/`} width={300} height={300} alt='/club' />
                }
              </div>
              <div className="w-3/5 text-center  truncate text-sm">{item.name}</div>
              <div className="w-1/5 text-end">{item.value}</div>
            </div>
          )
        }
      </div>
      <div className="text-center my-4 text-xl text-black font-medium">Head to head streaks</div>
      <div className=" space-y-2">
        {
          teamStreaks?.head2head.map((item, index) =>
            <div key={index} className='flex w-full  justify-between items-center px-5'>
              <div className="w-1/5 flex space-x-1 h-10 items-center">
                {
                  item.team == 'both' ?
                    <>
                      <DisplayImage onErrorImage='team' className="w-7 h-7" src={`https://sofascore.com/api/v1/team/${currentMatch?.homeTeam.id}/image/`} width={300} height={300} alt='/club' />
                      <DisplayImage onErrorImage='team' className="w-7 h-7" src={`https://sofascore.com/api/v1/team/${currentMatch?.awayTeam.id}/image/`} width={300} height={300} alt='/club' />
                    </>
                    :
                    <DisplayImage onErrorImage='team' className="w-7 h-7" src={`https://sofascore.com/api/v1/team/${item.team == 'home' ? currentMatch?.homeTeam.id : currentMatch?.awayTeam.id}/image/`} width={300} height={300} alt='/club' />
                }
              </div>
              <div className="w-3/5 text-center  truncate text-sm">{item.name}</div>
              <div className="w-1/5 text-end">{item.value}</div>
            </div>
          )
        }
      </div>
      <div className="w-full h-[1px] bg-gray-300 my-4"></div>
      <div className="text-center my-4 text-xl text-black font-medium">Matches</div>
      <div className="">
        <div className="flex items-center justify-around">
          <button onClick={() => setCurrentTeam('home')} className={`w-[80px] h-10 flex justify-center items-center border-1 border-blue-300 ${currentTeam == 'home' ? 'bg-blue-800/15' : 'bg-slate-200/30 '}  rounded-lg`}>
            <div className="w-7 h-7 ">
              <DisplayImage onErrorImage='team' src={`https://sofascore.com/api/v1/team/${currentMatch?.homeTeam.id}/image/`} width={300} height={300} alt='/club' />
            </div>
          </button>
          <button onClick={() => setCurrentTeam('h2h')} className={`w-[80px] h-10 flex justify-center items-center border-1 border-blue-300 ${currentTeam == 'h2h' ? 'bg-blue-800/15' : 'bg-slate-200/30 '}  rounded-lg`}>
            <div className="w-7 h-7 mt-2 text-blue-700 font-semibold">
              H2H
              {/* <DisplayImage onErrorImage='team' src={`https://sofascore.com/api/v1/team/${currentMatch?.homeTeam.id}/image/`} width={300} height={300} alt='/club' /> */}
            </div>
          </button>
          <button onClick={() => setCurrentTeam('away')} className={`w-[80px] h-10 flex justify-center items-center border-1 border-blue-300 ${currentTeam == 'away' ? 'bg-blue-800/15' : 'bg-slate-200/30 '}  rounded-lg`}>
            <div className="w-7 h-7 ">
              <DisplayImage onErrorImage='team' src={`https://sofascore.com/api/v1/team/${currentMatch?.awayTeam.id}/image/`} width={300} height={300} alt='/club' />
            </div>
          </button>
        </div>
        {
          currentTeam != 'h2h' &&
          <div className=" flex items-center space-x-4 pl-4 mt-6 font-medium">
            <div className="w-8 h-8">
              <DisplayImage onErrorImage='team' src={`https://sofascore.com/api/v1/team/${currentTeam == 'home' ? currentMatch?.homeTeam.id : currentMatch?.awayTeam.id}/image/`} width={300} height={300} alt='/club' />
            </div>
            <div className="">{currentTeam == 'home' ? currentMatch?.homeTeam.shortName : currentMatch?.awayTeam.shortName}</div>
          </div>
        }
        {
          currentTeam == 'home' ?
            <div className="flex justify-around my-4">
              <Checkbox isSelected={isSelected1} onValueChange={setisSelected1} >Home</Checkbox>
              <Checkbox isSelected={isSelected_tournament} onValueChange={setisSelected_tournament}>This Tournament</Checkbox>
            </div>
            : currentTeam == 'away' ?
              <div className="flex justify-around my-4">
                <Checkbox isSelected={isSelected1} onValueChange={setisSelected1} >Away</Checkbox>
                <Checkbox isSelected={isSelected_tournament} onValueChange={setisSelected_tournament}>This Tournament</Checkbox>
              </div> :
              <div className="flex  justify-around my-4">
                <Checkbox isSelected={isSelected1} onValueChange={setisSelected1} >At {currentMatch?.homeTeam.shortName}</Checkbox>
                <Checkbox isSelected={isSelected_tournament} onValueChange={setisSelected_tournament}>This Tournament</Checkbox>
              </div>

        }
        {
          h2hEvent.map((item, index) => (
            (!isSelected_tournament || currentMatch?.tournament.name == item.tournament.name) && checkTypeOfmatch({ match: item }) &&
            <div key={index} className={`  py-1 w-full space-y-1 text-[14px]`}>
              {
                !(isSelected1 && currentTeam == 'h2h') && !isSelected_tournament && h2hEvent[index].tournament.name != h2hEvent[index - 1]?.tournament.name &&
                <div className="w-full flex">
                  <div className="w-[20%] flex justify-center items-center ">
                    <DisplayImage onErrorImage='team' alt='' width={25} height={25} src={`https://sofascore.com/api/v1/unique-tournament/${item.tournament.uniqueTournament.id}/image`} />
                  </div>
                  <div className=" relative w-full flex justify-between pr-[60px] items-center">
                    <div className="">
                      <p>
                        <Link href={`/ma/tournament/soccer/${item.tournament.category.name}/${item.tournament.uniqueTournament.slug}/${item.tournament.uniqueTournament.id}`} className=" text-gray-400  hover:text-blue-600 text-[12px]"> {item.tournament.name}</Link>
                      </p>
                      <p>
                        <Link href={'/'} className=" text-gray-600  font-semibold hover:text-blue-600 text-[13px]"> {item.tournament.category.name}</Link>
                      </p>
                    </div>
                  </div>
                </div>
              }
              <Link href={`/ma/${item.slug}/${item.customId}#id:${item.id}`} className={` w-full flex items-center space-x-3  hover:bg-custom-default-hover`}>
                {/* {h2hEvent[index].tournament.name} */}

                <div className="w-[20%] text-[12px]  flex flex-col justify-center items-center border-r-[1px] border-[#b8b9bda7] opacity-50 ">
                  {
                    '20/200'
                    // matchesDate && <p className=" whitespace-nowrap">{extractFormDate_2(matchesDate.toDate())}</p>
                  }
                  <p className={`${(item.status.description == 'Postponed' || item.status.description == 'Canceled') ? 'text-red-700  font-bold ' : ''}`}>{item.status.description == 'Ended' ? 'FT' : item.status.description == 'Not started' ? '-' : item.status.description}</p>
                  {/* <p>{item.status.type}</p> */}
                </div>
                <div className=" relative w-full   flex  justify-between  items-center border--[1px]  pr-[60px] border-[#b8b9bda7]  text-[14px]">
                  <div className="">
                    <div className="flex space-x-1 items-center ">
                      <DisplayImage onErrorImage='team' alt='' width={20} height={20} src={`https://sofascore.com/api/v1/team/${item.homeTeam.id}/image/small`} />
                      <div className="opacity-80">
                        {item.homeTeam.shortName}
                      </div>
                    </div>
                    <div className="flex space-x-1 items-center">
                      <DisplayImage onErrorImage='team' alt='' width={20} height={20} src={`https://sofascore.com/api/v1/team/${item.awayTeam.id}/image/small`} />
                      <div className=" opacity-80">
                        {item.awayTeam.shortName}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-5">

                    <div className="">
                      <div className="">{item.homeScore.display}</div>
                      <div className="">{item.awayScore.display}</div>
                    </div>
                  </div>
                  <button className=" absolute w-[50px] right-0 top-0 pl-1 flex  justify-center items-center  h-full  border-l-[1px] border-[#b8b9bda7] ">
                    <DisplayImage onErrorImage='team' alt='' width={30} height={30} className="p-0.5 hover:bg-blue-100  rounded-md" src='/image/notifications-none.svg' />
                  </button>
                </div>
              </Link>
              <div>

              </div>

            </div >
          ))
        }
      </div>
    </div>
  )
}

export default Matches