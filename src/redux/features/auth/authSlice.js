import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {IMPERSONATE, LOGIN, REGISTER} from "api/api";
import {camelizeNestedKeys} from "utils";

const initialState = {
    user: null,
    accessToken: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
    impersonateIsSuccess: false,
    impersonateIsError: false,
    errorMessage: null,
    message: null,
};

export const impersonate = createAsyncThunk(
    'auth/impersonate',
    async (impersonateToken, thunkAPI) => {
        try {
            return await axios.post(IMPERSONATE(impersonateToken));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({email, password}, thunkAPI) => {
        try {
            return await axios.post(LOGIN, {email, password});
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async (formData, thunkAPI) => {
        try {
            return await axios.post(REGISTER, formData);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            state.impersonateIsSuccess = false;
            state.impersonateIsError = false;
            return state;
        },
        updateUserState: (state, key, value) => {
            state.user[key] = value;
            return state;
        },
        logout: () => initialState,
    },
    extraReducers: {
        [impersonate.fulfilled]: (state, {payload}) => {
            state.user = camelizeNestedKeys(payload.data.user);
            state.accessToken = payload?.data?.access_token;
            state.impersonateIsSuccess = true;
            state.errorMessage = null;
        },
        [impersonate.rejected]: (state, {payload}) => {
            state.impersonateIsError = true;
            state.errorMessage = payload?.data;
        },
        [loginUser.fulfilled]: (state, {payload}) => {
            state.user = camelizeNestedKeys(payload.data.user);
            state.accessToken = payload.data.access_token;
            state.isFetching = false;
            state.isSuccess = true;
            state.errorMessage = null;
        },
        [loginUser.pending]: (state) => {
            state.isFetching = true;
        },
        [loginUser.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload?.data;
        },
        [registerUser.fulfilled]: (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.user = payload.message;
        },
        [registerUser.pending]: (state) => {
            state.isFetching = true;
        },
        [registerUser.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload?.data;
        },
    }
});

export const {clearState, logout, updateUserState} = authSlice.actions;

export const userSelector = (state) => state.auth;

export default authSlice.reducer;