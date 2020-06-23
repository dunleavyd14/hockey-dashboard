import React, {useState, useEffect} from "react";
import TeamPanel from "./TeamPanel";
import TeamNames from "../static/shortened-names";
import LogoURLs from "../static/logos";
import GameOverview from "./GameOverview";


function Game ({game}) {

	const [tab, updateTab] = useState("main");
	const [styles, updateStyles] = useState({});	

	const tabClasses = (name) => {
		if (name === tab) {
			return "game-nav-active game-nav-" + name;
		} else {
			return "game-nav-" + name;
		}
	}

	const screenStyles = (name) => {
		if (name === tab) {
			return {display: "block"};
		} else {
			return {display: "none"};
		}
	}

	if (!game) {
		//console.log("game is null")
		return (null);
	} else {
		//console.log("game is not null", game);

		const homeAbbr = game.gameData.teams.home.teamName;
		const awayAbbr = game.gameData.teamds.away.teamName;
		return (
			<div className="game">
				<div className="game-nav">
					<div className={tabClasses("main")} onClick={() => updateTab("main")}></div>
					<div className={tabClasses("home")} onClick={() => updateTab("home")}>{homeAbbr}</div>
					<div className={tabClasses("away")} onClick={() => updateTab("away")}>{awayAbbr}</div>
				</div>
				<GameOverview game={game} active={tab==="main"}/>
				<TeamPanel team={game.liveData.boxscore.teams.home} active={tab==="home"} />
				<TeamPanel team={game.liveData.boxscore.teams.away} active={tab==="away"} />

			</div>
		);
	}



}


export default Game;