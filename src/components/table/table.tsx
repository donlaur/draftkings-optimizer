import React from 'react';
import { IResponse, ILineup } from '../interfaces/IApp';
import { IDraftKingsResponse } from '../interfaces/IDraftKingsResponse';

interface ITableProps {
	data: IResponse | IDraftKingsResponse[]
}

export function Table( { data }: ITableProps) {
	return (
		<table className="table table--align-left">
			<tbody>
				<tr>
					{/* <th>ID</th> */}
					<th>Positions</th>
					<th>First name</th>
					<th>Last name</th>
					<th>Team</th>
					<th>Salary</th>
					<th>FPPG</th>
					{/* {data.some((lineup) => lineup.players.some((player) => player.gameInfo)) ? (
						<th>Game info</th>
					) : <></>} */}
				</tr>

				{data.length !== undefined ? (
					data.map((player: IDraftKingsResponse, i) => (
						<tr key={i}>
							{/* <td>{player.id}</td> */}
							<td>{player.position}</td>
							<td>{player.firstName}</td>
							<td>{player.lastName}</td>
							<td>{player.teamAbbreviation}</td>
							<td>{player.salary}</td>
							<td>{player.draftStatAttributes[0].value}</td>
							{/* {player.gameInfo ? (
								<td>{player.gameInfo}</td>
							) : <></>} */}
						</tr>
					))
				) : (
					data.lineups.map((lineup: ILineup, i) => (
						<>
							{lineup.players.map((player) => (
								<tr key={player.id}>
									{/* <td>{player.id}</td> */}
									<td>{player.positions}</td>
									<td>{player.firstName}</td>
									<td>{player.lastName}</td>
									<td>{player.team}</td>
									<td>{player.salary}</td>
									<td>{player.fppg}</td>
									{/* {player.gameInfo ? (
										<td>{player.gameInfo}</td>
									) : <></>} */}
								</tr>
							))}
	
							<tr>
								<td colSpan={4}>Total</td>
								<td>{lineup.totalSalary}</td>
								<td>{lineup.totalFppg}</td>
							</tr>
						</>
					))
				)}
				</tbody>
			</table>
	)
}