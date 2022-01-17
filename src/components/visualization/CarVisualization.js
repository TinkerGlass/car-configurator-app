import * as React from 'react';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

function CarVisualization ({color}) {

    return (
        <Card style={{marginTop: "16px", color: color,  borderRadius: 0}}>
            <CardContent style={{backgroundColor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'}}>
                <DirectionsCarIcon style={{margin: 'auto', width: '140px', height: '140px'}}/>
            </CardContent>
        </Card>
    );
}

export default CarVisualization;
