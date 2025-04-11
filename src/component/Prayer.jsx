import React from "react";

function Prayer({name,time}){
return(
        <div className="prayer">
            <p className= "name-prayer">{name}</p>
            <p className="time">{time}</p>
        </div>
);
}
export default Prayer