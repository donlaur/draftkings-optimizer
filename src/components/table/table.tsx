import React, { useEffect } from 'react';
import { IResponse, ILineup } from '../interfaces/IApp';
import { IDraftKingsResponse } from '../interfaces/IDraftKingsResponse';

interface ITableProps {
	optimizedLineups: IResponse,
	players: IDraftKingsResponse[],
	setPlayers: React.Dispatch<React.SetStateAction<IDraftKingsResponse[]>>
}

export function Table( { optimizedLineups, players, setPlayers}: ITableProps) {
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget instanceof HTMLInputElement) {
			const value = parseInt(e.currentTarget.value);

			const player = players.find((player) => player.playerId === value);

			player.isLocked = !player.isLocked;
			
			setPlayers([...players]);
		}
	}

	return (
		<div className="table-wrapper">
			<table className="table">
				<thead>
					<tr className="table__row table__row--header">
						{/* <div>ID</div> */}
						<th className="table__cell table__cell--lock"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g data-name="Layer 2"><g data-name="lock"><rect width="24" height="24" opacity="0"/><path d="M17 8h-1V6.11a4 4 0 1 0-8 0V8H7a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3zm-7-1.89A2.06 2.06 0 0 1 12 4a2.06 2.06 0 0 1 2 2.11V8h-4zM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1z"/><path d="M12 12a3 3 0 1 0 3 3 3 3 0 0 0-3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"/></g></g></svg></th>
						{/* <th className="table__cell"></th> */}
						<th className="table__cell table__cell--first-name">First name</th>
						<th className="table__cell table__cell--last-name">Last name</th>
						<th className="table__cell">Positions</th>
						<th className="table__cell">Team</th>
						<th className="table__cell text-align-right">Salary</th>
						<th className="table__cell text-align-right">FPPG</th>
						{/* <div className="table__cell text-align-right"></div> */}
						{/* {data.some((lineup) => lineup.players.some((player) => player.gameInfo)) ? (
							<div>Game info</div>
						) : <></>} */}
					</tr>
				</thead>
					{players && !optimizedLineups ? (
						<tbody>
							{players.map((player, i) => (
								<tr className={`table__row ${player.status !== 'None' ? `table__row--${player.status}` : ''}`} key={i}>
									<td className="table__cell table__cell--lock">
										{player.status !== 'O' ? (
											<input className="checkbox" type="checkbox" onChange={onChange} value={player.playerId}/>
											): <></>}
									</td>
									{/* <td className="table__cell">{player.status !== 'None' ? player.status : ''}</td> */}
									<td className="table__cell">{player.firstName}</td>
									<td className="table__cell">{player.lastName}</td>
									<td className="table__cell">{player.position}</td>
									<td className="table__cell">{player.teamAbbreviation}</td>
									<td className="table__cell text-align-right">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(player.salary)}</td>
									<td className="table__cell text-align-right">{player.draftStatAttributes[0].value}</td>
									{/* <div className="table__cell text-align-right">Stats</div> */}
									{/* {player.gameInfo ? (
										<div>{player.gameInfo}</div>
									) : <></>} */}
								</tr>
							))}
						</tbody>
					) : <></>}

					{optimizedLineups ? optimizedLineups.lineups.map((lineup, i) => (
						<React.Fragment key={i}>
							<tbody key={i}>
								{lineup.players.map((player, i) => {
									const _player = players.find((p) => p.playerId === parseInt(player.id));

									// console.log(_player)
									
									return (
										<tr className={`table__row ${_player.status !== 'None' ? `table__row--${_player.status}` : ''}`} key={i}>
											{/* <div>{player.id}</div> */}
											<td className="table__cell table__cell--lock">
												<input className="checkbox" type="checkbox" onChange={onChange} value={_player.playerId} checked={_player.isLocked}/>
											</td>
											<td className="table__cell">{_player.firstName}</td>
											<td className="table__cell">{_player.lastName}</td>
											<td className="table__cell">{_player.position}</td>
											<td className="table__cell">{_player.teamAbbreviation}</td>
											<td className="table__cell text-align-right">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(player.salary)}</td>
											<td className="table__cell text-align-right">{_player.draftStatAttributes[0].value}</td>
											{/* <div className="table__cell text-align-right">Stats</div> */}
											{/* {player.gameInfo ? (
												<div>{player.gameInfo}</div>
											) : <></>} */}
										</tr>
									)
								})}
							</tbody>
							<tfoot>
								<tr className="table__row table__row--total">
									<td className="table__cell" colSpan={5}>Total</td>
									<td className="table__cell text-align-right">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(lineup.totalSalary)}</td>
									<td className="table__cell text-align-right">{lineup.totalFppg}</td>
								</tr>
							</tfoot>
						</React.Fragment>
					)) : <></>}
			</table>
		</div>
	)
}