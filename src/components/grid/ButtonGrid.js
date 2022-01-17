import * as React from 'react';
import Grid from '@mui/material/Grid';
import SimpleButton from "../button/SimpleButton";
import useMediaQuery from "@mui/material/useMediaQuery";

function ButtonGrid ({buttons, checkValue, type}) {
    const smallMatches = useMediaQuery('(max-width:480px)');
    const listItems = buttons.map((text) => <Grid item xs={smallMatches ? 12 : 3} key={text}><SimpleButton text={text}
                                                                                       checkValue={checkValue}
                                                                                       type={type}/></Grid>);
    return <Grid container>{listItems}</Grid>;
}

export default ButtonGrid;
