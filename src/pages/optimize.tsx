import React from 'react';
import Downshift from 'downshift';

import { Main } from '../layouts/main';
import { Table } from '../components/table/table';

interface ILocation {
	location: {
		state: {
			players,
			contests,
			optimizedLineups
		}
	}
}

export default function OptimizePage({ location }: ILocation ) {
	console.log(location)

	return (
		<Main>
			<Table optimizedLineups={location.state.optimizedLineups} isOptimized={true} players={location.state.players}/>
		</Main>
	)
}
