import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getHomeDiscountData,
  getHomeGoodPriceData,
  getHomeHighScoreData
} from "../../services";

export const fetchHomeDataAction = createAsyncThunk(
  "fetchdata",
  (payload, { dispatch }) => {
    //有两个 await 请求 第二个会等第一个 用 promise.then 解决 直接 dispatch 可不用过 extrareducer
    getHomeGoodPriceData().then((res) => {
      dispatch(changeGoodPriceInfoAction(res));
    });
    getHomeHighScoreData().then((res) => {
      dispatch(changeHighScoreInfoAction(res));
    });
    getHomeDiscountData().then((res) => {
      dispatch(changeDiscountInfoAction(res));
    });
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: {
    goodPriceInfo: {},
    highScoreInfo: {},
    discountInfo: {}
  },
  reducers: {
    changeGoodPriceInfoAction(state, { payload }) {
      state.goodPriceInfo = payload;
    },
    changeHighScoreInfoAction(state, { payload }) {
      state.highScoreInfo = payload;
    },
    changeDiscountInfoAction(state, { payload }) {
      state.discountInfo = payload;
    }
  },
  // extraReducers: {
  //   [fetchHomeDataAction.fulfilled](state, { payload }) {
  //     state.goodPriceInfo = payload;
  //   }
  // }
  extraReducers: (builder) => {
    // builder.addCase(fetchHomeDataAction.fulfilled, (state, { payload }) => {
    //   state.goodPriceInfo = payload;
    // });
  }
});

export const {
  changeGoodPriceInfoAction,
  changeHighScoreInfoAction,
  changeDiscountInfoAction
} = homeSlice.actions;

export default homeSlice.reducer;
