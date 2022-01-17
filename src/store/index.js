import { createStore } from 'redux'
import {defaultPayloadValues, reduxActions} from "../constants/ActionsConstants";

const initialState = {
    currentModel: defaultPayloadValues.DEFAULT_EMPTY_VALUE,
    currentEngine: defaultPayloadValues.DEFAULT_EMPTY_VALUE,
    currentGearbox: defaultPayloadValues.DEFAULT_EMPTY_VALUE,
    currentColor: defaultPayloadValues.DEFAULT_EMPTY_VALUE,
    models: [],
    engines: [],
    gearboxes: [],
    colors: [],
    prices: [],
    colorNames: new Map(),
};

const reducer = (state = initialState, action) => {
    if (action.type === reduxActions.MODEL_SELECT_ACTION) {
        return Object.assign({}, state, {
            currentModel: action.payload
        })
    }
    if (action.type === reduxActions.ENGINE_SELECT_ACTION) {
        return Object.assign({}, state, {
            currentEngine: action.payload
        })
    }
    if (action.type === reduxActions.GEARBOX_SELECT_ACTION) {
        return Object.assign({}, state, {
            currentGearbox: action.payload
        })
    }
    if (action.type === reduxActions.COLOR_SELECT_ACTION) {
        return Object.assign({}, state, {
            currentColor: action.payload
        })
    }

    if (action.type === reduxActions.MODELS_SET_ACTION) {
        return Object.assign({}, state, {
            models: action.payload
        })
    }
    if (action.type === reduxActions.ENGINES_SET_ACTION) {
        return Object.assign({}, state, {
            engines: action.payload
        })
    }
    if (action.type === reduxActions.GEARBOXES_SET_ACTION) {
        return Object.assign({}, state, {
            gearboxes: action.payload
        })
    }
    if (action.type === reduxActions.COLORS_SET_ACTION) {
        return Object.assign({}, state, {
            colors: action.payload
        })
    }
    if (action.type === reduxActions.PRICES_SET_ACTION) {
        return Object.assign({}, state, {
            prices: action.payload
        })
    }
    if (action.type === reduxActions.COLORS_NAMES_SET_ACTION) {
        return Object.assign({}, state, {
            colorNames: action.payload
        })
    }

    return state
};

const store = createStore(reducer);

export default store
