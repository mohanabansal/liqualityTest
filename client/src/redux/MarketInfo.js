import socket from "../socket";

//action
const GET_MARKET_INFO = "GET_MARKET_INFO";

const getMarketInfo = (data) => ({
  type: GET_MARKET_INFO,
  data,
});

//thunk
// export const getMarketInfoFromAPI = () => {
//   console.log("Reducer called");
//   return async (dispatch, getState, { axios }) => {
//     try {
//       const { data } = await axios.get(
//         "https://liquality.io/swap/agent/api/swap/marketinfo"
//       );
//       dispatch(getMarketInfo(data));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export const getMarketInfoFromAPI = (socket, timer) => {
  return (dispatch) => {
    // dispatch(clearAllItems())
    // socket.emit("fetchData", (res) => {
    //   console.log(res);
    //   dispatch(getMarketInfo(res));
    // });
    socket.emit("fetchData", timer);
    socket.on("newInfo", (data) => {
      console.log("data from Socket-------", data)
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
