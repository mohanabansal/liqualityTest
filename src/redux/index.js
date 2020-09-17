import { combineReducers } from "redux";
import marketInfoReducer from "./MarketInfo";

const appReducer = combineReducers({
  marketInfo: marketInfoReducer,
});

export default appReducer;
