import React, {useContext} from "react";
import { TeamsContext } from "../context/TeamsContext";
function AddTeam ({name}) {
	const dispatch = useContext(TeamsContext);

	return (<button onClick={() => dispatch({type: "addTeam", team: name})}>{name} </button>)
}

export default AddTeam;