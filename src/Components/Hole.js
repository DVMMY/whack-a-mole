import React from "react";

export const Hole = props => {
  let holeClasses = props.index === props.selectedHole ? "hole up" : "hole";
  return (
    <div className={holeClasses}>
      <div className='mole' onClick={e => props.bonk(e)}></div>
    </div>
  );
};
