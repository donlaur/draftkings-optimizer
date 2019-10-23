import React, { useEffect } from 'react';
import { IResponse, ILineup } from '../interfaces/IApp';
import { IDraftKingsResponse, IDraftKingsPlayer } from '../interfaces/IDraftKingsResponse';

interface ITableProps {
	optimizedLineups: IResponse,
	isOptimized?: boolean,
	players: IDraftKingsPlayer[],
	setPlayers?: React.Dispatch<React.SetStateAction<IDraftKingsPlayer[]>>
}

export function Table( { optimizedLineups, isOptimized, players, setPlayers}: ITableProps) {
	const onLock = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget instanceof HTMLInputElement) {
			const value = parseInt(e.currentTarget.closest('.table__row').getAttribute('id'));

			const player = players.find((player) => player.id === value);

			player.isLocked = !player.isLocked;
			
			setPlayers([...players]);
		}
	}

	const onExclude = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (e.currentTarget instanceof HTMLButtonElement) {
			const value = parseInt(e.currentTarget.closest('.table__row').getAttribute('id'));

			const player = players.find((player) => player.id === value);
			
			player.isExcluded = !player.isExcluded;
			
			setPlayers([...players]);
		}
	}

	return (
		<div className="table-wrapper">
			<table className="table">
				<thead>
					<tr className="table__row table__row--header">
						<th className="table__cell table__cell--exclude"></th>
						<th className="table__cell table__cell--lock"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g data-name="Layer 2"><g data-name="lock"><rect width="24" height="24" opacity="0"/><path d="M17 8h-1V6.11a4 4 0 1 0-8 0V8H7a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3zm-7-1.89A2.06 2.06 0 0 1 12 4a2.06 2.06 0 0 1 2 2.11V8h-4zM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1z"/><path d="M12 12a3 3 0 1 0 3 3 3 3 0 0 0-3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"/></g></g></svg></th>
						<th className="table__cell">First name</th>
						<th className="table__cell">Last name</th>
						<th className="table__cell">Positions</th>
						<th className="table__cell">Team</th>
						<th className="table__cell text-align-right">Salary</th>
						<th className="table__cell text-align-right">FPPG</th>
					</tr>
				</thead>
					{players && !isOptimized ? (
						<tbody>
							{players.map((player) => (
								<tr className={`table__row ${player.status !== '' ? `table__row--${player.status}` : player.isExcluded ? 'table__row--excluded' : ''}`} key={player.id} id={`${player.id}`}>
									<td className="table__cell table__cell--exclude">
										{player.status !== 'O' ? (
											<button onClick={onExclude}>
												{player.isExcluded ? (
														<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g data-name="Layer 2"><g data-name="plus"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"/></g></g></svg>
													) : (
														<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g data-name="Layer 2"><g data-name="close"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/></g></g></svg>
												)}
												Exclude player
											</button>
										) : <></>}
									</td>
									<td className="table__cell table__cell--lock">
										{player.status !== 'O' ? (
											<input className="checkbox" type="checkbox" onChange={onLock} checked={player.isLocked}/>
											): <></>}
									</td>
									<td className="table__cell">{player.first_name}</td>
									<td className="table__cell">{player.last_name}</td>
									<td className="table__cell">{player.position.name}</td>
									<td className="table__cell">{player.team_id}</td>
									<td className="table__cell text-align-right">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(player.draft.salary)}</td>
									<td className="table__cell text-align-right">{player.points_per_contest}</td>
								</tr>
							))}
						</tbody>
					) : <></>}

					{isOptimized && optimizedLineups && players ? optimizedLineups.lineups.map((lineup, i) => (
						<React.Fragment key={i}>
							<tbody key={i}>
								{lineup.players.map((player, i) => {
									const _player = players.find((p) => p.id === parseInt(player.id));

									return (
										<tr className={`table__row ${_player.status && _player.status !== 'None' ? `table__row--${_player.status}` : _player.isExcluded ? 'table__row--excluded' : ''}`} key={_player.id} id={`${_player.id}`}>
											<td className="table__cell table__cell--exclude">
												{player.status !== 'O' ? (
													<button onClick={onExclude}>
														{_player.isExcluded ? (
																<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g data-name="Layer 2"><g data-name="plus"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"/></g></g></svg>
															) : (
																<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g data-name="Layer 2"><g data-name="close"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/></g></g></svg>
														)}
														Exclude player
													</button>
												) : <></>}
											</td>
											<td className="table__cell table__cell--lock">
												<input className="checkbox" type="checkbox" onChange={onLock} value={_player.id} checked={_player.isLocked}/>
											</td>
											<td className="table__cell">{_player.first_name}</td>
											<td className="table__cell">{_player.last_name}</td>
											<td className="table__cell">{_player.position.name}</td>
											<td className="table__cell">{_player.team_id}</td>
											<td className="table__cell text-align-right">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(_player.draft.salary)}</td>
											<td className="table__cell text-align-right">{_player.points_per_contest}</td>
										</tr>
									)
								})}
							</tbody>
							<tfoot>
								<tr className="table__row table__row--total">
									<td className="table__cell" colSpan={6}>Total</td>
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