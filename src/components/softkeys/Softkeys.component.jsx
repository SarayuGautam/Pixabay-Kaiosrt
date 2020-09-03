import React, { useContext } from "react";
import { SoftkeysContext } from "../../providers/softkeys/Softkeys.provider";
import "./Softkeys.styles.scss";

const Softkeys = () => {
  const {
    softkState: { left, center, right }
  } = useContext(SoftkeysContext);
  return (
    <div className="Softkeys">
      <p id="s-left">{left}</p>
      <p id="s-center">{center}</p>
      <p id="s-right">{right}</p>
    </div>
  );
};

export default Softkeys;
