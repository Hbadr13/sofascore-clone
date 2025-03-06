import LineupsTeam from "@/components/homePage/LineupsTeam";
import { MatchDetailsAPIJson } from "@/interface/api/matchs";
import { useEffect, useState } from "react";

interface Player {
    id: number;
    name: string;
}

export interface ILineupsPlayer {
    player: Player;
    shirtNumber: number;
    position: string;
    substitute: boolean;
}

export interface ILineupsTeam {
    players: ILineupsPlayer[];
    formation: string;
    playerColor: {
        primary: string;
        fancyNumber: string;
    },
    goalkeeperColor: {
        primary: string;
        fancyNumber: string;
    }
}

interface Lineups {
    home: ILineupsTeam;
    away: ILineupsTeam;
}

async function getLineups(matchId: number): Promise<Lineups | null> {
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${matchId}/lineups`, {})
        return response.ok ? await response.json() : null;
    } catch (error) {

    }
    return null
}

const LineupsMap = ({ currentMatch }: { currentMatch: MatchDetailsAPIJson | null }) => {
    const matchId = 11406789;
    const [lineups, setlineups] = useState<any>(null)



    useEffect(() => {
        (
            async () => {
                if (!currentMatch)
                    return
                const lnps = await getLineups(currentMatch?.id);
                setlineups(lnps)
            }
        )()
    }, [currentMatch])
    if (!lineups)
        return <></>
    return (
        <div className="w-full  h-[750px] ovh relative aspect-video my-5 box-border bg-[#ccedbf] mx-auto flex">
            <div className="w-full border-2 m-4 border-white ">
                <div className="h-1/2">
                    <LineupsTeam matchId={matchId} team={lineups.home}></LineupsTeam>
                </div>
                <div className=" w-full h-[2px] bg-white"></div>
                <div className="h-1/2">
                    <LineupsTeam matchId={matchId} team={lineups.away} isAwayTeam={true}></LineupsTeam>
                </div>
            </div>
            <div className="absolute left-6 top-6 text-sm font-bold">{lineups.home.formation}</div>
            <div className="absolute right-6  bottom-6 text-sm font-bold">{lineups.away.formation}</div>
        </div>
    )
}
export default LineupsMap