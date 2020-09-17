import socket from "../socket";

//action
const GET_MARKET_INFO = "GET_MARKET_INFO";

const getMarketInfo = (data) => ({
  type: GET_MARKET_INFO,
  data,
});


export const getMarketInfoFromAPI = (socket, timer, initial) => {
  return (dispatch) => {
    socket.emit("fetchData", timer, initial);
    socket.on("newInfo", (data) => {
      dispatch(getMarketInfo(data))
    })
  };
};

//initialState
const initialState = {
  info: [],
};

//reducer
export default function marketInfoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MARKET_INFO:
      return {
        ...state,
        info: action.data,
      };
    default:
      return state;
  }
}
