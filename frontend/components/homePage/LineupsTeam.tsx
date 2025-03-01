import { ILineupsTeam } from "../matchInfo/lineupsMap";
import LineupsPlayer from "./LineupsPlayer"

interface Props {
    matchId: number;
    team: ILineupsTeam;
    isAwayTeam?: boolean;
}

function lastIndex(lineupsTeam: ILineupsTeam, columnIndex: number): number {
    let result = 1; // Goalkeeper
    if (columnIndex > 0) for (const length of lineupsTeam.formation.split("-").filter((_, i: number) => i < columnIndex).map(value => parseInt(value))) result += length;
    return result;
}

export default function LineupsTeam(props: Props) {
    return (
        <div className={`  flex-1 h-full  flex ${props.isAwayTeam ? 'flex-col-reverse' : 'flex-col'} w-full  items-center justify-center`}>
            <div className={` ${props.isAwayTeam ? 'mb-1' : 'mt-1'}`}>
                <LineupsPlayer matchId={props.matchId} team={props.team} player={props.team.players[0]} isAwayTeam={props.isAwayTeam} isGoalkeeper={true} />
            </div>
            <div
                className={` flex    ${props.isAwayTeam ? 'flex-col-reverse' : 'flex-col'}  h-full w-full  items-cener justify-around`}
            >
                {props.team.formation.split("-").map((value: any, i: number) => (
                    <div key={i} className={`flex justify-around`}>
                        {[...Array(parseInt(value))].map((_, j) => (
                            <LineupsPlayer key={j} matchId={props.matchId} team={props.team} player={props.team.players[lastIndex(props.team, i) + j]} isAwayTeam={props.isAwayTeam} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}