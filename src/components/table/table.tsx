import React from 'react';
import { IResponse, ILineup } from '../interfaces/IApp';
import { IDraftKingsResponse } from '../interfaces/IDraftKingsResponse';

interface ITableProps {
	data: IResponse | IDraftKingsResponse[]
}

export function Table( { data }: ITableProps) {
	return (
		<div className="table table--align-left" role="table">
			<div className="table__row table__row--header">
				{/* <div>ID</div> */}
				<div className="table__column table__column--first-name">First name</div>
				<div className="table__column table__column--last-name">Last name</div>
				<div className="table__column">Team</div>
				<div className="table__column">Positions</div>
				<div className="table__column text-align-right">Salary</div>
				<div className="table__column text-align-right">FPPG</div>
				{/* <div className="table__column text-align-right"></div> */}
				{/* {data.some((lineup) => lineup.players.some((player) => player.gameInfo)) ? (
					<div>Game info</div>
				) : <></>} */}
			</div>

			{data.length !== undefined ? (
				data.map((player: IDraftKingsResponse, i) => (
					<div className={`table__row ${player.status !== 'None' ? `table__row--${player.status}` : ''}`} key={i}>
						{/* <div>{player.id}</div> */}
						<div className="table__column table__column--first-name">{player.firstName}</div>
						<div className="table__column table__column--last-name">{player.lastName}</div>
						<div className="table__column">{player.teamAbbreviation}</div>
						<div className="table__column">{player.position}</div>
						<div className="table__column text-align-right">{player.salary}</div>
						<div className="table__column text-align-right">{player.draftStatAttributes[0].value}</div>
						{/* <div className="table__column text-align-right">Stats</div> */}
						{/* {player.gameInfo ? (
							<div>{player.gameInfo}</div>
						) : <></>} */}
					</div>
				))
			) : (
				data.lineups.map((lineup: ILineup, i) => (
					<>
						{lineup.players.map((player) => (
							<div className="table__row" key={player.id}>
								{/* <div>{player.id}</div> */}
								<div className="table__column table__column--first-name">{player.firstName}</div>
								<div className="table__column table__column--last-name">{player.lastName}</div>
								<div className="table__column">{player.team}</div>
								<div className="table__column">{player.positions}</div>
								<div className="table__column text-align-right">{player.salary}</div>
								<div className="table__column text-align-right">{player.fppg}</div>
								{/* <div className="table__column text-align-right">Stats</div> */}
								{/* {player.gameInfo ? (
									<div>{player.gameInfo}</div>
								) : <></>} */}
							</div>
						))}

						<div className="table__row table__row--total">
							<div className="table__column">Total</div>
							<div className="table__column"></div>
							<div className="table__column"></div>
							<div className="table__column"></div>
							<div className="table__column text-align-right">{lineup.totalSalary}</div>
							<div className="table__column text-align-right">{lineup.totalFppg}</div>
							{/* <div className="table__column text-align-right"></div> */}
						</div>
					</>
				))
			)}
		</div>
	)
}