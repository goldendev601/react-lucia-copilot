import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    globalSearchOpen: false,
    pictureUploadOpen: false,
    roomPictureUploadOpen: false,
    itineraryMultiFormOpen: false,
    travelerMultiFormOpen: false,
    categoryFormOpen: false,
    bookingFormOpen: false,
    confirmOfferFormOpen: false,
    connectStripeFormOpen: false,
    suppliersFormOpen: false,
    editItineraryAbstractOpen: false,
    editItineraryInformationOpen: false,
    editItineraryTravelersOpen: false,
    edit: false,
    editPicture: {
        id: null,
        index: null
    }
}

const dialogFormsOpenStateSlice = createSlice({
    name: 'dialogFormsOpenState',
    initialState,
    reducers: {
        setGlobalSearchOpen(state, {payload}) {
            state.globalSearchOpen = payload;
        },
        setItineraryFormOpen(state, {payload}) {
            state.itineraryMultiFormOpen = payload;
        },
        setTravelerFormOpen(state, {payload}) {
            state.travelerMultiFormOpen = payload;
        },
        setPictureUploadOpen(state, {payload}) {
            state.pictureUploadOpen = payload;
        },
        setRoomPictureUploadOpen(state, {payload}) {
            state.roomPictureUploadOpen = payload;
        },
        setEditPictureInfo(state, {payload}) {
            state.editPicture=payload
        },
        setCategoryFormOpen(state, {payload}) {
            state.categoryFormOpen = payload;
        },
        setBookingFormOpen(state, {payload}) {
            state.bookingFormOpen = payload;
        },
        setConfirmOfferFormOpen(state, {payload}) {
            state.confirmOfferFormOpen = payload;
        },
        setConnectStripeFormOpen(state, {payload}) {
            state.connectStripeFormOpen = payload;
        },
        setEdit(state, {payload}) {
            state.edit = payload;
        },
        setSuppliersFormOpen(state, {payload}) {
            state.suppliersFormOpen = payload;
        },
        setEditItineraryAbstractOpen(state, {payload}) {
            state.editItineraryAbstractOpen = payload;
        },
        setEditItineraryInformationOpen(state, {payload}) {
            state.editItineraryInformationOpen = payload;
        },
        setEditItineraryTravelersOpen(state, {payload}) {
            state.editItineraryTravelersOpen = payload;
        },
        closeAllDialogForms: () => initialState,
    },
});

export const {
    setGlobalSearchOpen,
    setPictureUploadOpen,
    setRoomPictureUploadOpen,
    setItineraryFormOpen,
    setTravelerFormOpen,
    setCategoryFormOpen,
    setBookingFormOpen,
    setConfirmOfferFormOpen,
    setConnectStripeFormOpen,
    setEdit,
    closeAllDialogForms,
    setSuppliersFormOpen,
    setEditItineraryInformationOpen,
    setEditItineraryTravelersOpen,
    setEditItineraryAbstractOpen,
    setEditPictureInfo
} = dialogFormsOpenStateSlice.actions;

export const dialogFormsStateSelector = (state) => state.dialogFormsOpenState;

export default dialogFormsOpenStateSlice.reducer;
