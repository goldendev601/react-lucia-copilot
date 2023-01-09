import React, {useEffect} from "react";
import styled from "styled-components";
import {ItineraryDetailsContainer} from "../ItineraryDetailsContainer";
import {ItineraryDetailTitle} from "../ItineraryDetailTitle";
import bookingCardSelector from "../BookingDetailCards/bookingCardSelector";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {useDispatch, useSelector} from "react-redux";
import {
    clearItineraryBookingPositionFlags,
    itinerariesSelector,
    setBookings,
    updateItineraryBookingPosition
} from "redux/features/itineraries/itinerariesSlice";
import {createErrorMessage} from "utils";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar';
import BookingDate from "../BookingDetailCards/BookingDetailCardComponents/BookingDate";
import moment from "moment";
import {Border} from "../BookingDetailCards/BookingDetailCardComponents/BorderTop";
import IconButton from "@material-ui/core/IconButton";
import {Plus} from "iconoir-react";
import {colors} from "styles/colors";
import {setCategoryFormOpen} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {setStartDate} from "redux/features/itineraries/bookings/bookingsSlice";

const ItineraryDetailsTitle = styled(ItineraryDetailTitle)`
  margin-bottom: 60px;
`;

const BookingsListContainer = styled(ItineraryDetailsContainer)`
`;

const BookingsList = () => {
    const dispatch = useDispatch();
    const {packedItinerary} = useSelector(itinerariesSelector);

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const {
        itineraryId,
        isItineraryBookingPositionSuccess,
        isItineraryBookingPositionError,
        errorMessage
    } = useSelector(itinerariesSelector);

    const onDragEnd = (result) => {
        const formData = new FormData();
        const {destination, source} = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const bookingItems = {...packedItinerary.bookings};

        const sourceBookings = [...bookingItems[source.droppableId]];

        const destinationBookings = [...bookingItems[destination.droppableId]];

        const [reorderedItem] = sourceBookings.splice(source.index, 1);

        destinationBookings.splice(destination.index, 0, reorderedItem);

        console.log(
            {
                dateSource: source.droppableId,
                dateDestination: destination.droppableId,
                sourceBookings: sourceBookings,
                destinationBookings: destinationBookings,
            }
        )

        dispatch(setBookings({
            dateSource: source.droppableId,
            dateDestination: destination.droppableId,
            sourceBookings: sourceBookings,
            destinationBookings: destinationBookings,
        }));

        const {categoryBookingId, bookingCategoryId} = reorderedItem || {};

        formData.append("category_booking_id", categoryBookingId);
        formData.append("booking_category_id", bookingCategoryId);
        formData.append("start_date", destination.droppableId);
        formData.append("detailed", true);
        formData.append("packed_booking", true);
        formData.append("shared_view", true);

        dispatch(updateItineraryBookingPosition({
            itineraryId: itineraryId,
            formData: formData,
        }));
    };

    const addBooking = (startDate) => {
        dispatch(setCategoryFormOpen(true));
        dispatch(setStartDate(startDate));
    }

    useEffect(() => {
        if (isItineraryBookingPositionError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearItineraryBookingPositionFlags());
        }

        if (isItineraryBookingPositionSuccess) {
            openSnackbarSuccess('Booking is successfully shifted to new date');
            dispatch(clearItineraryBookingPositionFlags());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isItineraryBookingPositionError, isItineraryBookingPositionSuccess]);

    return (
        <BookingsListContainer>
            <ItineraryDetailsTitle>Itinerary</ItineraryDetailsTitle>
            <DragDropContext onDragEnd={onDragEnd}>
                {packedItinerary?.bookings && Object.keys(packedItinerary.bookings).map((date) => (
                    <div key={date}>
                        <BookingDate
                            style={{paddingLeft: '25px'}}>{moment(date)?.format("dddd, MMMM D, YYYY")}
                            <IconButton onClick={() => addBooking(date)} style={{padding: '0'}}>
                                <Plus color={colors.brand} width="25px" height="25px"/>
                                <span style={{fontSize: '14px'}} className="span-small">Add booking</span>
                            </IconButton>
                        </BookingDate>
                        <Border/>
                        <Droppable droppableId={date}>
                            {(provided) =>
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {packedItinerary.bookings[date].map((booking, index) => {
                                            return <Draggable key={booking.guid} draggableId={booking.guid} index={index}>
                                                {(provided) =>
                                                    <div ref={provided.innerRef} {...provided.draggableProps}>
                                                        {bookingCardSelector(booking.category, booking, provided, date)}
                                                    </div>
                                                }
                                            </Draggable>
                                        }
                                    )}
                                    {provided.placeholder}
                                </div>
                            }
                        </Droppable>
                    </div>
                ))}
            </DragDropContext>
        </BookingsListContainer>
    );
}

export default BookingsList;
