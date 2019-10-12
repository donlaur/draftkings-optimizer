export interface IDraftKingsResponse {
    draftableId: number,
    firstName: string,
    lastName: string,
    playerId: number,
    position: string,
    salary: number,
    status: string,
    draftStatAttributes: IDraftKingsDraftStatAttributes[],
    teamAbbreviation: string
}

export interface IDraftKingsDraftStatAttributes {
    id: number,
    value: number,
    sortValue: number,
    quality?: string
}