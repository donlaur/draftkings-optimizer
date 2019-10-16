import { IDraftKingsResponse } from "../../components/interfaces/IDraftKingsResponse";

export function transformPlayers(players: IDraftKingsResponse[]) {
    return players.map((player) => ({
        ...player,
        isLocked: false
    }))
}