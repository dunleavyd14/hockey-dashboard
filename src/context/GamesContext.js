import React, { createContext, useState, useEffect, useReducer } from 'react';

export const GamesContext = createContext();

const gamesReducer = (state, action) => {
	switch (action.type) {
		case "add-game":
			return {...state, [action.game.gamePk] : action.game};
	}
}

export function GamesProvider (props) {
	const [games, gamesDispatch] = useReducer(gamesReducer, {});
	const [refresh, setRefresh] = useState(0);



	useEffect( () => {

		async function fetchGameById (id) {
			const response = await fetch(`https://statsapi.web.nhl.com/api/v1/game/${id}/feed/live`);
			const data = await response.json();

			gamesDispatch({type: "add-game", game: data});
		}


		async function getSchedule() {
			const response = await fetch("https://statsapi.web.nhl.com/api/v1/schedule");
			const data = await response.json();
			const todaysGames = data.dates[0].games; //list of todays games

			for (const game of todaysGames) {
				fetchGameById(game.gamePk)
			}
		}

		getSchedule();

	}, []);

	useEffect( () => {
		async function fetchGameById (id) {
			const response = await fetch(`https://statsapi.web.nhl.com/api/v1/game/${id}/feed/live`);
			const data = await response.json();
			gamesDispatch({type: "add-game", game: data});
		}
		for (const gameId of Object.keys(games)) {
			fetchGameById(gameId);
		}


	}, [refresh]);


	useEffect( () => {//refresh all games every 15 seconds
		const interval = setInterval( () => setRefresh(refs => refs + 1), 15000);
		return () => clearInterval(interval);
	}, [])

	return (
		<GamesContext.Provider value={games}>
			{props.children}
		</GamesContext.Provider>
		)
}