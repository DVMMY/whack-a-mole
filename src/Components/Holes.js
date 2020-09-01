import React from "react";
import { Hole } from "./Hole";

export const Holes = props => {
  return (
    <>
      {props.holes.map(index => {
        return <Hole {...props} key={index} index={index} />;
      })}
    </>
  );
};
