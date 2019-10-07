import React, { useState, useEffect, useRef } from 'react';
import Downshift from 'downshift';
import uniqBy from 'lodash.uniqby';

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
	const [contests, setContests] = useState<IContest[]>();
	const [isError, setIsError] = useState();
	const [errorMessage, setErrorMessage] = useState();

	useEffect(() => {
		(async () => {
			try {
				const response = await get(API);
				const data = await response.json() as IContestResponse;

				const filteredData = data.contests
					.map((contest) => ({ 
						draft_group_id: contest.draft_group_id,
						name: contest.name
					}))

				setContests(uniqBy(filteredData, (contest => contest.name)));
			} catch (e) {
				console.error(`A problem occured when trying to retrieve API: ${e}`);
			}
		})()
	}, [lineups])

	// Request from API once contest is chosen
	const onContestChange = async (draftSelection, OPTIMIZE = 'optimize') => {
		try {
            const response = await get(`${API}/${OPTIMIZE}?id=${draftSelection.draft_group_id}`);
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
			<form className="form">
				<div className="form__row row">
					<div className="col col-8">
						<Downshift
							onChange={selection => onContestChange(selection)}	
							itemToString={item => (item ? item.value : '')}>
							{({
								getToggleButtonProps,
								getMenuProps,
								getInputProps,
								getItemProps,
								inputValue,
								isOpen,
								highlightedIndex,
								selectedItem,
							}) => (
								<div className="input-dropdown">
									<label className="form__label u-hidden" htmlFor="select-contest">Search a contest by ID or name</label>
									<input className="input-dropdown__input" {...getInputProps({
										placeholder: "Search contest by ID or name"
									})} />
									<button className="input-dropdown__button" {...getToggleButtonProps()}>down</button>
									<ul className="input-dropdown__list" {...getMenuProps()}>
										{isOpen
										? contests
											.filter((contest) => contest.name.toLowerCase().includes(inputValue.toLowerCase()))
											.map((item, index) => (
												<li className="input-dropdown__item"
													{...getItemProps({
														key: index,
														index,
														item
													})}
													>
													{item.draft_group_id} - {item.name}
												</li>
											))
										: null}
									</ul>
								</div>
							)}
						</Downshift>
						{isError && errorMessage ? (
							<p role="alert">{errorMessage}</p>
						) : ''}
					</div>
					<div className="col col-4">
						<button className="button">Optimize</button>
					</div>
				</div>
			</form>
			{!isError ? (
				<Table data={lineups} />
			) : ''}
		</Main>
	)
}
