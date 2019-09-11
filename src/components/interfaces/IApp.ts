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
	team: string
}

export interface IContest {
	draft_group_id: number,
	name: string,
	payout: number
}

export interface IGroup {
	id: number,
	sport_id: string
}