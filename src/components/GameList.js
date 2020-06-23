import React, {useContext, useEffect, useState} from "react";
import Game from "./Game";
import {GamesContext} from "../context/GamesContext";
import {TeamsContext} from "../context/TeamsContext";

function GameList (props) {

	const games = useContext(GamesContext);
	const [teams, _] = useContext(TeamsContext);
	const favGames = [];
	const otherGames = [];


	for (const [key, game] of Object.entries(games)) {
		if (!game) {
			continue;
		}
		let awayName = game.gameData.teams.away.name;
		let homeName = game.gameData.teams.home.name;
		if (teams.includes(awayName) || teams.includes(homeName)) {
			favGames.push(game);
		} else {
			otherGames.push(game);
		}
	}


	return (
		<React.Fragment>
			Favorites 
			<hr/>
			<div className="fav-teams">
				{favGames.map(game => <Game game={game} key={game.gamePk}/>)}
			</div>
			Others 
			<hr/>
			<div className="others">
				{otherGames.map(game => <Game game={game} key={game.gamePk}/>)}
			</div>
		</React.Fragment>
	);
}


export default GameList;