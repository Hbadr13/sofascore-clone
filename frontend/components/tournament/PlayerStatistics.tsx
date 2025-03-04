import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Checkbox, CheckboxGroup, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Pagination } from '@nextui-org/react'
import { EventAPIJson } from '@/interface/api/event'
import { Button } from "@nextui-org/react";
import { PlayerStatisticsAPIjson } from '@/interface/api/PlayerStatistics'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import Shi_StatisticsTable from '../shimmer/shi_StatisticsTable'
import { CountUpAnimation } from './teamOfTheWeek'
import { addSpaceBeforeUppercase } from '@/utils/function'
import { StandingsAPIJson } from '@/interface/api/standings'
import Detailed from './boxLeagueDetailed'
import DisplayRating from '@/utils/displayRating';
import DisplayImage from '@/utils/displayImage';
import Link from 'next/link';

const countriesAlphas = ["AL", "AR", "AT", "BA", "BE", "BF", "BR", "CD", "CH", "CI", "CL", "CM", "CO", "CR", "CZ", "DE", "DK", "DZ", "EC", "EG", "EN", "ES", "FI", "FR", "GA", "GD", "GH", "GR", "HR", "HU", "IE", "IL", "IR", "IS", "IT", "JM", "JP", "KR", "MA", "ML", "MX", "NG", "NL", "NO", "NX", "NZ", "PL", "PT", "PY", "RO", "RS", "SE", "SK", "SN", "SX", "SY", "TN", "TR", "UA", "US", "UY", "WA", "XK", "ZA", "ZW"]



interface ItemTableHeaderProps {
  item: string
  filter: string
  setFilter: (filter: string) => void
}

const ItemTableHeader = ({ item, filter, setFilter }: ItemTableHeaderProps) => {
  return <button onClick={() => filter == '-' + item ? setFilter(item) : setFilter('-' + item)} className={`  w-full max-w-[70px]  ${item == 'rating' ? 'min-w-[60px]' : ''} truncat  h-[60px] text-center text-gray-800 flex flex-col justify-end items-center`}>
    <div className="truncat capitalize flex flex-col items-center justify-center h-[30px] ">
      {addSpaceBeforeUppercase(item).replace('Percentage', '%').replace('The', '').replace('Shots', '').replace(' ', '|').split('|').map((str, index) => <div key={index} className='truncate'>{str}</div>)}
    </div>
    <Image alt='arraw' className={`${filter == '-' + item ? ' -rotate-90' : filter == item ? 'rotate-90' : ' -rotate-90'}`} src={filter == item || filter == '-' + item ? '/image/blue-arraw.svg' : '/image/arraw.svg'} width={20} height={20}></Image>
  </button >
}

interface StatisticsTableProps {
  PlayerStatistics: PlayerStatisticsAPIjson[],
  currentPage: number,
  PlayerStatisticsColumn: Array<string>
  filter: string
  setFilter: (filter: string) => void

}
export const StatisticsTable = ({ PlayerStatistics, currentPage, PlayerStatisticsColumn, setFilter, filter }: StatisticsTableProps) => {

  return (
    <Table fullWidth className=' w-full ' isStriped aria-label="Example static collection table">
      <TableHeader className=''  >


        {
          PlayerStatisticsColumn.map((column, index) =>
            index == 0 ? (<TableColumn key={index} className=''>
              <div className="  w-[80px] h-[60px] flex items-center text-gray-800   space-x-5">
                <div className="w-6   text-center">#</div>
                <div className="w-7 h-5">
                  Team
                </div>
              </div>
            </TableColumn>
            ) : index == 1 ?
              <TableColumn key={index} ><div className="   text-gray-800  text-center">Name</div></TableColumn>
              :
              (<TableColumn key={index} className='  '>
                <ItemTableHeader item={column} setFilter={setFilter} filter={filter} />
              </TableColumn>)
          )
        }
      </TableHeader>

      <TableBody items={PlayerStatistics}>
        {(item) => <TableRow className='' key={item.player.id}>
          {
            PlayerStatisticsColumn.map((column, index) =>
              index == 0 ? <TableCell key={index} className=''>
                <div className="  w-[80px] text-gray-800 flex  space-x-5">
                  <div className="w-6  text-center">{(PlayerStatistics.indexOf(item) + 1 + (currentPage - 1) * 20)}</div>
                  <Link href={`/ma/player/${item.team.slug}/${item.team.id}`} className="w-7 h-5 hover:scale-110 duration-150">
                    <DisplayImage onErrorImage='team' className='w-6' src={`https://sofascore.com/api/v1/team/${item.team.id}/image`} alt='/h' width={400} height={400} />
                  </Link>
                </div>
              </TableCell> : index == 1 ?
                <TableCell key={index} ><Link href={`/ma/player/${item.player.slug}/${item.player.id}`} className=" truncate w-[105px] text-[13px] hover:text-blue-500">{item.player.name}</Link></TableCell>
                : column == 'rating' ?
                  <TableCell key={index} >
                    <div className=" scale-85">
                      <DisplayRating rating={item.rating} type='out' />
                    </div>
                  </TableCell > :
                  <TableCell key={index} >
                    <div className="text-center  ">{Object.getOwnPropertyDescriptor(item, column)?.value}</div>
                  </TableCell>
            )
          }
        </TableRow>
        }
      </TableBody>
    </Table>
  );
}

interface CheckboxCustomProps {
  name: string
  box1: string
  box2: string
  isSelected: any
  setIsSelected: (isSelected: any) => void
}

export const CheckboxCustom = ({ name, box1, box2, isSelected, setIsSelected }: CheckboxCustomProps) => {
  return <div className="   flex items-center  font-medium space-x-1 text-sm">
    <div className=" text-sm">
      {name}
    </div>
    <Checkbox isSelected={isSelected} onValueChange={(isSelected) => setIsSelected(isSelected)} >
      <div className=" text-sm">
        {box1}
      </div>
    </Checkbox>
    <Checkbox isSelected={!isSelected} onValueChange={(isSelected) => setIsSelected(!isSelected)}>
      <div className=" text-sm">
        {box2}
      </div>
    </Checkbox>
  </div>
}

export const DropdownCustom = ({ options, selectedKeys, setSelectedKey }: { options: Array<{ name: string, key: string }>, selectedKeys: any, setSelectedKey: any }) => {
  return <Dropdown className='w-5'>
    <DropdownTrigger>
      <Button
        size='sm'
        variant="ghost"
        className="capitalize border-0 bg-gray-200/50"
      >
        <div className="text-md text-black  font-medium" >{options.find((itm) => Array.from(selectedKeys)[0] == itm.key)?.name}</div>
        <Image className='-rotate-90' width={20} height={20} src={'/image/arraw.svg'} alt='' />
      </Button>

    </DropdownTrigger>
    <DropdownMenu

      aria-label="Single selection example"
      variant="flat"
      disallowEmptySelection
      selectionMode='single'
      selectedKeys={selectedKeys}
      items={options}
      onSelectionChange={(key: any) => setSelectedKey(key)}
    >
      {(item) => <DropdownItem key={item.key}>{item.name}</DropdownItem>}
    </DropdownMenu>
  </Dropdown>
}







interface PlayerStatisticsProps {
  tournamentId: number
  featuredEvent: EventAPIJson | null
  seasonId: string | null
  standings: StandingsAPIJson[] | null

}

const PlayerStatistics = ({ standings, featuredEvent, tournamentId, seasonId }: PlayerStatisticsProps) => {
  const [isSelected, setIsSelected] = React.useState(true);
  const [PlayerStatistics, setPlayerStatistics] = useState<PlayerStatisticsAPIjson[]>([])
  const [PlayerStatisticsColumn, setPlayerStatisticsColumn] = useState<string[]>([])
  const [selectOption, setselectOption] = useState<string>('Summary')


  const [filterDetails, setFilterDetails] = useState<string>('&accumulation=total&fields=goals%2CsuccessfulDribbles%2Ctackles%2Cassists%2CaccuratePassesPercentage%2Crating&filters=position.in.G~D~M~F')
  const [filter, setFilter] = useState<string>('-rating')
  const [accumulation, setAccumulation] = React.useState<Set<string> | string>(new Set(["total"]));
  const [waitdata, setWaitdata] = React.useState(true);
  const performanceDetails = ['Summary', 'Attack', 'Defence', 'Passing', 'Goalkeeper', 'Detailed']
  const [currentPage, setCurrentPage] = React.useState(1);
  const [numberOfPage, setNumberOfPage] = React.useState(0);
  const [noPlayerFound, setNoPlayerFound] = useState(false)

  useEffect(() => {
    (
      async () => {
        try {


          if (featuredEvent == null || !currentPage || !selectOption || !filter)
            return
          setWaitdata(true)
          let api = ''
          let minAppsyes = ''
          let groupOrFields = ''
          if (!isSelected)
            minAppsyes = '&minApps=yes'
          let filters = ''
          let acumm_ = ''
          if (selectOption == 'Detailed') {
            groupOrFields = `${filterDetails}`
          }
          else {
            acumm_ = `&accumulation=${Array.from(accumulation)[0]}`
            groupOrFields = `&group=${selectOption.toLowerCase()}`
          }
          if (selectOption == 'Goalkeeper')
            filters = '&filters=position.in.G'

          if (tournamentId && seasonId) {
            api = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/unique-tournament/${tournamentId}/season/${seasonId}/statistics?limit=20&order=${filter}&offset=${(currentPage - 1) * 20}${acumm_}${groupOrFields}${minAppsyes}${filters}`
          }
          else {
            api = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/unique-tournament/${featuredEvent.tournament.uniqueTournament.id}/season/${featuredEvent.season.id}/statistics?limit=20&order=${filter}&offset=${(currentPage - 1) * 20}${acumm_}${groupOrFields}${minAppsyes}${filters}`
          }
          const response = await fetch(api, {})
          if (response.ok) {
            const data = await response.json()
            if (data.results.length == 0) {
              setNoPlayerFound(true)
              return
            }
            setNoPlayerFound(false)
            setPlayerStatistics(data.results)
            const keys: Array<string> = ['1', '2'].concat(Object.keys(data.results[0]).filter((item) => item != 'team' && item != 'player'))
            setPlayerStatisticsColumn(keys)
            setNumberOfPage(data.pages)
            setWaitdata(false)
          }
        } catch (error) {

        }
      }
    )()
  }, [featuredEvent, currentPage, tournamentId, isSelected, accumulation, selectOption, filter, filterDetails, seasonId])



  useEffect(() => { selectOption == 'Attack' ? setFilter('-goals') : selectOption == 'Defence' ? setFilter('-tackles') : selectOption == 'Passing' ? setFilter('-bigChancesCreated') : selectOption == 'Goalkeeper' ? setFilter('-saves') : setFilter('-rating') }, [selectOption])
  if (noPlayerFound)
    return
  return (
    <div className="bg-[#ffffff] MYDeg rounded-2xl ">
      <div className="w-full text-center text-lg font-semibold  pb-5 pt-2">Player Statistics</div>
      <div className=" flex items-center font-medium space-x-3 text-sm pl-4">
        {
          performanceDetails.map((item, index) =>
            <button key={index} onClick={() => setselectOption(item)} className={`py-1 px-2 rounded-lg border-1 ${selectOption == item ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>{item}</button>
          )
        }
      </div>
      <Detailed setFilterDetails={setFilterDetails} standings={standings} selectOption={selectOption} isSelected={isSelected} setIsSelected={setIsSelected} accumulation={accumulation} setAccumulation={setAccumulation} />
      {
        !waitdata ? <div className='w-full p-3'>
          <StatisticsTable PlayerStatisticsColumn={PlayerStatisticsColumn} PlayerStatistics={PlayerStatistics} currentPage={currentPage} filter={filter} setFilter={setFilter} />
          {numberOfPage && <div className=" w-full flex justify-center mt-5">
            <Pagination
              page={currentPage}
              onChange={setCurrentPage}
              showControls total={numberOfPage}
              initialPage={1}
            />
          </div>}
        </div>
          : <Shi_StatisticsTable />
      }
    </div >
  )
}

export default PlayerStatistics
