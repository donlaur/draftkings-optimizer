import React from 'react';
import { IResponse, ILineup } from '../interfaces/IApp';
import { IDraftKingsResponse } from '../interfaces/IDraftKingsResponse';

interface ITableProps {
	data: IResponse,
	players: IDraftKingsResponse[],
	lockedPlayers: number[],
	setLockedPlayers: React.Dispatch<React.SetStateAction<number[]>>
}

export function Table( { data, players, lockedPlayers, setLockedPlayers }: ITableProps) {
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget instanceof HTMLInputElement) {
			const value = parseInt(e.currentTarget.value);

			if (lockedPlayers.includes(value)) {
				const id = lockedPlayers.findIndex(player => player === value);
				lockedPlayers.splice(id)

				setLockedPlayers([...lockedPlayers]);
			} else {
				setLockedPlayers([...lockedPlayers, value])
			}
		}
	}

	return (
		<div className="table-wrapper">
			<table className="table">
				<tbody>
				<tr className="table__row table__row--header">
					{/* <div>ID</div> */}
					<th className="table__cell table__cell--lock"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g data-name="Layer 2"><g data-name="lock"><rect width="24" height="24" opacity="0"/><path d="M17 8h-1V6.11a4 4 0 1 0-8 0V8H7a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3zm-7-1.89A2.06 2.06 0 0 1 12 4a2.06 2.06 0 0 1 2 2.11V8h-4zM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1z"/><path d="M12 12a3 3 0 1 0 3 3 3 3 0 0 0-3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"/></g></g></svg></th>
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

				{players && !data ? (
					players.map((player, i) => (
						<tr className={`table__row ${player.status !== 'None' ? `table__row--${player.status}` : ''}`} key={i}>
							<td className="table__cell table__cell--lock">
								{player.status !== 'O' ? (
									<input className="checkbox" type="checkbox" onChange={onChange} value={player.playerId}/>
								): <></>}
							</td>
							<td className="table__cell table__cell--first-name">{player.firstName}</td>
							<td className="table__cell table__cell--last-name">{player.lastName}</td>
							<td className="table__cell">{player.position}</td>
							<td className="table__cell">{player.teamAbbreviation}</td>
							<td className="table__cell text-align-right">{player.salary}</td>
							<td className="table__cell text-align-right">{player.draftStatAttributes[0].value}</td>
							{/* <div className="table__cell text-align-right">Stats</div> */}
							{/* {player.gameInfo ? (
								<div>{player.gameInfo}</div>
							) : <></>} */}
						</tr>
					))
				) : <></>}

				{data ? data.lineups.map((lineup, i) => (
					<React.Fragment key={i}>
						{lineup.players.map((player, i) => (
							<tr className={`table__row ${player.status !== 'None' ? `table__row--${player.status}` : ''}`} key={i}>
								{/* <div>{player.id}</div> */}
								<td className="table__cell table__cell--lock">
									<input className="checkbox" type="checkbox" onChange={onChange} value={player.id} checked={player.isLocked} disabled={true}/>
								</td>
								<td className="table__cell table__cell--first-name">{player.firstName}</td>
								<td className="table__cell table__cell--last-name">{player.lastName}</td>
								<td className="table__cell">{player.positions}</td>
								<td className="table__cell">{player.team}</td>
								<td className="table__cell text-align-right">{player.salary}</td>
								<td className="table__cell text-align-right">{player.fppg}</td>
								{/* <div className="table__cell text-align-right">Stats</div> */}
								{/* {player.gameInfo ? (
									<div>{player.gameInfo}</div>
								) : <></>} */}
							</tr>
						))}

						<tr className="table__row table__row--total">
							<td className="table__cell" colSpan={5}>Total</td>
							<td className="table__cell text-align-right">{lineup.totalSalary}</td>
							<td className="table__cell text-align-right">{lineup.totalFppg}</td>
							{/* <div className="table__cell text-align-right"></div> */}
						</tr>
					</React.Fragment>
				)) : <></>}
				</tbody>
			</table>
		</div>
	)
}