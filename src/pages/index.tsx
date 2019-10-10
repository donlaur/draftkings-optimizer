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
	const [isLoadingContests, setLoadingContests] = useState(true);

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

			setLoadingContests(false);
		})()
	}, [lineups])

	// Request from API once contest is chosen
	const onContestChange = async (draftSelection: IContest, OPTIMIZE = 'optimize') => {
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
								<div className={`input-dropdown ${isLoadingContests ? 'input-dropdown--disabled' : ''}`}>
									<label className="form__label u-hidden" htmlFor="select-contest">Search contest by ID or name</label>
									<input className="input-dropdown__input" {...getInputProps({
										placeholder: isLoadingContests ? "Grabbing contests..." : "Search contest by ID or name",
										disabled: isLoadingContests
									})} />
									<button className="input-dropdown__button" {...getToggleButtonProps({
										disabled: isLoadingContests
									})}>
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g data-name="Layer 2"><g data-name="chevron-down"><rect width="24" height="24" opacity="0"/><path d="M12 15.5a1 1 0 0 1-.71-.29l-4-4a1 1 0 1 1 1.42-1.42L12 13.1l3.3-3.18a1 1 0 1 1 1.38 1.44l-4 3.86a1 1 0 0 1-.68.28z"/></g></g></svg>
										Down
									</button>
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
