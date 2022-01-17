import * as React from "react";
import ColorButtonGrid from "../grid/ColorButtonGrid";

const colorDecisionPanelStyle = {
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

function ColorDecisionPanel ({title, colors, checkValue, type}) {
    return <div style={colorDecisionPanelStyle}>
        <h4 style={titleStyle}>{title}</h4>
        <ColorButtonGrid colors={colors} checkValue={checkValue} type={type}/>
    </div>
}

export default ColorDecisionPanel;
