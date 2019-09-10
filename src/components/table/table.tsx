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

                    {data.map((lineup, i) => (
                        <>
                            {lineup.players.map((player) => (
                                <tr key={player.id}>
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
                            ))}
                            <tr key={i}>
                                <td><b>Total</b></td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>{lineup.totalSalary}</td>
                                <td>{lineup.totalFppg}</td>
                            </tr>
                        </>
                    ))}

                </tbody>
            </table>
        ) : <></>
    )
}