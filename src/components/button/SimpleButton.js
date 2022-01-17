import * as React from 'react';
import Button from '@mui/material/Button';
import {connect} from "react-redux";
import {defaultPayloadValues} from "../../constants/ActionsConstants";

const notClickedStyle = {
        minWidth: "80%",
        borderRadius: 0,
        backgroundColor: "#cdcdcd",
        color: "black"
};

const clickedStyle = {
        minWidth: "80%",
        borderRadius: 0,
        backgroundColor: "black",
        color: "white"
};

function SimpleButton({text, checkValue, type, dispatch}) {
        const checkIsClicked = (text, checkValue) => text === checkValue;

        const returnDispatchObject = (value) => {
                dispatch({
                        type: type,
                        payload: value
                })
        };

        const handleClick = (event) => {
                event.preventDefault();
                if(checkIsClicked(text, checkValue)) {
                        returnDispatchObject(defaultPayloadValues.DEFAULT_EMPTY_VALUE)
                } else {
                        returnDispatchObject(text)
                }
        };

        return <Button
            variant="contained"
            onClick={handleClick}
            style={checkIsClicked(text, checkValue) ? clickedStyle : notClickedStyle}>
            {text}
        </Button>
}

const mapDispatchToProps = dispatch => {
        return {
                dispatch
        }
};

export default connect(mapDispatchToProps)(SimpleButton)
