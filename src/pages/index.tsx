import React, { useState, useEffect } from 'react';

import { get } from '../scripts/utilities/fetch';
import { IContest, IGroup, ILineup, IResponse } from '../components/interfaces/IApp';

import { Main } from '../layouts/main';
import { Table } from '../components/table/table';

interface IContestResponse {
	contests: IContest[],
	groups: IGroup[]
}

const API = "http://127.0.0.1:5000";

export default function IndexPage() {
	const [lineups, setLineups] = useState<ILineup[]>([]);
	const [contests, setContests] = useState<IContestResponse>();
	const [isError, setIsError] = useState();
	const [errorMessage, setErrorMessage] = useState();


	useEffect(() => {
		console.log(lineups);

		(async () => {
			try {
				const response = await get(API);
				const data = await response.json();

				setContests(data);
			} catch (e) {
				console.error(`A problem occured when trying to retrieve API: ${e}`);
			}
		})()
	}, [lineups])

	// Request from API once contest is chosen
	const onContestChange = async (e: React.ChangeEvent<HTMLSelectElement>, OPTIMIZE = 'optimize') => {
		const draftId = e.currentTarget.value;
	
		try {
            const response = await get(`${API}/${OPTIMIZE}?id=${draftId}`);
			const data = await response.json() as IResponse;

			if (data.success) {
				setLineups(data.lineups);
				setIsError(!data.success);
			} else {
				setIsError(!data.success);
				setErrorMessage(data.message);
			}
		} catch (e) {
			console.error(`A problem occured when trying to retrieve API: ${e}`);
		}
	}

	return (
		<Main>
			<form className="form form-horizontal">
				<div className="form-group form-group--baseline form-inline">
					<label className="form-group__label form-inline" htmlFor="select-contest">Choose a game</label>
					<select className="form-select form-inline" defaultValue='' onChange={onContestChange} id="select-contest">
						<option disabled value="">-</option>
						{contests ? contests.contests.map((contest, i) => (
							<option value={contest.draft_group_id} key={i}>{contest.draft_group_id} - {contest.name}</option>
						)): ''}
					</select>
					{isError && errorMessage ? (
						<p role="alert">{errorMessage}</p>
					) : ''}
				</div>
			</form>
			{!isError ? (
				<Table data={lineups} />
			) : ''}
		</Main>
	)
}
