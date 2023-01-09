import React, {useEffect} from "react";
import ItinerariesDetailHeader from "./ItineraryDetails/ItineraryDetailsHeader";
import styled from "styled-components";
import ItineraryInformation from "./ItineraryInformation/ItineraryInformation";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    clearItineraryUpdated,
    fetchPackedItinerary,
    itinerariesSelector,
    setItineraryId
} from "redux/features/itineraries/itinerariesSlice";
import {Loading} from "@core/components";
import Details from "./ItineraryDetails/Details";
import {bookingsSelector} from "redux/features/itineraries/bookings/bookingsSlice";
import {getShareCode} from "../../../redux/features/shareCode/shareCodeSlice";
import HireAdvisor from "./HireAdvisor/HireAdvisor";


export const DetailsWrapper = styled.div`
  padding: 30px;
`;

export const DetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItineraryDetails = () => {
    let {id} = useParams();
    const dispatch = useDispatch();
    const {isFetching, packedItinerary, isSuccess, isItineraryUpdated} = useSelector(itinerariesSelector);
    const {isDeletedSuccess, isUpdated} = useSelector(bookingsSelector);

    const bookingAddedSuccessfully = useSelector(state => state.bookings.isSuccess);
    const {
        client,
        title,
        abstractNote,
        startDate,
        endDate,
        travelers,
        totalPrice,
        clientEmails,
        clientPhone,
        itineraryTheme,
    } = packedItinerary || {};

    const {hideAbstract} = itineraryTheme || {};

    useEffect(() => {
        dispatch(clearItineraryUpdated());
        dispatch(fetchPackedItinerary(id));
        dispatch(setItineraryId(parseInt(id)));
        dispatch(getShareCode(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, isDeletedSuccess, bookingAddedSuccessfully, isSuccess, isUpdated, isItineraryUpdated]);

    

    return (
        <DetailsWrapper>
            <Loading data-aos="fade-down" isFetching={isFetching}>
                {packedItinerary &&
                <React.Fragment>
                    <ItinerariesDetailHeader title={title}/>
                    <DetailsContainer>
                        <Details
                            hideAbstract={hideAbstract}
                            endDate={endDate}
                            startDate={startDate}
                            client={client}
                            abstractNote={abstractNote}
                        />
                        <ItineraryInformation
                            clientPhone={clientPhone}
                            clientEmails={clientEmails}
                            totalPrice={totalPrice}
                            client={client}
                            travelers={travelers}
                            id={id}
                        />
                    </DetailsContainer>
                    <HireAdvisor id={id} />
                </React.Fragment>
                }
            </Loading>
        </DetailsWrapper>
    );
}

export default ItineraryDetails;
