import React, { useState, useEffect, useCallback, useRef } from 'react';
import Downshift from 'downshift';
import uniqBy from 'lodash.uniqby';

import { get, post } from '../scripts/utilities/fetch';
import { IContest, IGroup, IResponse } from '../components/interfaces/IApp';

import { Main } from '../layouts/main';
import { Table } from '../components/table/table';
import { IDraftKingsResponse } from '../components/interfaces/IDraftKingsResponse';

interface IContestResponse {
	contests: IContest[],
	groups: IGroup[]
}

const API = "https://evening-brushlands-00691.herokuapp.com";
// const API = "http://127.0.0.1:5000";

export default function IndexPage() {
	const [draftGroupId, setDraftGroupId] = useState();
	const [players, setPlayers] = useState<IDraftKingsResponse[]>([]);
	const [data, setData] = useState<IResponse>(null);
	const [contests, setContests] = useState<IContest[]>();
	const [isError, setIsError] = useState();
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoadingContests, setLoadingContests] = useState(true);
	const [lockedPlayers, setLockedPlayers] = useState<number[]>([]);


	// Update only when isLoadingContests changes
	useEffect(() => {
		(async () => {
			try {
				const response = await get(API);
				const data = await response.json() as IContestResponse;

				setContests(uniqBy(data.contests, 'name'));
			} catch (e) {
				console.error(`A problem occured when trying to retrieve API: ${e}`);
			}

			setLoadingContests(false);
		})()
	}, [isLoadingContests])


	// Up
	useEffect(() => {
		const QUERY = 'players';

		if (!draftGroupId) {
			return;
		}

		(async () => {
			try {
				const response = await get(`${API}/${QUERY}?id=${draftGroupId}`);
				const data = await response.json();
	
				setPlayers(uniqBy(data, 'playerId'));
			} catch (e) {
				console.error(`A problem occured when trying to retrieve API: ${e}`);
			}
		})()
	}, [draftGroupId])


	//
	const onContestChange = async (draftSelection: IContest) => {
		if (!draftSelection) {
			return;	
		}

		setDraftGroupId(draftSelection.draft_group_id);
	}


	// Request from API once contest is chosen
	const optimizeLineups = async (e: React.MouseEvent<HTMLButtonElement>, OPTIMIZE = "optimize") => {
		e.preventDefault();

		if (!draftGroupId) {
			return;
		}
		
		const URL = `${API}/${OPTIMIZE}`;

		const BODY = {
			locked: lockedPlayers.length > 0 ? lockedPlayers.join() : null
		}

		try {
            const response = await post(URL, BODY);
			const data = await response.json() as IResponse;

			if (data.success) {
				setData(data);
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
								clearSelection,
								selectedItem,
								highlightedIndex,
							}) => (
								<div className={`input-dropdown ${isLoadingContests ? 'input-dropdown--disabled' : ''}`}>
									<label className="form__label u-hidden" htmlFor="select-contest">Search contest by ID or name</label>
									<input className="input-dropdown__input" {...getInputProps({
										placeholder: isLoadingContests ? "Grabbing contests..." : "Search contest by ID or name",
										disabled: isLoadingContests
									})} />
									{inputValue ? (
										<button className="input-dropdown__button" 
											onClick={() => {
												clearSelection();
												setLockedPlayers([]);
												setData(null);
											}}
											aria-label="clear selection"
											>
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g data-name="Layer 2"><g data-name="close"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/></g></g></svg>
											Clear selection
										</button>
									) : (
										<button className="input-dropdown__button" {...getToggleButtonProps({
											disabled: isLoadingContests
										})}>
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g data-name="Layer 2"><g data-name="chevron-down"><rect width="24" height="24" opacity="0"/><path d="M12 15.5a1 1 0 0 1-.71-.29l-4-4a1 1 0 1 1 1.42-1.42L12 13.1l3.3-3.18a1 1 0 1 1 1.38 1.44l-4 3.86a1 1 0 0 1-.68.28z"/></g></g></svg>
											Down
										</button>
									)}
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
					<div className="col col-4">
						<button className="button" onClick={optimizeLineups}>Optimize</button>
					</div>
				</div>
			</form>
			{!isError ? (
				<Table players={players} data={data} setLockedPlayers={setLockedPlayers} lockedPlayers={lockedPlayers}/>
			) : ''}
		</Main>
	)
}
