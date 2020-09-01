import React from 'react';
import './App.css';

const allData = new Array(25).fill(0).map((_val, i) => i + 1);
const perPage = 10;

const reducer = (state, action) => {
	switch (action.type) {
		case 'start':
			return { ...state, loading: true };
		case 'loaded':
			return {
				...state,
				loading: false,
				data: [...state.data, ...action.newData],
				more: action.newData.length === perPage,
				after: state.after + action.newData.length
			};
		default:
			throw new Error('error!');
	}
};

function App() {
	// loading
	// more
	// after
	// data
	//const [data] = React.useState(allData.slice(0, perPage));

	const [state, dispatch] = React.useReducer(reducer, {
		loading: false,
		more: true,
		data: [],
		after: 0
	});

	const { loading, data, after, more } = state;

	return (
		<div className="App">
			<ul>
				{data.map(row => (
					<li key={row} style={{ background: 'orange' }}>
						{row}
					</li>
				))}
				{loading && more && <li>Loading...</li>}
				{!loading && (
					<li style={{ background: 'green' }}>
						<button
							onClick={() => {
								dispatch({ type: 'start' });

								setTimeout(() => {
									const newData = allData.slice(
										after,
										after + perPage
									);
									dispatch({ type: 'loaded', newData });
								}, 500);
							}}
						>
							Load More
						</button>
					</li>
				)}
			</ul>
		</div>
	);
}

export default App;
