import styled from "styled-components";
import {ItineraryDetailsContainer} from "../ItineraryDetailsContainer";
import {ItineraryDetailTitle} from "../ItineraryDetailTitle";
import {colors} from "styles/colors";
import {StyledButton} from "@core/components";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {Text} from "../Text";
import Row from "./Row";
import Emails from "./Emails";
import Travelers from "./Travelers";
import Information from "./Information";
import {useDispatch} from "react-redux";
import {
    setEdit,
    setEditItineraryInformationOpen, setEditItineraryTravelersOpen
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {getItineraryPassengers} from "redux/features/itineraries/itinerariesSlice";
import {setEditTab} from "redux/features/dialogForms/itineraryFormSlice";
import {setBookingCategory} from "../../../../redux/features/dialogForms/bookingFormSlice";
import { formatPhoneNumberIntl } from 'react-phone-number-input'


const ItineraryInformationContainer = styled(ItineraryDetailsContainer)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 20px;
  background-color: white;
  width: 600px;

  & > div:not(:first-child) {
    margin-top: 30px;
  }
`;

export const Title = styled(ItineraryDetailTitle)`
  font-size: 24px;
  color: ${colors.brand};
`;

const MainInformation = styled.div`
  & > div:not(:first-child) {
    margin-top: 20px;
  }
`;

const TravelersInformation = styled(MainInformation)`
`;

const ItineraryInformation = ({client, travelers, totalPrice, clientEmails, clientPhone, id}) => {

    // var travelerNumber = 0;
    // if (travelers) {
    //     travelerNumber = travelers.length;
    // }

    // var totalPrice_info = totalPrice;

    // if (totalPrice > 1000000) {
    //     totalPrice_info = parseInt(totalPrice/1000000) + 'M+';
    // } else if (totalPrice > 1000) {
    //     totalPrice_info = parseInt(totalPrice/1000) + 'K+';
    // } else {
    //     totalPrice_info = totalPrice;
    // }

    // const days = 0; 

    const dispatch = useDispatch();

    const handleOpenEditItineraryInformation = () => {
        dispatch(setBookingCategory(null));
        dispatch(setEditTab('editItineraryInformation'));
        dispatch(setEdit(true));
        dispatch(setEditItineraryInformationOpen(true));
    };

    const handleOpenEditItineraryTravelers = () => {
        dispatch(setBookingCategory(null));
        dispatch(setEditTab('editItineraryTravelers'));
        dispatch(setEdit(true));
        dispatch(getItineraryPassengers(id));
        dispatch(setEditItineraryTravelersOpen(true));
    };

    return (
        <ItineraryInformationContainer>
            <React.Fragment>
                <MainInformation>
                    <Row style={{justifyContent: 'space-between'}}>
                        <Title>Main Information</Title>
                        <StyledButton onClick={handleOpenEditItineraryInformation} $borderbottom
                                      $fontsize="14px">Edit</StyledButton>
                    </Row>
                    <Information>
                        <Row ml="48px">
                            <Typography variant="body2" component="span">Client Name:</Typography>
                            <Text variant="body2" component="span">{client}</Text>
                        </Row>
                        <Row ml="45px">
                            <Typography variant="body2" component="span">Phone:</Typography>
                            <Text variant="body2" component="span">{formatPhoneNumberIntl(clientPhone) || 'Not provided'}</Text>
                        </Row>
                        <Emails clientEmails={clientEmails}/>
                    </Information>
                </MainInformation>
                <TravelersInformation>
                    <Row style={{justifyContent: 'space-between'}}>
                        <Title>Travelers</Title>
                        <StyledButton onClick={handleOpenEditItineraryTravelers} $borderbottom $fontsize="14px">Add
                            Travelers</StyledButton>
                    </Row>
                    <Travelers itineraryPassengers={travelers}/>
                </TravelersInformation>
                {/* <ItineraryPrice                           
                    total={totalPrice_info}
                    persons={travelerNumber}
                    days={days}
                /> */}
            </React.Fragment>
        </ItineraryInformationContainer>
    );
}

export default ItineraryInformation;