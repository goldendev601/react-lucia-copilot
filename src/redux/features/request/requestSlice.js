import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "api/axios";
import {
    GET_OPEN_REQUESTS,
    ACCEPT_REQUEST,
    GET_MY_REQUESTS,
    GET_NOTIFICATIONS,
    MARK_COMPLETED,
    FETCH_REQUEST,
    SEND_MESSAGE,
    SEND_FILE,
    LIST_CHATS,
    MARK_SEEN,
    REFUND_REQUEST,
    MARK_TASK_COMPLETED,
    MARK_TASK_UNCOMPLETED
} from "api/api";
import {camelizeNestedKeys} from "utils";

const initialState = {
    openRequests: null,
    messages: null,
    notifications: 0,
    myRequestInfo: null,
    myRequestInfoIsFetching: false,
    openRequestsIsFetching: false,
    myRequests: null,
    myRequestsIsFetching: false,
    selectedRequest: null,
    selectedMyRequest: null,
    acceptedRequest: null,
    isAccepting: false,
    isCompleted: false,
    isCompletedError: false,
    isSent: false,
    isSentError: false,
    isSentFile: false,
    isSentFileError: false,
    acceptedSuccess: false,
    errorMessage: null,
    acceptedError: false,
    isMarkCompleted: false,
    isRefund: false,
    isMarkSeen: false,
    isMarkCompletedError: false,  
    isMarkSeenError: false,  
    isRefundError: false,
    messagesIsFetching: false, 
    expanded: false,
}

export const getOpenRequests = createAsyncThunk(
    'getOpenRequests',
    async (thunkAPI) => {
        try {
            return await axios.get(GET_OPEN_REQUESTS);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getMyRequests = createAsyncThunk(
    'getMyRequests',
    async (thunkAPI) => {
        try {
            return await axios.get(GET_MY_REQUESTS);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getNotifications = createAsyncThunk(
    'getNotifications',
    async (thunkAPI) => {
        try {
            return await axios.get(GET_NOTIFICATIONS);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const acceptRequest = createAsyncThunk(
    'acceptRequest',
    async (formData, thunkAPI) => {
        try {
            return await axios.post(ACCEPT_REQUEST, formData);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const markCompleted = createAsyncThunk(
    'markCompleted',
    async (arg, thunkAPI) => {
        const {advisorId} = arg;
        try {
            return await axios.post(MARK_COMPLETED(advisorId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const refundRequest = createAsyncThunk(
    'refundRequest',
    async (arg, thunkAPI) => {
        const {advisorId} = arg;
        try {
            return await axios.post(REFUND_REQUEST(advisorId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const markSeen = createAsyncThunk(
    'markSeen',
    async (arg, thunkAPI) => {
        const {advisorId} = arg;
        try {
            return await axios.post(MARK_SEEN(advisorId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const sendMessage = createAsyncThunk(
    'sendMessage',
    async (arg, thunkAPI) => {
        const {advisorId, data} = arg;
        try {
            return await axios.post(SEND_MESSAGE(advisorId), data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const markTaskCompleted = createAsyncThunk(
    'markTaskCompleted',
    async (arg, thunkAPI) => {
        const {advisorId, data} = arg;
        try {
            return await axios.post(MARK_TASK_COMPLETED(advisorId), data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const markTaskUnCompleted = createAsyncThunk(
    'markTaskUnCompleted',
    async (arg, thunkAPI) => {
        const {advisorId, data} = arg;
        try {
            return await axios.post(MARK_TASK_UNCOMPLETED(advisorId), data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const sendFile = createAsyncThunk(
    'sendFile',
    async (arg, thunkAPI) => {
        const {advisorId, data} = arg;
        try {
            return await axios.post(SEND_FILE(advisorId), data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const listChats = createAsyncThunk(
    'listChats',
    async (arg, thunkAPI) => {
        const {advisorId} = arg;
        try {
            return await axios.get(LIST_CHATS(advisorId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);


export const fetchRequest = createAsyncThunk(
    'fetchRequest',
    async (arg, thunkAPI) => {
        const {advisorId} = arg;
        try {
            return await axios.get(FETCH_REQUEST(advisorId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        selectRequest(state, {payload}) {
            state.selectedRequest = payload;
        },
        selectMyRequest(state, {payload}) {
            state.selectedMyRequest = payload;
        },
        setTasksViewExpanded: (state, {payload}) => {
            state.expanded = payload;
        },
        clearState: (state) => {
            state.errorMessage = null;
            state.isMarkCompletedError = false;
            state.isMarkCompleted = false;
            state.isCompleted = false;
            state.isCompletedError = false;
            return state;
        },
    },
    extraReducers: {
        [getOpenRequests.fulfilled]: (state, {payload}) => {
            state.openRequests = camelizeNestedKeys(payload.data);
            state.openRequestsIsFetching = false;
        },
        [getOpenRequests.pending]: (state) => {
            state.openRequestsIsFetching = true;
        },
        [getOpenRequests.rejected]: (state) => {
            state.openRequestsIsFetching = false;
        },
        [getMyRequests.fulfilled]: (state, {payload}) => {
            state.myRequests = camelizeNestedKeys(payload.data);
            state.myRequestsIsFetching = false;
        },
        [getMyRequests.pending]: (state) => {
            state.myRequestsIsFetching = true;
        },
        [getMyRequests.rejected]: (state) => {
            state.myRequestsIsFetching = false;
        },
        [getNotifications.fulfilled]: (state, {payload}) => {
            state.notifications = payload.data.notifications;
            state.getNotificationsSuccess = true;
            state.errorMessage = null;
        },
        [getNotifications.rejected]: (state, {payload}) => {
            state.getNotificationsError = true;
            state.errorMessage = payload?.data;
        },
        [listChats.fulfilled]: (state, {payload}) => {
            state.messagesIsFetching = false;
            if (payload.data.length > 0 && state.messages) {
                const id = payload.data[0].id;
                const index = state.messages.findIndex((message) => message.id === id)
                if (payload.data.length != state.messages.length || index === -1)  {
                    state.messages = camelizeNestedKeys(payload.data);
                }
            } else {
                state.messages = camelizeNestedKeys(payload.data);
            }
        },
        [listChats.pending]: (state) => {
            state.messagesIsFetching = true;
        },
        [listChats.rejected]: (state) => {
            state.messagesIsFetching = false;
        },
        [fetchRequest.fulfilled]: (state, {payload}) => {
            state.myRequestInfo = camelizeNestedKeys(payload.data);
            state.myRequestInfoIsFetching = false;
        },
        [fetchRequest.pending]: (state) => {
            state.myRequestInfoIsFetching = true;
        },
        [fetchRequest.rejected]: (state) => {
            state.myRequestInfoIsFetching = false;
        },
        [markCompleted.fulfilled]: (state) => {
            state.isMarkCompleted = true;
            state.isMarkCompletedError = false;
            state.selectedMyRequest.advisorRequestStatus = 'COMPLETED';   
            state.selectedMyRequest.advisorRequestStatusId = 4;
            const requestIndex = state.myRequests.findIndex(re => re.id === state.selectedMyRequest.id);
            const stateMyRequests = [...state.myRequests];
            stateMyRequests[requestIndex].advisorRequestStatus = 'COMPLETED';
            stateMyRequests[requestIndex].advisorRequestStatusId = 4;
            state.myRequests = stateMyRequests;
        },
        [markCompleted.rejected]: (state, {payload}) => {
            state.isMarkCompleted = false;
            state.errorMessage = payload?.data;
            state.isMarkCompletedError = true;
        },
        [refundRequest.fulfilled]: (state) => {
            state.isRefund = true;
            state.isRefundError = false;
            state.selectedMyRequest.advisorRequestStatus = 'REFUNDED';   
            state.selectedMyRequest.advisorRequestStatusId = 5;
            const requestIndex = state.myRequests.findIndex(re => re.id === state.selectedMyRequest.id);
            const stateMyRequests = [...state.myRequests];
            stateMyRequests[requestIndex].advisorRequestStatus = 'REFUNDED';
            stateMyRequests[requestIndex].advisorRequestStatusId = 5;
            state.myRequests = stateMyRequests;
        },
        [refundRequest.rejected]: (state, {payload}) => {
            state.isRefund = false;
            state.errorMessage = payload?.data;
            state.isRefundError = true;
        },
        [markSeen.fulfilled]: (state) => {
            state.isMarkSeen = true;
            state.isMarkSeenError = false;
        },
        [markSeen.rejected]: (state, {payload}) => {
            state.isMarkSeen = false;
            state.errorMessage = payload?.data;
            state.isMarkSeenError = true;
        },
        [markSeen.fulfilled]: (state) => {
            state.isMarkSeen = true;
            state.isMarkSeenError = false;
        },
        [sendMessage.fulfilled]: (state) => {
            state.isSent = true;
            state.isSentError = false;
        },
        [sendMessage.rejected]: (state, {payload}) => {
            state.isSent = false;
            state.errorMessage = payload?.data;
            state.isSentError = true;
        },
        [markTaskCompleted.fulfilled]: (state, {payload}) => {
            state.selectedMyRequest = camelizeNestedKeys(payload.data.request);
            state.isCompleted = true;
            state.isCompletedError = false;
        },
        [markTaskCompleted.rejected]: (state, {payload}) => {
            state.isCompleted = false;
            state.errorMessage = payload?.data;
            state.isCompletedError = true;
        },
        [markTaskUnCompleted.fulfilled]: (state, {payload}) => {
            state.selectedMyRequest = camelizeNestedKeys(payload.data.request);
            state.isUnCompleted = true;
            state.isCompletedError = false;
        },
        [markTaskUnCompleted.rejected]: (state, {payload}) => {
            state.isUnCompleted = false;
            state.errorMessage = payload?.data;
            state.isUnCompletedError = true;
        },
        [sendFile.fulfilled]: (state) => {
            state.isSentFile = true;
            state.isSentFileError = false;
        },
        [sendFile.rejected]: (state, {payload}) => {
            state.isSentFile = false;
            state.errorMessage = payload?.data;
            state.isSentFileError = true;
        },
        [acceptRequest.fulfilled]: (state, {payload}) => {
            state.acceptedRequest = camelizeNestedKeys(payload.data);
            state.isAccepting = false;
            state.acceptedSuccess = true;
            state.errorMessage = null;

            state.openRequests = state.openRequests.filter(openRequest => openRequest.id !== payload.data.id)
            if (state.selectedRequest && state.selectedRequest.id === payload.data.id) {
                state.selectedRequest = null
            }
        },
        [acceptRequest.pending]: (state) => {
            state.isAccepting = true;
        },
        [acceptRequest.rejected]: (state, {payload}) => {
            state.isAccepting = false;
            state.acceptedError = true;
            state.errorMessage = payload?.data;
        },
    }
});

export const {
    selectRequest,
    selectMyRequest,
    setTasksViewExpanded,
    clearState
} = requestSlice.actions;


export const requestSelector = (state) => state.requests;

export default requestSlice.reducer;
