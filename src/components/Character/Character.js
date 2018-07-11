import React from "react";
import './Character.css'

const Character = props => (
    <div>
        <img src={props.image} id={props.id} onClick={props.onClick}/>
    </div>
);

export default Character;
