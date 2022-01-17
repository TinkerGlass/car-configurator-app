import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./CarSummaryCard.css"
import CarVisualization from "../visualization/CarVisualization";
import {connect} from "react-redux";
import {useState} from "react";
import {defaultPayloadValues} from "../../constants/ActionsConstants";
import {useEffect} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const carCardStyle = (mediumMatches) => {
    return {
        marginTop: "16px",
        marginRight: "5%",
        marginLeft: mediumMatches ? "5%" : "0",
        borderRadius: 0,
    }
};

function CarSummaryCard ({currentModel, currentEngine, currentGearbox, currentColor, prices, colorNames}) {
    const mediumMatches = useMediaQuery('(max-width:720px)');
    const calculateSinglePrice = (valueToCheck) => {
        let val = '0.00';
        if(valueToCheck !== defaultPayloadValues.DEFAULT_EMPTY_VALUE){
            val = prices.filter((value => {
                return value[0] === valueToCheck}))[0][1];
        }
        return parseFloat(val);
    };

    const [price, setPrice] = useState(0);
    useEffect(() => {
        const calculatePrice = () => {
            let newPrice = 0.0;
            newPrice += calculateSinglePrice(currentModel);
            newPrice += calculateSinglePrice(currentEngine);
            newPrice += calculateSinglePrice(currentGearbox);
            newPrice += calculateSinglePrice(currentColor);
            setPrice(newPrice);
        };

        calculatePrice();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentModel, currentEngine, currentGearbox, currentColor, prices])

    const ReturnSummaryRow = ({label, value}) => (
        <div style={{display: 'flex', justifyContent: "space-between"}}>
            <p>{label}</p>
            <p>{value}</p>
        </div>);


    return (
        <Card style={carCardStyle(mediumMatches)}>
            <CardContent style={{backgroundColor: "black",
            color: "white"}}>
                <h2 style={{textAlign: "right", fontSize: "20px", fontWeight: 400}}>Summary</h2>
                <CarVisualization color={currentColor === defaultPayloadValues.DEFAULT_EMPTY_VALUE ? "#262929" : currentColor}/>
                <div style={{textAlign: "left", fontSize: "18px", marginTop: '20px' ,fontWeight: 300}}>
                    <ReturnSummaryRow label={"Model"} value={currentModel} />
                    <ReturnSummaryRow label={"Engine"} value={currentEngine} />
                    <ReturnSummaryRow label={"Gearbox"} value={currentGearbox} />
                    <ReturnSummaryRow label={"Colors"} value={colorNames.get(currentColor)} />
                    <ReturnSummaryRow label={"Price"} value={'$' + price.toFixed(2).toString()} />
                </div>
            </CardContent>
        </Card>
    );
}

const mapStateToProps = state => {
    return {
        currentModel: state.currentModel,
        currentEngine: state.currentEngine,
        currentGearbox: state.currentGearbox,
        currentColor: state.currentColor,
        prices: state.prices,
        colorNames: state.colorNames
    }
};

export default connect(mapStateToProps)(CarSummaryCard)
