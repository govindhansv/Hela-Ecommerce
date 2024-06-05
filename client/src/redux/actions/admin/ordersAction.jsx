import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequest } from "../../../common/api";
import { appJson } from "../../../common/configurations";

// Get all orders
export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (queries, { rejectWithValue }) => {
    return commonReduxRequest(
      "get",
      `/admin/orders${queries && `?${queries}`}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);

// Update the status of order
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, formData }, { rejectWithValue }) => {
    return commonReduxRequest(
      "patch",
      `/admin/order-status/${id}`,
      formData,
      appJson,
      rejectWithValue
    );
  }
);

// Return Order Actions

// Get return all orders
export const getReturnOrders = createAsyncThunk(
  "orders/getReturnOrders",
  async (queries, { rejectWithValue }) => {
    return commonReduxRequest(
      "get",
      `/admin/return-orders${queries && `?${queries}`}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);

export const updateReturnOrderStatus = createAsyncThunk(
  "orders/updateReturnOrderStatus",
  async ({ id, formData }, { rejectWithValue }) => {
    return commonReduxRequest(
      "patch",
      `/admin/return-order-status/${id}`,
      formData,
      appJson,
      rejectWithValue
    );
  }
);
