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

const API = "https://evening-brushlands-00691.herokuapp.com";

export default function IndexPage() {
	const [lineups, setLineups] = useState<ILineup[]>([]);
	const [contests, setContests] = useState<IContest[]>();
	const [isError, setIsError] = useState();
	const [errorMessage, setErrorMessage] = useState('');
	const [inputValue, setInputValue] = useState('');

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

				console.log('finished loading...');
			} catch (e) {
				console.error(`A problem occured when trying to retrieve API: ${e}`);
			}
		})()
	}, [lineups])

	// Request from API once contest is chosen
	const onContestChange = async (draftSelection: IContest, OPTIMIZE = 'optimize') => {
		setInputValue(draftSelection.name);

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
					<div className="col">
						<Downshift
							onChange={selection => onContestChange(selection)}	
							itemToString={item => (item ? item.name : '')}>
							{({
								getToggleButtonProps,
								getMenuProps,
								getInputProps,
								getItemProps,
								inputValue,
								isOpen,
								highlightedIndex,
							}) => (
								<div className="input-dropdown">
									<label className="form__label u-hidden" htmlFor="select-contest">Search contest by ID or name</label>
									<input className="input-dropdown__input" {...getInputProps({
										placeholder: "Search contest by ID or name"
									})} />
									<button className="input-dropdown__button" {...getToggleButtonProps()}>down</button>
									{isOpen              
										? (
											<ul className="input-dropdown__list" {...getMenuProps()}>
												{contests
												.filter((contest) => !inputValue || contest.name.toLowerCase().includes(inputValue.toLowerCase()))
												.map((item, index) => (
													<li className="input-dropdown__item"
														{...getItemProps({
															key: index,
															index,
															item,
														})}
														>
														{item.draft_group_id} - {item.name}
													</li>
												))}
										</ul>)
									: null}
								</div>
							)}
						</Downshift>
						{isError && errorMessage ? (
							<p role="alert">{errorMessage}</p>
						) : ''}
					</div>
					{/* <div className="col col-4">
						<button className="button">Optimize</button>
					</div> */}
				</div>
			</form>
			{!isError ? (
				<Table data={lineups} />
			) : ''}
		</Main>
	)
}
