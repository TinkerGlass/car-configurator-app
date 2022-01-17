import './App.css';
import React, {useEffect, useState} from "react";
import ElementDecisionPanel from "./components/panel/ElementDecisionPanel";
import ColorDecisionPanel from "./components/panel/ColorDecisionPanel";
import Grid from '@mui/material/Grid';
import CarSummaryCard from "./components/card/CarSummaryCard";
import { connect } from 'react-redux'
import {defaultPayloadValues, reduxActions} from "./constants/ActionsConstants";
import useMediaQuery from '@mui/material/useMediaQuery';
import {fetchFile} from "./utils/fetchUtils";

const titleDivStyle = {
    minWidth: "100%"
};

const titleStyle = {
    marginLeft: '2.5%',
    textAlign: "left",
    fontSize: "24px",
};

const mobileStyle = {
    display: 'flex',
    flexDirection: 'column'
};

function App({currentModel, currentEngine, currentGearbox, currentColor, models, engines, gearboxes, colors, dispatch}){
    const mediumMatches = useMediaQuery('(max-width:720px)');
    const [modelConditions, setModelConditions] = useState([]);
    const [engineConditions, setEngineConditions] = useState([]);

    const entriesNames = ['name', 'value'];

    const conditionalsParser = (fileLine) => {
        const splitStr = fileLine.split(";");
        splitStr[1] = splitStr[1].split(',');
        return [[entriesNames[0], splitStr[0]], [entriesNames[1], splitStr[1]]]
    };
    const returnDispatchObject = (type, value) => {
        dispatch({
            type: type,
            payload: value
        })
    };

    useEffect(() => {
        fetchFile("./data.txt").then(function(textData) {
            let preparedSplitterData = [];
            let splitterData = textData.split('\r\n');
            splitterData.forEach((element) => preparedSplitterData.push(element.split(";")));
            returnDispatchObject(reduxActions.MODELS_SET_ACTION, preparedSplitterData[0]);
            returnDispatchObject(reduxActions.ENGINES_SET_ACTION, preparedSplitterData[1]);
            returnDispatchObject(reduxActions.GEARBOXES_SET_ACTION, preparedSplitterData[2]);
            returnDispatchObject(reduxActions.COLORS_SET_ACTION, preparedSplitterData[3]);
        }).catch(function(err) {console.log('Fetch problem show: ' + err.message);});

        fetchFile("./model_conditions.txt").then(function(textData) {
            let conditions = [];
            let splitterData = textData.split('\r\n');
            splitterData.splice(splitterData.length-1);
            splitterData.forEach((element) => {
                let entries = conditionalsParser(element);
                conditions.push(Object.fromEntries(entries));
            });
            setModelConditions(conditions);
        }).catch(function(err) {console.log('Fetch problem show: ' + err.message);});

        fetchFile("./engine_conditions.txt").then(function(textData) {
            let conditions = [];
            let splitterData = textData.split('\r\n');
            splitterData.splice(splitterData.length-1);
            splitterData.forEach((element) => {
                let entries = conditionalsParser(element);
                conditions.push(Object.fromEntries(entries));
            });
            setEngineConditions(conditions);
        }).catch(function(err) {console.log('Fetch problem show: ' + err.message);});

        fetchFile("./price_values.txt").then(function(textData) {
            let prices = [];
            let splitterData = textData.split('\r\n');
            splitterData.splice(splitterData.length-1);
            splitterData.forEach((element) => {
                let entries = element.split(';');
                prices.push(entries);
            });
            returnDispatchObject(reduxActions.PRICES_SET_ACTION, prices);
        }).catch(function(err) {console.log('Fetch problem show: ' + err.message);});

        fetchFile("./colors.txt").then(function(textData) {
            let colors = new Map();
            let splitterData = textData.split('\r\n');
            splitterData.splice(splitterData.length-1);
            splitterData.forEach((element) => {
                let colorData = element.split(';');
                colors.set(colorData[0], colorData[1]);
            });
            returnDispatchObject(reduxActions.COLORS_NAMES_SET_ACTION, colors);
        }).catch(function(err) {
            console.log('Fetch problem show: ' + err.message);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(modelConditions.length !== 0) {
            let modelEngines = modelConditions.filter((value => {
                return value.name === currentModel
            }));
            if(!modelEngines[0].value.includes(currentEngine)) {
                returnDispatchObject(reduxActions.ENGINE_SELECT_ACTION, defaultPayloadValues.DEFAULT_EMPTY_VALUE);
            }
            returnDispatchObject(reduxActions.ENGINES_SET_ACTION, modelEngines[0].value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentModel]);

    useEffect(() => {
        if(engineConditions.length !== 0) {
            let engineGearboxes = engineConditions.filter((value => {
                return value.name === currentEngine
            }));
            if(!engineGearboxes[0].value.includes(currentGearbox)) {
                returnDispatchObject(reduxActions.GEARBOX_SELECT_ACTION, defaultPayloadValues.DEFAULT_EMPTY_VALUE);
            }
            returnDispatchObject(reduxActions.GEARBOXES_SET_ACTION, engineGearboxes[0].value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentEngine]);


  return (
    <div className="App">
            <Grid container style={mediumMatches ? mobileStyle : {}}>
                <Grid item xs={mediumMatches ? 12 : 8} >
                    <div style={titleDivStyle}><h1 style={titleStyle}>CKONGIG 5.1</h1></div>
                    <ElementDecisionPanel title="Model"
                                          type={reduxActions.MODEL_SELECT_ACTION}
                                          checkValue={currentModel}
                                          buttons={models}/>
                    <ElementDecisionPanel title="Engine"
                                          type={reduxActions.ENGINE_SELECT_ACTION}
                                          checkValue={currentEngine}
                                          buttons={engines}/>
                    <ElementDecisionPanel title="Gearbox"
                                          type={reduxActions.GEARBOX_SELECT_ACTION}
                                          checkValue={currentGearbox}
                                          buttons={gearboxes}/>
                    <ColorDecisionPanel title="Colors"
                                        type={reduxActions.COLOR_SELECT_ACTION}
                                        checkValue={currentColor}
                                        colors={colors}/>
                </Grid>
                <Grid item xs={mediumMatches ? 12 : 4}>
                    <CarSummaryCard/>
                </Grid>
            </Grid>
    </div>
  );
}

const mapStateToProps = state => {
    return {
        currentModel: state.currentModel,
        currentEngine: state.currentEngine,
        currentGearbox: state.currentGearbox,
        currentColor: state.currentColor,
        models: state.models,
        engines: state.engines,
        gearboxes: state.gearboxes,
        colors: state.colors,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
