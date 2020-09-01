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

//const [data] = React.useState(allData.slice(0, perPage));

const MyContext = React.createContext();

function MyProvider({ children }) {
	const [state, dispatch] = React.useReducer(reducer, {
		loading: false,
		more: true,
		data: [],
		after: 0
	});

	const { loading, data, after, more } = state;

	const load = () => {
		dispatch({ type: 'start' });

		setTimeout(() => {
			const newData = allData.slice(after, after + perPage);
			dispatch({ type: 'loaded', newData });
		}, 300);
	};
	return (
		<MyContext.Provider value={{ loading, data, more, load }}>
			{children}
		</MyContext.Provider>
	);
}

function App() {
	return (
		<div className="App">
			<MapOut />
		</div>
	);
}

function MapOut() {
	const { data, loading, more } = React.useContext(MyContext);

	return (
		<ul>
			{data.map(row => (
				<li key={row} style={{ background: 'orange' }}>
					{row}
				</li>
			))}
			{loading && <li>Loading...</li>}
			{!loading && more && <LoadMore />}
		</ul>
	);
}

function LoadMore() {
	const { load } = React.useContext(MyContext);

	return (
		<li style={{ background: 'green' }}>
			<button onClick={load}>Load More</button>
		</li>
	);
}

export default () => {
	return (
		<MyProvider>
			<App />
		</MyProvider>
	);
};
