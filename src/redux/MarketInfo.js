//action
const GET_MARKET_INFO = "GET_MARKET_INFO";
const SET_FREQUENCY = "SET_FREQUENCY";

const getMarketInfo = (data) => ({
  type: GET_MARKET_INFO,
  data,
});

export const setFrequecy = (freq) => {
  return {
    type: SET_FREQUENCY,
    freq,
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
  freq: 15,
};

//reducer
export default function marketInfoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MARKET_INFO:
      return {
        ...state,
        info: action.data,
      };
    case SET_FREQUENCY:
      return {
        ...state,
        freq: action.freq,
      };
    default:
      return state;
  }
}
