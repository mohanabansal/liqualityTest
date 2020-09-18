//action
const GET_MARKET_INFO = "GET_MARKET_INFO";
const SET_FILTER_FROM = "SET_FILTER_FROM";
const FILTER = "FILTER";
const FILTER_TO = "FILTER_TO";

const getMarketInfo = (data) => ({
  type: GET_MARKET_INFO,
  data,
});

export const setFilterFrom = (val) => ({
  type: SET_FILTER_FROM,
  val,
});

export const filterFrom = (data) => ({
  type: FILTER,
  data,
});

export const filterTo = (data) => ({
  type: FILTER_TO,
  data,
});

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
  filterFrom: "",
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
      let filteredResult = [];
      if (state.filterFrom) {
        let oldInfo = [...state.info];
        let filteredResult = oldInfo.filter(
          (item) => item.from !== state.filterFrom
        );
      }
      return {
        ...state,
        info: action.data,
        from: [...fromSet],
        to: [...toSet],
      };
    case SET_FILTER_FROM:
      return {
        ...state,
        filterFrom: action.val,
      };
    case FILTER:
      console.log("in case");
      const info = [...state.info];
      let result = info.filter((item) => item.from !== action.data);
      console.log("filteredREsult", result);
      return {
        ...state,
        info: [...result],
      };
    default:
      return state;
  }
}
