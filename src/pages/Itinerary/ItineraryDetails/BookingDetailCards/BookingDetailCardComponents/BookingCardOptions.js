import React, {useState} from "react";
import {IconButton} from "@material-ui/core";
import {EditPencil, Trash} from "iconoir-react";
import {colors} from "styles/colors";
import {useDispatch, useSelector} from "react-redux";
import {AlertDialog, NotificationHandler} from "@core/components";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import {
    bookingsSelector,
    clearState,
    deleteItineraryBooking, getHotelAmenities,
    getItineraryBooking, getItineraryBookingPassengers,
    getItineraryBookingSegments
} from "redux/features/itineraries/bookings/bookingsSlice";
import {setBookingCategory} from "redux/features/dialogForms/bookingFormSlice";
import {setBookingFormOpen, setEdit} from "redux/features/dialogForms/dialogFormsOpenStateSlice";

const BookingCardOptionsContainer = styled.div`
//   position: absolute;
//   right: 0;
`;

const BookingCardOptionsIconContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
`

const BookingCardOptions = ({categoryBookingId, category}) => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const [openAlert, setOpenAlert] = useState(false);

    const bookingsThatHasPassengers = ['hotels', 'cruises', 'flights', 'transports'];
    const bookingsThatHasSegments = ['flights'];
    const bookingsThatHasAmenities = ['hotels'];

    const {isDeletedSuccess, isDeletedError, errorMessage} = useSelector(bookingsSelector);

    const handleOpenAlert = () => setOpenAlert(prevState => !prevState);

    const bookingCategorySwitch = (category) => {
        switch (category) {
            case 'Hotel':
                return 'hotels'
            case 'Flight':
                return 'flights'
            case 'Cruise':
                return 'cruises'
            case 'Other Notes':
                return 'others'
            case 'Concierge':
                return 'concierges'
            case 'Tour Activity':
                return 'tours'
            case 'Insurance':
                return 'insurances'
            case 'Transportation':
                return 'transports'
            default:
                return null
        }
    }

    const deleteSelectedItineraryBooking = () => {
        const apiPayload = {
            bookingId: categoryBookingId,
            itineraryId: id,
            bookingCategory: bookingCategorySwitch(category)
        }
        dispatch(deleteItineraryBooking(apiPayload));
        handleOpenAlert();
    }

    const editBooking = () => {
        dispatch(setBookingCategory(bookingCategorySwitch(category)));
        dispatch(setEdit(true));
        dispatch(setBookingFormOpen(true));
        const apiPayload = {
            itineraryId: id,
            bookingId: categoryBookingId,
            bookingCategory: bookingCategorySwitch(category),
        }
        dispatch(getItineraryBooking(apiPayload));
        if (bookingsThatHasPassengers.some(word => bookingCategorySwitch(category).includes(word))) {
            dispatch(getItineraryBookingPassengers(apiPayload));
        }
        if (bookingsThatHasAmenities.some(word => bookingCategorySwitch(category).includes(word))) {
            dispatch(getHotelAmenities(apiPayload));
        }
        if (bookingsThatHasSegments.some(word => bookingCategorySwitch(category).includes(word))) {
            dispatch(getItineraryBookingSegments(apiPayload));
        }
    }

    return (
        <BookingCardOptionsContainer>
            <NotificationHandler
                clearState={clearState}
                isSuccess={isDeletedSuccess}
                isError={isDeletedError}
                errorMessage={errorMessage}
                successMessage="Itinerary Booking is successfully deleted"
            >
                <AlertDialog
                    open={openAlert}
                    handleClose={handleOpenAlert}
                    handleClick={deleteSelectedItineraryBooking}
                    type="remove"
                />
                <BookingCardOptionsIconContainer>
                    <IconButton
                        color="secondary"
                        aria-label="edit-action"
                        onClick={editBooking}
                    >
                        <EditPencil width="25px" height="25px" color={colors.brand} />
                    </IconButton>
                    <IconButton
                        color="secondary"
                        aria-label="delete-action"
                        onClick={handleOpenAlert}
                    >
                        <Trash width="25px" height="25px" color={colors.brand} />
                    </IconButton>
                </BookingCardOptionsIconContainer>
            </NotificationHandler>
        </BookingCardOptionsContainer>
    );
};

export default React.memo(BookingCardOptions);
