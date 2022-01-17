import * as React from 'react';
import SquareColorButton from "../button/SquareColorButton";
import useMediaQuery from "@mui/material/useMediaQuery";

const listDivStyle = (smallMatches) => {
    return {
        marginLeft: smallMatches ? '0' : '2.5%',
        justifyContent: smallMatches ? 'center' : '',
        display: 'flex',
        columnGap: "6px"
    }
};

function ColorButtonGrid ({colors, checkValue, type}) {
    const smallMatches = useMediaQuery('(max-width:480px)');
    const listItems = colors.map((color) => <SquareColorButton color={color}
                                                               key={color}
                                                               checkValue={checkValue}
                                                               type={type}/>);
    return <div style={listDivStyle(smallMatches)}>{listItems}</div>;
}

export default ColorButtonGrid;
