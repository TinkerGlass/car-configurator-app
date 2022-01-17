import * as React from "react";
import ButtonGrid from "../grid/ButtonGrid";

const elementDecisionPanelStyle = {
    minWidth: "100%",
    marginTop: "14px",
    marginBottom: "14px"
};

const titleStyle = {
    fontSize: "20px",
    marginLeft: '2.5%',
    marginTop: '0',
    marginBottom: '2px',
    textAlign: "left",
};

function ElementDecisionPanel ({title, buttons, checkValue, type}) {
    return <div style={elementDecisionPanelStyle}>
        <h4 style={titleStyle}>{title}</h4>
        <ButtonGrid buttons={buttons} checkValue={checkValue} type={type}/>
    </div>
}

export default ElementDecisionPanel;
