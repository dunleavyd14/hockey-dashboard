import React from "react";
import "../css/Linescore.css"


function Linescore ({game}) {
	const isOvertime = game.liveData.linescore.periods.length > 3;
	const isShootout = false;

	const homeTriCode = game.gameData.teams.home.triCode;
	const awayTriCode = game.gameData.teams.away.triCode;

	const homeGoals = Array(4).fill("-");
	const awayGoals = Array(4).fill("-");

	let homeTotal = 0;
	let awayTotal = 0;

	for (const [i, period] of game.liveData.linescore.periods.entries()) {
		homeGoals[i] = period.home.goals;
		homeTotal += period.home.goals;
		awayGoals[i] = period.away.goals;
		awayTotal += period.away.goals;
	}

	console.log(homeGoals, awayGoals);

	return (
		<div className={isOvertime ? "linescore-ot" : "linescore"}>

			<div className="label-teams">Teams</div>
			<div className="label-p1">1</div>
			<div className="label-p2">2</div>
			<div className="label-p3">3</div>
			<div className="label-t">T</div>

			<div className="home-tri">{homeTriCode}</div>
			
			<div className="home-p1">{homeGoals[0]}</div>
			
			<div className="home-p2">{homeGoals[1]}</div>
			
			<div className="home-p3">{homeGoals[2]}</div>
			
			<div className="home-t">{homeTotal}</div>
			<div className="away-tri">{awayTriCode}</div>
			<div className="away-p1">{awayGoals[0]}</div>
			<div className="away-p2">{awayGoals[1]}</div>
			<div className="away-p3">{awayGoals[2]}</div>
			<div className="away-t">{awayTotal}</div>


		</div>
	)
}

export default Linescore;