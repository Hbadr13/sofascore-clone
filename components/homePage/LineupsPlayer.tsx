import Image from "next/image";
import { ILineupsPlayer, ILineupsTeam } from "../matchInfo/lineupsMap";
import DisplayImage from "@/utils/displayImage";

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
            <div className="relative w-10 aspect-square">
                <DisplayImage alt="'" width={200} height={200} className=" rounded-full w-full h-full" src={`https://sofascore.com/api/v1/player/${props.player.player.id}/image`} />
            </div>
            <div className="text-black text-xs text-center">{props.player?.player.name}</div>
        </div>
    );
}