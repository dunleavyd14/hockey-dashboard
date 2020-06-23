import React from "react";
import "../css/TeamPanel.css"

function TeamPanel ({team, active}) {
	let skaters = Object.keys(team.players).map(key => team.players[key]).filter(x => x.stats.skaterStats);
	let goalies = Object.keys(team.players).map(key => team.players[key]).filter(x => x.stats.goalieStats && x.stats.goalieStats.shots > 0);
	if (!active) {
		return null;
	} else {
		return (
			<div className="team-panel">
				<div className="statline statline-legend">
					<div className="statline-number">#</div>
					<div className="statline-name">Skaters</div>
					<div className="statline-s1">G</div>
					<div className="statline-s2">A</div>
					<div className="statline-s3">P</div>
					<div className="statline-s4">SOG</div>
				</div>
				{skaters.map(player => <SkaterStatline key={player.id} player={player} />)}
				<div className="statline statline-legend">
					<div className="statline-number">#</div>
					<div className="statline-name">{goalies.length === 1 ? "Goalie" : "Goalies"}</div>
					<div className="statline-s1">GA</div>
					<div className="statline-s2">SA</div>
					<div className="statline-s3">SV</div>
					<div className="statline-s4">SV%</div>
				</div>
				{goalies.map(player => <GoalieStatline key={player.id} player={player} />)}
			</div>
		)
	}
}


function SkaterStatline ({player}) {

	const number = player.jerseyNumber;
	const fullname = player.person.fullName;//TODO: make this actaully search the game object so that all names are correct
	const name = fullname.charAt(0) + ". " + fullname.split(" ").pop();	const goals = player.stats.skaterStats.goals;
	const assists = player.stats.skaterStats.assists;
	const points = goals + assists;
	const shots = player.stats.skaterStats.shots;


	return (
		<div className="statline">
			<div className="statline-number">{number}</div>
			<div className="statline-name">{name}</div>
			<div className="statline-s1">{goals}</div>
			<div className="statline-s2">{assists}</div>
			<div className="statline-s3">{points}</div>
			<div className="statline-s4">{shots}</div>
		</div>
	)
}

function GoalieStatline ({player}) {
	const number = player.jerseyNumber;
	const fullname = player.person.fullName;//TODO: make this actaully search the game object so that all names are correct
	const name = fullname.charAt(0) + ". " + fullname.split(" ").pop();
	const sa = player.stats.goalieStats.shots
	const sv = player.stats.goalieStats.saves * 1.0
	const ga = sa - sv;
	const svp = sa === 0 ? 1 : sv/sa;

	return (
		<div className="statline">
			<div className="statline-number">{number}</div>
			<div className="statline-name">{name}</div>
			<div className="statline-s1">{ga}</div>
			<div className="statline-s2">{sa}</div>
			<div className="statline-s3">{sv}</div>
			<div className="statline-s4">{svp.toFixed(3)}</div>
		</div>
	)	
}

export default TeamPanel;