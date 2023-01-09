import React from "react";
import styled from "styled-components";
import {ItineraryDetailsContainer} from "../ItineraryDetailsContainer";
import {ItineraryDetailTitle} from "../ItineraryDetailTitle";
import {Typography} from "@material-ui/core";
import {StyledButton} from "@core/components";
import Row from "../ItineraryInformation/Row";
import {setEdit, setEditItineraryAbstractOpen} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {useDispatch} from "react-redux";
import {setEditTab} from "redux/features/dialogForms/itineraryFormSlice";
import {setBookingCategory} from "../../../../redux/features/dialogForms/bookingFormSlice";

export const AbstractContainer = styled(ItineraryDetailsContainer)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 20px;
  background-color: white;
  width: 100%;
`;

const Abstract = ({text, children, ...props}) => {
    const dispatch = useDispatch();

    const handleOpenEditItineraryAbstract = () => {
        dispatch(setEdit(true));
        dispatch(setBookingCategory(null));
        dispatch(setEditItineraryAbstractOpen(true));
        dispatch(setEditTab('editItineraryAbstract'));
    };

    return (
        <AbstractContainer {...props}>
            <Row style={{justifyContent: 'space-between'}}>
                <ItineraryDetailTitle>Abstract</ItineraryDetailTitle>
                <StyledButton onClick={handleOpenEditItineraryAbstract} $borderbottom $fontsize="14px">Edit</StyledButton>
            </Row>
            {/* <Text style={{marginTop: '20px'}}>{children || text}</Text> */}
            {text && <Typography component="span" dangerouslySetInnerHTML={{__html: text}} />} 
        </AbstractContainer>
    );
}

export default Abstract