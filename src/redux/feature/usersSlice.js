import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUsersApi,
  deleteUserApi,
  putUserApi,
  postUserApi,
  getUserDetailApi,
} from '../../api/user';

export const getDetailUser = createAsyncThunk(
  'user/getDetailUser',
  async (id) => {
    const res = await getUserDetailApi(id);
    return res.data;
  }
);
export const getUsers = createAsyncThunk('user/getUsers', async () => {
  const res = await getUsersApi();
  return res.data;
});

export const putUser = createAsyncThunk(
  'user/putUser',
  async ({ editId, data }, { dispatch }) => {
    const res = await putUserApi(editId, data);
    dispatch(getUsers());
    return res.data;
  }
);

export const postUser = createAsyncThunk(
  'user/postUser',
  async (data, { dispatch }) => {
    const res = await postUserApi(data);
    dispatch(getUsers());
    return res.data;
  }
);

export const deleteUsers = createAsyncThunk(
  'user/deleteUsers',
  async (id, { dispatch }) => {
    try {
      const res = await deleteUserApi(id);
      await dispatch(getUsers());
      return res.data;
    } catch (e) {
      console.error(e);
    }
  }
);

const initialState = {
  users: [],
  userDetail: {},
  usersStatus: 'idle',
  usersDeleteStatus: 'idle',
  userDetailStatus: 'idle',
};

export const counterSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [getUsers.pending]: (state) => ({
      ...state,
      usersStatus: 'loading',
    }),
    [getUsers.fulfilled]: (state, action) => {
      return {
        ...state,
        users: action.payload,
        usersStatus: 'success',
      };
    },
    [getUsers.rejected]: (state) => ({
      ...state,
      usersStatus: 'failed',
    }),

    // Delete User
    [deleteUsers.pending]: (state) => ({
      ...state,
      usersDeleteStatus: 'loading',
    }),
    [deleteUsers.fulfilled]: (state) => {
      return {
        ...state,
        usersDeleteStatus: 'success',
      };
    },
    [deleteUsers.rejected]: (state) => ({
      ...state,
      usersDeleteStatus: 'failed',
    }),

    // Detail User
    [getDetailUser.pending]: (state) => ({
      ...state,
      userDetailStatus: 'loading',
    }),
    [getDetailUser.fulfilled]: (state, action) => {
      return {
        ...state,
        userDetailStatus: 'success',
        userDetail: action.payload,
      };
    },
    [getDetailUser.rejected]: (state) => ({
      ...state,
      userDetailStatus: 'failed',
    }),
  },
});

export const selectUsers = (state) => state.users.users;
export const selectUserDetail = (state) => state.users.userDetail;
export const selectUserDetailStatus = (state) => state.users.userDetailStatus;
export const selectUsersStatus = (state) => state.users.usersStatus;

export default counterSlice.reducer;
