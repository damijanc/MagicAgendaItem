import {combineReducers} from "redux";
import details from "./details";
import agenda from "./agenda";

const rootReducer = combineReducers({
    details,
    agenda,
});

export default rootReducer;
