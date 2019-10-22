import React, { useState, useEffect } from 'react';
import Downshift from 'downshift';
import uniqBy from 'lodash.uniqby';

import { get, post } from '../scripts/utilities/fetch';
import { IContest, IGroup, IResponse } from '../components/interfaces/IApp';

import { Main } from '../layouts/main';
import { Table } from '../components/table/table';
import { IDraftKingsResponse, IDraftKingsPlayer } from '../components/interfaces/IDraftKingsResponse';
import { transformPlayers } from '../scripts/utilities/transformPlayers';

interface IContestResponse {
	contests: IContest[],
	groups: IGroup[]
}

// const API = "https://evening-brushlands-00691.herokuapp.com";
const API = "http://127.0.0.1:5000";

export default function IndexPage() {
	const [draftGroupId, setDraftGroupId] = useState();

	const [contests, setContests] = useState<IContest[]>();
	const [isLoadingContests, setLoadingContests] = useState(true);

	const [players, setPlayers] = useState<IDraftKingsPlayer[]>(null);
	const [lockedPlayers, setLockedPlayers] = useState<number[]>([]);
	const [excludedPlayers, setExcludedPlayers] = useState<number[]>([]);

	const [optimizedLineups, setOptimizedLineups] = useState<IResponse>(null);
	const [isOptimized, setIsOptimized] = useState<boolean>(false);

	const [isError, setIsError] = useState();
	const [errorMessage, setErrorMessage] = useState('');


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
		if (!draftGroupId) {
			return;
		}

		(async () => {
			try {
				const response = await get(`${API}/players?id=${draftGroupId}`);
				const data = await response.json() as IDraftKingsResponse;
	
				if (data.players.length > 0) {
					setPlayers(transformPlayers(data.players));
				} else {
					setErrorMessage('No players found');
					setIsError(true);
				}
			} catch (e) {
				console.error(`A problem occured when trying to retrieve API: ${e}`);
			}
		})()
	}, [draftGroupId]);


	// Set locked/unlocked players
	useEffect(() => {
		if (!players) {
			return;
		}

		const locked = players.filter((player) => player.isLocked).map((player) => player.id);

		setLockedPlayers(locked);
	}, [players]);


	// Set excluded players
	useEffect(() => {
		if (!players) {
			return;
		}

		const locked = players.filter((player) => player.isExcluded).map((player) => player.id);

		setExcludedPlayers(locked);
	}, [players]);


	useEffect(() => {
		history.pushState({
			isOptimized
		}, null);

		window.addEventListener('popstate', (e: PopStateEvent) => {
			if (e.state) {
				setIsOptimized(e.state.isOptimized);
			}
		});
	}, []);


	//
	const onContestChange = (draftSelection: IContest) => {
		if (!draftSelection) {
			return;	
		}

		// Clear optimized lineups
		setOptimizedLineups(null);
		setIsOptimized(false);

		setDraftGroupId(draftSelection.draft_group_id);
	}


	// Request from API once contest is chosen
	const optimizeLineups = async (e: React.FormEvent<HTMLFormElement>, OPTIMIZE = "optimize") => {
		e.preventDefault();

		if (!draftGroupId) {
			return;
		}
		
		const URL = `${API}/${OPTIMIZE}`;

		const BODY = {
			locked: lockedPlayers.length > 0 ? lockedPlayers : null,
			excluded: excludedPlayers.length > 0 ? excludedPlayers : null
		}

		try {
            const response = await post(URL, BODY);
			const data = await response.json() as IResponse;

			if (data.success) {
				setOptimizedLineups(data);
				setIsError(data.success);
				setIsOptimized(true);

				history.pushState({
					isOptimized: !isOptimized
				}, null);
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
			<form className="form" onSubmit={optimizeLineups}>
				<div className="form__row row">
					<div className="form__col form__col--inline col">
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
												setDraftGroupId(null);
												setIsError(false);
												setErrorMessage('');
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
						<button className="button" type="submit">Optimize</button>
					</div>
				</div>
				{isError && errorMessage ? (
					<div className="form__row row">
						<div className="form__col col">
							<p role="alert">{errorMessage}</p>
						</div>
					</div>
				) : ''}
			</form>

			<Table players={players} isOptimized={isOptimized} optimizedLineups={optimizedLineups} setPlayers={setPlayers}/>
		</Main>
	)
}
