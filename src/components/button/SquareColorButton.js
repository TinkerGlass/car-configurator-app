import * as React from 'react';
import Button from '@mui/material/Button';
import {connect} from "react-redux";
import {defaultPayloadValues} from "../../constants/ActionsConstants";

const clickedStyle = (color, clicked) => {
    return {
        paddingLeft: "6px",
        paddingRight: "6px",
        minWidth: "32px",
        minHeight: "32px",
        borderRadius: 0,
        border: clicked ? "2px solid blue" : "2px solid rgba(0, 0, 0, 0.0)",
        backgroundColor: color
    }
};

function SquareColorButton({color, checkValue, type, dispatch})  {
    const checkIsClicked = (color, checkValue) => color === checkValue;

    const returnDispatchObject = (value) => {
        dispatch({
            type: type,
            payload: value
        })
    };

    const handleClick = (event) => {
        event.preventDefault();
        if(checkIsClicked(color, checkValue)) {
            returnDispatchObject(defaultPayloadValues.DEFAULT_EMPTY_VALUE)
        } else {
            returnDispatchObject(color)
        }
    };

    return <Button
            variant="contained"
            onClick={handleClick}
            style={clickedStyle(color, checkIsClicked(color, checkValue))}/>
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

export default connect(mapDispatchToProps)(SquareColorButton)
