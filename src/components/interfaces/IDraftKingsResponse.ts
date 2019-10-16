export interface IDraftKingsResponse {
    draftableId: number,
    draftStatAttributes: IDraftKingsDraftStatAttributes[],
    firstName: string,
    isLocked: boolean,
    lastName: string,
    playerId: number,
    position: string,
    salary: number,
    status: string,
    teamAbbreviation: string
}

export interface IDraftKingsDraftStatAttributes {
    id: number,
    value: number,
    sortValue: number,
    quality?: string
}