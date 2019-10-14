export interface IResponse {
	lineups: ILineup[],
	success: boolean,
	message: string | null
}

export interface ILineup {
	players: IPlayer[],
	totalSalary: number,
	totalFppg: number
}

interface IPlayer {
	firstName: string,
	fppg: number,
	gameInfo: string
	id: string,
	lastName: string
	positions: string[],
	salary: number,
	status: string
	team: string,
    isLocked: boolean,
}

export interface IContest {
	draft_group_id: number,
	name: string
}

export interface IGroup {
	id: number,
	sport_id: string
}