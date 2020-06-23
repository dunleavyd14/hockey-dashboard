import React, { createContext, useReducer, useEffect } from 'react';

export const TeamsContext = createContext();

export const TeamsProvider = props =>  {
	const teamReducer = (state, action) =>  {
		switch (action.type) {
			case 'removeTeam':
				console.log(state, action);
				return state.filter(team => team != action.team);
			case 'addTeam':
				console.log(state, action);
				if (state.includes(action.team)) {
					return state;
				} else {
					return [...state, action.team]
				}

			default:
				throw new Error();
		}
	}

	const initTeams = (res) => {
		try {
			const obj = JSON.parse(res)
			console.log(obj)
			if (Array.isArray(obj)) {
				return obj;
			} else {
				return [];
			}
		} catch (err) {
			return [];
		}



	}



	const [state, dispatch] = useReducer(teamReducer, localStorage.getItem("fav-teams"), initTeams);

	useEffect(() => localStorage.setItem("fav-teams", JSON.stringify(state)), [state]);

	return (
		<TeamsContext.Provider value={[state, dispatch]}>
			{props.children}
		</TeamsContext.Provider>
		);
}







