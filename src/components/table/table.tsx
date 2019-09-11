import React from 'react';
import { ILineup } from '../interfaces/IApp';

interface ITableProps {
    data: ILineup[]
}

export function Table( { data }: ITableProps) {
    return (
        data.length ? (
            <table className="table table-striped table-hover">
                <tbody className="container grid-lg">
                    <tr>
                        <th>ID</th>
                        <th>Positions</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Team</th>
                        <th>Salary</th>
                        <th>FPPG</th>
                        {data.some((lineup) => lineup.players.some((player) => player.gameInfo)) ? (
                            <th>Game info</th>
                        ) : <></>}
                    </tr>

                    {data.map((lineup, ) => (
                        lineup.players.map((player, i) => (
                            <tr key={i}>
                                <td>{player.id}</td>
                                <td>{player.positions}</td>
                                <td>{player.firstName}</td>
                                <td>{player.lastName}</td>
                                <td>{player.team}</td>
                                <td>{player.salary}</td>
                                <td>{player.fppg}</td>
                                {player.gameInfo ? (
                                    <td>{player.gameInfo}</td>
                                ) : <></>}
                            </tr>
                        ))
                    ))}

                </tbody>
            </table>
        ) : <></>
    )
}