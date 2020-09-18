//action
const GET_MARKET_INFO = "GET_MARKET_INFO";
const FILTER_FROM = "FILTER_FROM";

const getMarketInfo = (data) => ({
  type: GET_MARKET_INFO,
  data,
});

export const filterFrom = (filterValue) => {
  console.log("Filter called", filterValue);
  return {
    type: FILTER_FROM,
    filterValue,
  };
};

//thunk
export const getMarketInfoFromAPI = () => {
  console.log("called");
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
  from: [],
  to: [],
};

//reducer
export default function marketInfoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MARKET_INFO:
      const data = action.data;
      const fromSet = new Set();
      const toSet = new Set();
      for (let item of data) {
        if (!fromSet.has(item.from)) {
          fromSet.add(item.from);
        }
        if (!toSet.has(item.to)) {
          toSet.add(item.to);
        }
      }
      return {
        ...state,
        info: action.data,
        from: [...fromSet],
        to: [...toSet],
      };
    case FILTER_FROM:
      console.log("in case");
      const info = [...state.info];
      const result = info.filter((item) => {
        if (item.from === action.filterValue) {
          return item;
        }
      });
      console.log("filteredREsult", result);
      return {
        ...state,
        info: result,
      };
    default:
      return state;
  }
}
