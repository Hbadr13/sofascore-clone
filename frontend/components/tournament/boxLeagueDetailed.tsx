import { LeaguesAPIJson } from "@/interface/api/leagues"
import { StandingsAPIJson } from "@/interface/api/standings"
import { Button, Checkbox, CheckboxGroup, Chip } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { CheckboxCustom, DropdownCustom } from "./PlayerStatistics"
import { Image } from '@nextui-org/react';

import { addSpaceBeforeUppercase, convertAfterSpaceToUpper } from "@/utils/function"
import { CustomScroll } from "react-custom-scroll"
import { performanceMetrics } from "@/interface/api/PerformanceMetricsCompProps"
import DisplayImage from "@/utils/displayImage"


interface PerformanceMetricsCompProps {
    selectedFields: Array<string>
    setselectedFields: (selectedFields: Array<string>) => void
}

const PerformanceMetricsComp = ({ selectedFields, setselectedFields }: PerformanceMetricsCompProps) => {
    const [currentOption, setCurrentOption] = useState<string>('')
    const [displayMaximumNumberAnimation, setdisplayMaximumNumberAnimation] = useState(false)
    return <div className=" relative">
        <div className="flex  space-x-3  pb-2">
            {
                performanceMetrics.map((item, index) => <div key={index}>
                    <Button onClick={() => currentOption != item.name ? setCurrentOption(item.name) : setCurrentOption('')} className={`flex ${item.name == currentOption ? 'bg-blue-100' : 'bg-blue-0'}`}>
                        <div className=" ">
                            {item.name}
                        </div>
                        <Image className={`${item.name == currentOption ? 'rotate-90' : '-rotate-90'}  `} width={20} height={20} alt='arraw' src={'/image/blue-arraw.svg'} />
                    </Button>
                </div>
                )
            }
        </div>
        <CheckboxGroup
            defaultValue={[]}
            value={selectedFields}
            onValueChange={(value) => {
                if (selectedFields.length > 5 && value.length > selectedFields.length) {
                    setselectedFields(selectedFields)
                    setdisplayMaximumNumberAnimation(true)
                }
                else {
                    setselectedFields(value)
                    setdisplayMaximumNumberAnimation(false)
                }
            }
            }
        >
            <div className="grid grid-cols-5 gap-2">
                {
                    performanceMetrics.map((item) =>

                        currentOption == item.name && item.option?.map((opt, index) =>
                            <div key={index} className="flex space-x-2 w-[150px] items-center ">
                                <Checkbox isDisabled={displayMaximumNumberAnimation && selectedFields.indexOf(opt) == -1} value={opt} />
                                <div className="text-[11px] truncate">{addSpaceBeforeUppercase(opt).replace('Percentage', '%')}</div>
                            </div>
                        )
                    )
                }
            </div>
        </CheckboxGroup>
        <div className="flex  gap-2 py-4  overflow-scroll  overflow-y-hidden hideScroll">
            {
                selectedFields.map((field, index) =>
                    <Chip key={index} className='text-[12px] w-24 ' onClose={() => { setselectedFields(selectedFields.filter((item) => item != field)), setdisplayMaximumNumberAnimation(false) }}>
                        {addSpaceBeforeUppercase(field.replace('Percentage', '%'))}
                    </Chip>
                )
            }
        </div>
        {displayMaximumNumberAnimation && < div className="maximumNumberAnimation w-[300px]  bg-blue-700 rounded-3xl  fixed   right-[calc(50%-150px)]  z-40 p-5 text-white font-medium">
            maximum Number of filter fields already selected
        </div>}
    </div >
}




interface DetailedProps {
    selectOption: string,
    isSelected: boolean,
    setIsSelected: (isSelected: boolean) => void,
    accumulation: Set<string> | string
    setAccumulation: (accumulation: Set<string> | string) => void
    standings: StandingsAPIJson[] | null
    setFilterDetails: (filterDetails: string) => void

}
const Detailed = ({ setFilterDetails, standings, selectOption, isSelected, setIsSelected, accumulation, setAccumulation }: DetailedProps) => {
    const [selectedFields, setselectedFields] = useState<Array<string>>(['Goals', 'SuccessfulDribbles', 'Tackles', 'Assists', 'AccuratePassesPercentage', 'Rating',]);
    const [accumulation_, setAccumulation_] = useState<Set<string> | string>(new Set(["total"]));
    const typeEQ = ['Overall', 'Home', 'Away']
    const [currentType, setCurrentType] = useState('Overall')
    const [PreferredFoot, setPreferredFoot] = useState<Set<string>>(new Set(['All']))
    const [position, setPosition] = useState<Array<string>>(['G', 'D', 'M', 'F'])
    const [age, setAge] = useState<Set<string>>(new Set(['all']))
    const [AppearancesValue, setAppearancesValue] = useState('')
    const [Appearances, setAppearances] = useState<Set<string>>(new Set(['all']))
    const [ageValue, setAgeValue] = useState('')
    const [countries, setCountries] = useState<LeaguesAPIJson[]>([])

    const [IsselectNationality, setIsSelectNationality] = useState(true)
    const [isSelecteAllcountries, setIsSelecteAllcountries] = useState(false)
    const [selectedCountries, setselectedCountries] = useState<Array<string>>([]);

    const [isSelectTeam, setIsSelectTeam] = useState(true)
    const [isSelectAllTeam, setIsSelectAllTeam] = useState(false)
    const [selectedAllTeams, setSelectedAllTeams] = useState<Array<string>>([]);

    useEffect(() => {
        if (isSelecteAllcountries) {
            let courts: Array<string> = []
            countries.map((coutrs) => coutrs.alpha2 ? courts.push(coutrs.alpha2) : undefined)
            setselectedCountries(courts)
        }
        else
            setselectedCountries([])

    }, [isSelecteAllcountries, countries])

    useEffect(() => {
        if (!standings)
            return
        if (isSelectAllTeam) {
            let teams: Array<string> = []
            standings[0].rows.map((team) => teams.push(String(team.team.id)))
            setSelectedAllTeams(teams)
        }
        else
            setSelectedAllTeams([])

    }, [isSelectAllTeam, standings])

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/sport/football/categories`, {})
                if (response.ok) {
                    const data = await response.json()
                    setCountries(data.categories.filter((country: LeaguesAPIJson) => !country.name.includes('Amateur') && !country.name.includes('Israel')))
                }
            }
        )()
    }, [])
    const handelAplayFilters = () => {

        let api = '&accumulation=' + Array.from(accumulation_)[0]
        api += '&fields='
        if (selectedFields.length)
            api += selectedFields.reduce((previousValue: string, currentValue: string, currentIndex: number) => {
                return previousValue + '%2C' + currentValue
            })
        api += '&filters='
        if (currentType != 'Overall')
            api += 'type.EQ.' + currentType.toLowerCase() + '%2C'
        // api += '&filters='
        if (Array.from(age)[0] != 'all')
            api += 'age.' + Array.from(age)[0] + '.' + ageValue + '%2C'
        if (Array.from(Appearances)[0] != 'all')
            api += 'appearances.' + Array.from(Appearances)[0] + '.' + AppearancesValue + '%2C'
        api += 'position.in.'
        if (position.length)
            api += position.reduce((previousValue: string, currentValue: string) => previousValue + '~' + currentValue)
        if (Array.from(PreferredFoot)[0] != 'all')
            api += '%2CpreferredFoot.EQ.' + Array.from(PreferredFoot)[0]

        if (selectedAllTeams.length)
            api += '%2Cteam.in.' + selectedAllTeams.reduce((previousValue: string, currentValue: string, currentIndex) => previousValue + '~' + currentValue)
        if (selectedCountries.length)
            api += '%2Cnationality.in.' + selectedCountries.reduce((previousValue: string, currentValue: string, currentIndex) => previousValue + '~' + currentValue)
        setFilterDetails(api)
    }

    const handelClearFilter = () => {
        setCurrentType('Overall')
        setPreferredFoot(new Set(['all']))
        setPosition(['G', 'D', 'M', 'F'])
        setAge(new Set(['all']))
        setCountries([])
        setIsSelectNationality(true)
        setIsSelecteAllcountries(false)
        setselectedCountries([]);
        setIsSelectTeam(true)
        setIsSelectAllTeam(false)
        setSelectedAllTeams([]);
        setselectedFields(['Goals', 'SuccessfulDribbles', 'Tackles', 'Assists', 'AccuratePassesPercentage', 'Rating',]);

        setFilterDetails('&fields=goals%2CsuccessfulDribbles%2Ctackles%2Cassists%2CaccuratePassesPercentage%2Crating&filters=position.in.G~D~M~F')
    }
    useEffect(() => {
        if (!IsselectNationality) {
            setIsSelecteAllcountries(false)
            setselectedCountries([])
        }
    }, [IsselectNationality])
    useEffect(() => {
        if (!isSelectTeam) {
            setIsSelectAllTeam(false)
            setSelectedAllTeams([])
        }
    }, [isSelectTeam])


    if (selectOption != 'Detailed')
        return <div className="flex justify-between  py-5 items-center px-4 ">
            <div className=" w-1/2  flex items-center  font-medium space-x-3 text-sm">
                <Checkbox isSelected={isSelected} onValueChange={(isSelected) => setIsSelected(isSelected)} >
                    <div className=" text-sm">
                        All Players
                    </div>
                </Checkbox>
                <Checkbox isSelected={!isSelected} onValueChange={(isSelected) => setIsSelected(!isSelected)}>
                    <div className=" text-sm">
                        Players With minimum appearances
                    </div>
                </Checkbox>
            </div>
            <DropdownCustom selectedKeys={accumulation} setSelectedKey={setAccumulation} options={[{ name: 'All', key: 'total' }, { name: 'Per game', key: 'perGame' }, { name: 'Per 90 mins', key: 'per90' }]} />

        </div>
    return (
        <div className={` mb-2`}>
            <div className="flex mt-7 items-center px-4 border-b-1 border-gray-200">
                <div className="w-1/3 py-3">
                    <div className=" space-x-4">
                        {typeEQ.map((type, index) =>
                            <Checkbox key={index} onClick={() => setCurrentType(type)} isSelected={type == currentType}// onValueChange={(isSelected) => setIsSelected(isSelected)} 
                            >
                                <div className=" text-sm">
                                    {type}
                                </div>
                            </Checkbox>
                        )}
                    </div>
                </div>
                <div className="w-1/3 flex items-center justify-center space-x-2">
                    <div className="text-sm font-medium">Appearances</div>
                    <DropdownCustom selectedKeys={Appearances} setSelectedKey={setAppearances} options={[{ name: 'All', key: 'all' }, { name: 'More than', key: 'GT' }, { name: 'Equals', key: 'EQ' }, { name: 'Less than', key: 'LT' }]} />
                    {/* calc onChange={(e) => setAppearancesValue(e.target.value)} value={AppearancesValue} hidden={Array.from(Appearances)[0] == 'all'} className='w-12 px-1 h-8 border-1 border-gray-300 rounded-[10px] outline-gray-500' /> */}
                </div>
                <div className="w-1/3 flex items-center justify-end space-x-2">
                    <div className="text-sm font-medium">Accumulation</div>
                    <DropdownCustom selectedKeys={accumulation_} setSelectedKey={setAccumulation_} options={[{ name: 'All', key: 'total' }, { name: 'Per game', key: 'perGame' }, { name: 'Per 90 mins', key: 'per90' }]} />
                </div>
            </div>
            <div className="flex  h-12 items-center justify-between px-4 border-b-1 border-gray-200 ">
                <div className="w-1/3 flex items-center space-x-2">
                    <div className="text-sm font-medium">Age</div>
                    <DropdownCustom selectedKeys={age} setSelectedKey={setAge} options={[{ name: 'All', key: 'all' }, { name: 'More than', key: 'GT' }, { name: 'Equals', key: 'EQ' }, { name: 'Less than', key: 'LT' }]} />
                    <input onChange={(e) => setAgeValue(e.target.value)} value={ageValue} hidden={Array.from(age)[0] == 'all'} className='w-12 px-1 h-8 border-1 border-gray-300 rounded-[10px] outline-gray-500' />
                </div>
                <div className=''>
                    <CheckboxGroup
                        orientation="horizontal"
                        defaultValue={position}
                        value={position}
                        onValueChange={setPosition}
                    >
                        <Checkbox value="G">G</Checkbox>
                        <Checkbox value="D">D</Checkbox>
                        <Checkbox value="M">M</Checkbox>
                        <Checkbox value="F">F</Checkbox>
                    </CheckboxGroup>
                </div>
                <div className=" flex items-center justify-end space-x-2 w-1/3">
                    <div className="text-sm font-medium">Preferred foot</div>
                    <DropdownCustom selectedKeys={PreferredFoot} setSelectedKey={setPreferredFoot} options={[{ name: 'All', key: 'All' }, { name: 'Both', key: 'Both' }, { name: 'Right', key: 'Right' }, { name: 'Left', key: 'Left' }]} />
                </div>
            </div>

            <div className="  py-3  justify-between px-4 ">
                <div className="flex  py-3  justify-between ">
                    <CheckboxCustom name='Nationality' box1='All' box2='Choose' isSelected={IsselectNationality} setIsSelected={setIsSelectNationality} />
                    <CheckboxCustom name='Team' box1='All' box2='Choose' isSelected={isSelectTeam} setIsSelected={setIsSelectTeam} />
                </div>
                <div className=" bg-gray-100 rounded-xl p-2">
                    {

                        !IsselectNationality &&
                        <div className="">
                            <div className="p-4">
                                <CheckboxCustom name='' box1='Select all' box2='Deselect all' isSelected={isSelecteAllcountries} setIsSelected={setIsSelecteAllcountries} />
                            </div>
                            <CheckboxGroup
                                defaultValue={[]}
                                value={selectedCountries}
                                onValueChange={setselectedCountries}
                            >
                                <div className="grid grid-cols-6 gap-2">
                                    {
                                        countries.slice(8).slice(0, 80).map((country, index) =>
                                            <div key={index} className="flex space-x-2 w-[150px] items-center ">
                                                <Checkbox value={country.alpha2} />
                                                <div className="w-5 h-5">
                                                    <DisplayImage onErrorImage='flag' width={400} height={400} alt='country' src={`https://cdn.alkora.app/static/images/flags/${country.alpha2?.toLocaleLowerCase()}.png`} />
                                                </div>
                                                <div className="text-[10px] truncate">{country.name}</div>
                                            </div>
                                        )
                                    }
                                </div>
                            </CheckboxGroup>
                        </div>
                    }
                    {
                        !isSelectTeam &&
                        <div className="">
                            <div className="p-4">
                                <CheckboxCustom name='' box1='Select all' box2='Deselect all' isSelected={isSelectAllTeam} setIsSelected={setIsSelectAllTeam} />
                            </div>
                            <CheckboxGroup
                                defaultValue={["buenos-aires", "london"]}
                                value={selectedAllTeams}
                                onValueChange={setSelectedAllTeams}
                            >
                                <div className="grid grid-cols-5 gap-2">
                                    {
                                        standings && standings[0].rows.map((team, index) =>
                                            <div key={index} className="flex space-x-2 w-[150px] items-center ">
                                                <Checkbox value={String(team.team.id)} />
                                                <div className="w-5 h-5">
                                                    <DisplayImage onErrorImage='team' width={400} height={400} alt='team' src={`https://sofascore.com/api/v1/team/${team.team.id}/image`} />
                                                </div>
                                                <div className="text-[12px] truncate">{team.team.shortName}</div>
                                            </div>
                                        )
                                    }
                                </div>
                            </CheckboxGroup>
                        </div>
                    }
                    <PerformanceMetricsComp selectedFields={selectedFields} setselectedFields={setselectedFields} />
                </div>
            </div>
            <div className='pl-5 space-x-2 '>
                <Button onClick={handelAplayFilters} color='primary' className='font-semibold'>APLLY</Button>
                <Button onClick={handelClearFilter} className='font-semibold'>CLEAR FILTERS</Button>
            </div>
        </div >
    )

}

export default Detailed