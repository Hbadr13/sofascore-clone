import Image from "next/image";
import { ILineupsPlayer, ILineupsTeam } from "../matchInfo/lineupsMap";

interface Props {
    matchId: number;
    team: ILineupsTeam;
    player: ILineupsPlayer;
    isAwayTeam?: boolean;
    isGoalkeeper?: boolean;
}

export default function LineupsPlayer(props: Props) {
    return (
        <div className="flex flex-col max-w-10 items-center">
            <div className="relative w-8 aspect-square">
                <Image alt="'" width={100} height={100} className="w-full h-full" src={`https://sofascore.com/api/v1/event/${props.matchId}/jersey/${props.isAwayTeam ? 'away' : 'home'}/${props.isGoalkeeper ? 'goalkeeper' : 'player'}/fancy`}></Image>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ 'color': `#${props.isGoalkeeper ? props.team.goalkeeperColor.fancyNumber : props.team.playerColor.fancyNumber}` }}>{props.player?.shirtNumber}</div>
            </div>
            <div className="text-black text-xs text-center">{props.player?.player.name}</div>
        </div>
    );
}