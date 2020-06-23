import React from "react";
import TeamNames from "../static/shortened-names";
import LogoURLs from "../static/logos";
import "../css/GameOverview.css";
import Linescore from "./Linescore"

function GameOverview ({game, active}) {
	const homeName = game.gameData.teams.home.name;
	const awayName = game.gameData.teams.away.name;
	const homeTriCode = game.gameData.teams.home.triCode
	const awayTriCode = game.gameData.teams.away.triCode
	const homeSVG = LogoURLs[homeTriCode];
	const awaySVG = LogoURLs[awayTriCode];
	const period = game.liveData.linescore.currentPeriod;
	const periodOrdinal = period === 0 ? "" : game.liveData.linescore.currentPeriodOrdinal;
	const timeRemaining = period === 0 ? "tr" : game.liveData.linescore.currentPeriodTimeRemaining;
	const homeAbbr = game.gameData.teams.home.triCode;
	const awayAbbr = game.gameData.teams.away.triCode;
	const homeScore = game.liveData.linescore.teams.home.goals;
	const awayScore = game.liveData.linescore.teams.away.goals;
	
	console.log(game, period, timeRemaining);
	if (active) {
		return (
			<div className="game-overview">

				<div className="score">
					<div className="period">
						{period === 0 ? "Not started" : period + " - " + timeRemaining}
					</div>

					<img className="logo logo-h" src={homeSVG} alt={homeAbbr}/>
					{homeScore} - {awayScore}
					<img className="logo logo-a" src={awaySVG} alt={awayAbbr}/>

					<Linescore game={game}/>
				</div>
				{Date.now()}
			</div>

		)		
	} else {
		return null;
	}
}

export default GameOverview;