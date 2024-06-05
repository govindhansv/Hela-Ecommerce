import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequest } from "@common/api";
import { appJson } from "@Common/configurations";

export const getWallet = createAsyncThunk(
  "wallet/getWallet",
  async (queries, { rejectWithValue }) => {
    return commonReduxRequest(
      "get",
      `/user/wallet${queries && `?${queries}`}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);
