import {createAsyncThunk, createSlice, current} from '@reduxjs/toolkit';
import axios from "api/axios";
import {
    ADD_ITINERARY, ADD_ITINERARY_PASSENGER,
    DELETE_ITINERARY,    
    DELETE_ITINERARY_PASSENGER,
    FETCH_ITINERARIES,
    FETCH_ITINERARY, FETCH_PACKED_ITINERARY,
    FETCH_SHARED_ITINERARY,
    GET_ITINERARY_PASSENGERS,
    UPDATE_ITINERARY,
    CLONE_ITINERARY,
    UPDATE_ITINERARY_ABSTRACT, 
    UPDATE_ITINERARY_BOOKING_POSITION,
    UPDATE_ITINERARY_PASSENGER,
    FETCH_PROPERTY_DESIGNS,
    ADVISOR_REQUESTS_HIRE,
    ADVISOR_REQUESTS_PAY_USING_INTENT,
    ADVISOR_REQUESTS_COMPLETE_INTENT_PAYMENT

} from "api/api";
import {camelizeNestedKeys} from "utils";

const initialState = {
    itinerary: null,
    packedItinerary: null,
    page: 1,
    start: 0,
    itineraryId: null,
    advisorRequestType: null,
    pictures: null,
    passengers: null,
    itineraries: null,
    advisorRequest: null,
    advisorRequestId: null,
    isFetching: false,
    isHiring: false,
    hiredSuccess: false,
    isSuccess: false,
    isError: false,
    errorMessage: null,
    clientSecret: null,
    stripeKey: null,
    advisorRequestCompletePaymentResponse: null,
    isPayUsingIntentSuccess: false,
    isPayUsingIntentError: false,
    picturesErrorMessage: null,
    addedSuccess: false,
    addedError: false,
    hiredError: false,
    isDeletedSuccess: false,
    isDeletedError: false,
    isItineraryUpdated: false,
    isItineraryUpdatedError: false,
    isItineraryCloned: false,
    isItineraryClonedError: false,
    isPassengerDeletedSuccess: false,
    isPassengerDeletedError: false,
    itineraryPassengersIsFetching: false,
    itineraryPassengersIsSuccess: false,
    isItineraryBookingPositionError: false,
    isItineraryBookingPositionSuccess: false,
}

export const fetchItineraries = createAsyncThunk(
    'itineraries/fetchItineraries',
    async (arg, thunkAPI) => {
        const {start, past, active, upcoming} = arg;
        try {
            return await axios.get(FETCH_ITINERARIES(start, past, active, upcoming));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const fetchPackedItinerary = createAsyncThunk(
    'itineraries/fetchPackedItinerary',
    async (itineraryId, thunkAPI) => {
        try {
            return await axios.get(FETCH_PACKED_ITINERARY(itineraryId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const updateItineraryBookingPosition = createAsyncThunk(
    'itineraries/updateItineraryBookingPosition',
    async (arg, thunkAPI) => {
        const {itineraryId, formData} = arg;
        try {
            return await axios.post(UPDATE_ITINERARY_BOOKING_POSITION(itineraryId), formData, {headers: {"Content-Type": "multipart/form-data"}});
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);


export const advisorRequestsPayUsingIntent = createAsyncThunk(
    'itineraries/advisorRequestsPayUsingIntent',
    async (arg, thunkAPI) => {
        const {advisorId} = arg;
        try {
            return await axios.post(ADVISOR_REQUESTS_PAY_USING_INTENT(advisorId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const advisorRequestsCompleteIntentPayment = createAsyncThunk(
    'itineraries/advisorRequestsCompleteIntentPayment',
    async (arg, thunkAPI) => {
        const {advisorId} = arg;
        try {
            return await axios.post(ADVISOR_REQUESTS_COMPLETE_INTENT_PAYMENT(advisorId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const fetchItinerary = createAsyncThunk(
    'itineraries/fetchItinerary',
    async (id, thunkAPI) => {
        try {
            return await axios.get(FETCH_ITINERARY(id));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const fetchSharedItinerary = createAsyncThunk(
    'itineraries/fetchSharedItinerary',
    async (key, thunkAPI) => {
        try {
            return await axios.get(FETCH_SHARED_ITINERARY(key));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getItineraryPassengers = createAsyncThunk(
    'itineraries/getItineraryPassengers',
    async (itineraryId, thunkAPI) => {
        try {
            return await axios.get(GET_ITINERARY_PASSENGERS(itineraryId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getPropertyDesigns = createAsyncThunk(
    'itineraries/getPropertyDesigns',
    async (thunkAPI) => {
        try {
            return await axios.get(FETCH_PROPERTY_DESIGNS);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const addItinerary = createAsyncThunk(
    'itineraries/addItinerary',
    async (formData, thunkAPI) => {
        try {
            return await axios.post(ADD_ITINERARY, formData);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);


export const advisorRequestsHire = createAsyncThunk(
    'itineraries/advisorRequestsHire',
    async (formData, thunkAPI) => {
        try {
            return await axios.post(ADVISOR_REQUESTS_HIRE, formData);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const addItineraryPassenger = createAsyncThunk(
    'itineraries/addItineraryPassenger',
    async (arg, thunkAPI) => {
        const {itineraryId, passenger} = arg;
        try {
            return await axios.post(ADD_ITINERARY_PASSENGER(itineraryId), passenger);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const deleteItinerary = createAsyncThunk(
    'itineraries/deleteItinerary',
    async (id, thunkAPI) => {
        try {
            return await axios.delete(DELETE_ITINERARY(id));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const deleteItineraryPassenger = createAsyncThunk(
    'itineraries/deleteItineraryPassenger',
    async (arg, thunkAPI) => {
        const {itineraryId, passengerId} = arg;
        try {
            return await axios.delete(DELETE_ITINERARY_PASSENGER(itineraryId, passengerId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const updateItineraryAbstract = createAsyncThunk(
    'itineraries/updateItineraryAbstract',
    async (arg, thunkAPI) => {
        const {itineraryId, abstract} = arg;
        try {
            return await axios.post(UPDATE_ITINERARY_ABSTRACT(itineraryId), abstract);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const updateItineraryInformation = createAsyncThunk(
    'itineraries/updateItineraryInformation',
    async (arg, thunkAPI) => {
        const {itineraryId, data} = arg;
        try {
            return await axios.post(UPDATE_ITINERARY(itineraryId), data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const cloneItineraryInformation = createAsyncThunk(
    'itineraries/cloneItineraryInformation',
    async (arg, thunkAPI) => {
        const {itineraryId} = arg;
        try {
            return await axios.post(CLONE_ITINERARY(itineraryId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const updateItineraryPassenger = createAsyncThunk(
    'itineraries/updateItineraryPassenger',
    async (arg, thunkAPI) => {
        const {itineraryId, passengerId, passenger} = arg;
        try {
            return await axios.post(UPDATE_ITINERARY_PASSENGER(itineraryId, passengerId), passenger);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const itinerariesSlice = createSlice({
    name: 'itinerary',
    initialState,
    reducers: {
        setItineraryId: (state, {payload}) => {
            state.itineraryId = payload;
        },
        setPage: (state, {payload}) => {
            state.page = payload;
        },
        setAdvisorRequestType: (state, {payload}) => {
            state.advisorRequestType = payload;
        },
        setBookings: (state, {payload}) => {
            state.packedItinerary.bookings[payload.dateSource] = payload.sourceBookings;
            state.packedItinerary.bookings[payload.dateDestination] = payload.destinationBookings;
        },
        setStart: (state, {payload}) => {
            if (!payload) {
                if (state.page === 1) {
                    state.start = 0
                } else {
                    state.start = (state.page - 1) * 10 + 1;
                }
            } else {
                state.start = Math.ceil(payload - 1) + 1;
            }
        },
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            state.addedError = false;
            state.addedSuccess = false;
            state.isDeletedSuccess = false;
            state.isDeletedError = false;
            state.isItineraryUpdated = false;
            state.isItineraryUpdatedError = false;
            state.isItineraryCloned = false;
            state.isItineraryClonedError = false;
            state.hiredError = false;
            return state;
        },
        clearDelete: (state) => {
            state.isDeleted = false;
            state.isError = false;
            return state;
        },
        clearAdded: (state) => {
            state.addedSuccess = false;
            state.addedError = false;
        },
        clearPassengerDeleted: (state) => {
            state.isPassengerDeletedSuccess = false;
            state.isPassengerDeletedError = false;
        },
        clearItineraryUpdated: (state) => {
            state.isItineraryUpdated = false;
            state.isItineraryUpdatedError = false;
        },
        clearItineraryCloned: (state) => {
            state.isItineraryCloned = false;
            state.isItineraryClonedError = false;
        },
        clearItineraryPassengersSuccess: (state) => {
            state.itineraryPassengersIsSuccess = false;
        },
        clearItineraryBookingPositionFlags: (state) => {
            state.isItineraryBookingPositionSuccess = false;
            state.isItineraryBookingPositionError = false;
        },
        clearStripeKey: (state) => {
            state.stripeKey = null;
            state.clientSecret = null;
        },
        clearAdvisorId: (state) => {
            state.advisorRequestId = null;
            state.advisorRequestType = null;
            state.isHiring = false;
            state.hiredSuccess = false;
            state.hiredError = false
        },
    },
    extraReducers: {
        //Update itinerary booking position
        [updateItineraryBookingPosition.fulfilled]: (state, {payload}) => {
            state.isItineraryBookingPositionSuccess = true;
            state.packedItinerary = camelizeNestedKeys(payload.data);
            state.errorMessage = null;
        },
        [updateItineraryBookingPosition.rejected]: (state, {payload}) => {
            state.isItineraryBookingPositionError = true;
            state.errorMessage = payload?.data;
        },
        // Fetch packed itinerary
        [fetchPackedItinerary.fulfilled]: (state, {payload}) => {
            state.packedItinerary = camelizeNestedKeys(payload.data);
            state.isFetching = false;
        },
        [fetchPackedItinerary.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchPackedItinerary.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
        // Fetch itinerary
        [fetchItineraries.fulfilled]: (state, {payload}) => {
            state.itineraries = camelizeNestedKeys(payload.data);
            state.isFetching = false;
        },
        [fetchItineraries.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchItineraries.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
        [addItinerary.fulfilled]: (state, {payload}) => {
            state.itinerary = camelizeNestedKeys(payload.data);
            state.itineraryId = payload.data.id;
            state.isFetching = false;
            state.addedSuccess = true;
            state.errorMessage = null;
        },
        [addItinerary.pending]: (state) => {
            state.isFetching = true;
        },
        [addItinerary.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.addedError = true;
            state.errorMessage = payload?.data;
        },
        [advisorRequestsHire.fulfilled]: (state, {payload}) => {
            state.advisorRequest = camelizeNestedKeys(payload.data);
            state.advisorRequestId = payload.data.id;
            state.isHiring = false;
            state.hiredSuccess = true;
            state.errorMessage = null;
        },
        [advisorRequestsHire.pending]: (state) => {
            state.isHiring = true;
        },
        [advisorRequestsHire.rejected]: (state, {payload}) => {
            state.isHiring = false;
            state.hiredError = true;
            state.errorMessage = payload?.data;
        },
        [advisorRequestsPayUsingIntent.fulfilled]: (state, {payload}) => {
            state.clientSecret = payload.data.clientSecret;
            state.stripeKey = payload.data.stripe_key;
            state.isPayUsingIntentSuccess = true;
            state.errorMessage = null;
        },
        [advisorRequestsPayUsingIntent.rejected]: (state, {payload}) => {
            state.isPayUsingIntentError = true;
            state.errorMessage = payload?.data;
        },
        [advisorRequestsCompleteIntentPayment.fulfilled]: (state, {payload}) => {
            state.advisorRequestCompletePaymentResponse = camelizeNestedKeys(payload.data);
            state.isPayUsingIntentSuccess = true;
            state.errorMessage = null;
        },
        [advisorRequestsCompleteIntentPayment.rejected]: (state, {payload}) => {
            state.isPayUsingIntentError = true;
            state.errorMessage = payload?.data;
        },
        [deleteItinerary.fulfilled]: (state) => {
            state.isDeletedSuccess = true;
            state.errorMessage = null;
        },
        [deleteItinerary.rejected]: (state, {payload}) => {
            state.isDeletedError = false
            state.errorMessage = payload?.data;
        },
        [deleteItineraryPassenger.fulfilled]: (state) => {
            state.isPassengerDeletedSuccess = true;
            state.errorMessage = null;
        },
        [deleteItineraryPassenger.rejected]: (state, {payload}) => {
            state.isPassengerDeletedError = true
            state.errorMessage = payload?.data;
        },
        [fetchItinerary.fulfilled]: (state, {payload}) => {
            state.itinerary = camelizeNestedKeys(payload.data);
            state.isFetching = false;
            state.isSuccess = true;
        },
        [fetchItinerary.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchItinerary.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
        [fetchSharedItinerary.fulfilled]: (state, {payload}) => {
            state.itinerary = camelizeNestedKeys(payload.data);
            state.isFetching = false;
            state.isSuccess = true;
        },
        [fetchSharedItinerary.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchSharedItinerary.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
        [getItineraryPassengers.fulfilled]: (state, {payload}) => {
            state.passengers = camelizeNestedKeys(payload.data);
            state.itineraryPassengersIsFetching = false;
            state.itineraryPassengersIsSuccess = true;
        },
        [getItineraryPassengers.pending]: (state) => {
            state.itineraryPassengersIsFetching = true;
        },
        [getItineraryPassengers.rejected]: (state) => {
            state.itineraryPassengersIsFetching = false;
        },
        [getPropertyDesigns.fulfilled]: (state, {payload}) => {
            state.propertyDesigns = camelizeNestedKeys(payload.data);
            state.propertyDesignsIsFetching = false;
            state.propertyDesignsIsSuccess = true;
        },
        [getPropertyDesigns.pending]: (state) => {
            state.propertyDesignsIsFetching = true;
        },
        [getPropertyDesigns.rejected]: (state) => {
            state.propertyDesignsIsFetching = false;
        },
        [addItineraryPassenger.fulfilled]: (state) => {
            state.isItineraryUpdated = true;
            state.isItineraryUpdatedError = false;
        },
        [addItineraryPassenger.rejected]: (state, {payload}) => {
            state.isItineraryUpdated = false;
            state.isItineraryUpdatedError = true;
            state.errorMessage = payload?.data;
        },
        [updateItineraryAbstract.fulfilled]: (state) => {
            state.isItineraryUpdated = true;
            state.isItineraryUpdatedError = false;
        },
        [updateItineraryAbstract.rejected]: (state, {payload}) => {
            state.isItineraryUpdated = false;
            state.errorMessage = payload?.data;
            state.isItineraryUpdatedError = true;
        },
        [updateItineraryInformation.fulfilled]: (state) => {
            state.isItineraryUpdated = true;
            state.isItineraryUpdatedError = false;
        },
        [updateItineraryInformation.rejected]: (state, {payload}) => {
            state.isItineraryUpdated = false;
            state.errorMessage = payload?.data;
            state.isItineraryUpdatedError = true;
        },
        [cloneItineraryInformation.fulfilled]: (state, {payload}) => {
            // if (state.itineraries) {
            //     console.log(current(state.itineraries))
            //     state.itineraries = {
            //         ...state.itineraries,
            //         data: [
            //             ...state.itineraries.data,
            //             ...[camelizeNestedKeys(payload.data)]
            //         ],
            //         recordsFiltered: state.itineraries.recordFilterd + 1,
            //         recordsTotal: state.itineraries.recordsTotal + 1
            //     };
            // } else {
            //     state.itineraries = [camelizeNestedKeys(payload.data)]
            // }
            state.isItineraryCloned = true;
            state.isItineraryClonedError = false;
        },
        [cloneItineraryInformation.rejected]: (state, {payload}) => {
            state.isItineraryCloned = false;
            state.errorMessage = payload?.data;
            state.isItineraryClonedError = true;
        },
        [updateItineraryPassenger.fulfilled]: (state) => {
            state.isItineraryUpdated = true;
            state.isItineraryUpdatedError = false;
        },
        [updateItineraryPassenger.rejected]: (state, {payload}) => {
            state.isItineraryUpdated = false;
            state.isItineraryUpdatedError = true;
            state.errorMessage = payload?.data;
        },
    }
});

export const {
    clearState,
    clearDelete,
    setPage,
    setStart,
    setBookings,
    clearItineraryBookingPositionFlags,
    setItineraryId,
    setAdvisorRequestType,
    clearPassengerDeleted,
    clearItineraryPassengersSuccess,
    clearItineraryUpdated,
    clearItineraryCloned,
    clearShareCode,
    clearStripeKey,
    clearAdvisorId
} = itinerariesSlice.actions;

export const itinerariesSelector = (state) => state.itinerary;
export const itineraryPassengersSelector = (state) => state.itinerary.passengers;

export default itinerariesSlice.reducer;
