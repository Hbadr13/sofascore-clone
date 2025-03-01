import Link from 'next/link';
import moment from 'moment';
import { AllPlayersAPIJson } from '@/interface/api/allPlayers';
interface IAboutTeamProps {
    allPlayers: AllPlayersAPIJson | null
    team: ITeamAPIJson | null
}

const AboutTeam = ({ team }: IAboutTeamProps) => {
    if (!team) return null;

    const { name, manager, venue, primaryUniqueTournament, userCount, foundationDateTimestamp } = team;
    const { city, stadium } = venue;
    const { primaryColorHex, secondaryColorHex } = primaryUniqueTournament;

    // Placeholder data for next and previous matches
    const nextMatch = {
        opponent: 'Milan',
        date: 'Jul 31, 2024, 11:00:00 AM UTC',
        competition: 'Club Friendly Games'
    };

    const previousMatch = {
        opponent: 'Borussia Dortmund',
        date: 'UEFA Champions League',
        result: '0 - 2 (Real Madrid won the match)'
    };

    // Placeholder data for players
    const players = {
        forwards: ['Kylian Mbappé', 'Vinícius Júnior', 'Rodrygo', 'Juanmi Latasa'],
        midfielders: ['Jude Bellingham', 'Luka Modrić', 'Arda Güler', 'Federico Valverde', 'Eduardo Camavinga', 'Aurélien Tchouaméni', 'Brahim Díaz', 'Dani Ceballos', 'Nico Paz', 'Reinier'],
        defenders: ['Antonio Rüdiger', 'Éder Militão', 'Daniel Carvajal', 'David Alaba', 'Ferland Mendy', 'Nacho Fernández', 'Fran García', 'Jesús Vallejo'],
        goalkeepers: ['Thibaut Courtois', 'Andriy Lunin']
    };

    return (
        <div className="bg-white rounded-2xl p-6 space-y-4 leading-6 MYDeg">
            <h1 className="text-2xl font-bold">About {name}</h1>
            <p>{name} live scores, players, season schedule and today’s results are available on Sofascore.</p>

            <h2 className="text-xl font-semibold">{name} next match</h2>
            <p>
                {name} will play the next match against {nextMatch.opponent} on {moment(nextMatch.date).format('MMMM Do, YYYY, h:mm:ss A')} UTC in {nextMatch.competition}.
                When the match starts, you will be able to follow {nextMatch.opponent} vs {name} live score, standings, minute by minute updated live results and match statistics.
            </p>
            <p>We may have video highlights with goals and news for some {name} matches, but only if they play their match in one of the most popular soccer leagues.</p>

            <h2 className="text-xl font-semibold">{name} previous match</h2>
            <p>{name} previous match was against {previousMatch.opponent} in {previousMatch.date}, the match ended with result {previousMatch.result}.</p>

            <h2 className="text-xl font-semibold">{name} fixtures</h2>
            <p>
                {name} fixtures tab is showing the last 100 soccer matches with statistics and win/draw/lose icons.
                There are also all {name} scheduled matches that they are going to play in the future.
            </p>

            <h2 className="text-xl font-semibold">Current {name} players</h2>
            <div>
                <h3 className="font-semibold">Forwards:</h3>
                <p>{players.forwards.join(', ')}</p>
            </div>
            <div>
                <h3 className="font-semibold">Midfielders:</h3>
                <p>{players.midfielders.join(', ')}</p>
            </div>
            <div>
                <h3 className="font-semibold">Defenders:</h3>
                <p>{players.defenders.join(', ')}</p>
            </div>
            <div>
                <h3 className="font-semibold">Goalkeepers:</h3>
                <p>{players.goalkeepers.join(', ')}</p>
            </div>

            <p>The current {name} roster, stats and player performance can be found on this page.</p>
            <p>There are also statistics for each player in all competitions with all total played and started matches, minutes played, number of goals scored, number of cards and much more.</p>
            <p>{name} top scorers list is updated live during every match.</p>
            <p>You can click on players from the roster above and see available personal information such as nationality, date of birth, height, preferred foot, position, player value, transfer history etc.</p>
            <p>For today’s soccer schedule and results visit our soccer live score page.</p>
        </div>
    );
};
export default AboutTeam;
