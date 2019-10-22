export interface IDraftKingsResponse {
    draftableId: number,
    draftStatAttributes: IDraftKingsDraftStatAttributes[],
    firstName: string,
    isLocked: boolean,
    isExcluded: boolean,
    lastName: string,
    playerId: number,
    position: string,
    salary: number,
    status: string,
    teamAbbreviation: string
}

export interface IDraftKingsDraftStatAttributes {
    id: number,
    value: string,
    sortValue: number,
    quality?: string
}