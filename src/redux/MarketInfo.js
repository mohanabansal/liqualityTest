//action type
const GET_MARKET_INFO = "GET_MARKET_INFO";
const FROM_FILTER = "FROM_FILTER";
const TO_FILTER = "TO_FILTER";

const getMarketInfo = (data) => ({
  type: GET_MARKET_INFO,
  data,
});

export const fromFilter = (selectedValue) => {
  return {
    type: FROM_FILTER,
    selectedValue,
  };
};

export const toFilter = (selectedValue) => {
  return {
    type: TO_FILTER,
    selectedValue,
  };
};

//thunk
export const getMarketInfoFromAPI = () => {
  return async (dispatch, getState, { axios }) => {
    try {
      const { data } = await axios.get(
        "https://liquality.io/swap/agent/api/swap/marketinfo"
      );
      dispatch(getMarketInfo(data));
    } catch (error) {
      console.log(error);
    }
  };
};

//initialState
const initialState = {
  info: [],
  fromFilter: "all",
  toFilter: "all",
  filteredInfo: [],
};

//reducer
export default function marketInfoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MARKET_INFO:
      let filteredData = [];
      if (state.filteredInfo.length) {
        filteredData = state.filteredInfo;
      } else {
        filteredData = action.data;
      }
      return {
        ...state,
        info: action.data,
        filteredInfo: filteredData,
      };
    case FROM_FILTER:
      let oldInfo = state.info;
      let newInfo = [];
      if (action.selectedValue === "all") {
        newInfo = state.info;
      } else {
        newInfo = oldInfo.filter((item) => item.from === action.selectedValue);
      }
      return {
        ...state,
        fromFilter: action.selectedValue,
        filteredInfo: newInfo,
      };
    case TO_FILTER:
      let stateInfo = state.info;
      let newStateInfo = [];
      if (action.selectedValue === "all") {
        newStateInfo = state.info;
      } else {
        newStateInfo = stateInfo.filter(
          (item) => item.to === action.selectedValue
        );
      }
      return {
        ...state,
        toFilter: action.selectedValue,
        filteredInfo: newStateInfo,
      };
    default:
      return state;
  }
}
