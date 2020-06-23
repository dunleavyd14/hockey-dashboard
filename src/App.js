import React, { useContext } from 'react';
import logo from './logo.svg';
import './css/App.css';
import {TeamsContext, TeamsProvider} from "./context/TeamsContext";
import AddTeam from "./components/AddTeam";
import GameList from "./components/GameList";
import {GamesProvider} from "./context/GamesContext";

function App () {
  return (
    <TeamsProvider>
	    <GamesProvider>
	    	<GameList/>
	    </GamesProvider>
    </TeamsProvider>
  );
}

export default App;
