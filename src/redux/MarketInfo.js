//action type
const GET_MARKET_INFO = "GET_MARKET_INFO";
const FROM_FILTER = "FROM_FILTER";

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
  fromSort: "all",
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
        fromSort: action.selectedValue,
        filteredInfo: newInfo,
      };
    default:
      return state;
  }
}
