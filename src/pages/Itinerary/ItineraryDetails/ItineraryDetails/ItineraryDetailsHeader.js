import React, {useEffect, useState} from "react";
import {Typography} from "@material-ui/core";
import {Button} from "@core/components";
import {makeStyles} from "@material-ui/core/styles";
import {Computer, NavArrowLeft, ShareAndroid } from "iconoir-react";
import {colors} from "styles/colors";
import styled from "styled-components";
import {useHistory, useParams} from "react-router-dom";
import {setCategoryFormOpen, setEdit} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {useDispatch, useSelector} from "react-redux";
import {ShareItineraryDialog} from "@core/components";
import {clearShareCode, getShareCode, shareCodeSelector} from "../../../../redux/features/shareCode/shareCodeSlice";

export const HeaderActions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 1000px) {
    justify-content: center;
    flex-direction: column;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
  @media (max-width: 1000px) {
    margin: 0 auto 30px auto;
  }
`;

export const ItineraryTitle = styled.div`
  @media (max-width: 1000px) {
    margin: 0 auto;
  }
`;

const useStyles = makeStyles({
    headerTypography: {
        fontSize: '40px',
        color: '#242424',
        margin: '0 0 30px 0',
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    shareButton: {
        margin: '0 20px 0 0'
    },
    hireTripKit: {
        margin: '0 20px 0 0'
    },
    hireAdvisor: {
        width: '200px !important',
        margin: '0 20px 0 0'
    }
});

const ItineraryDetailsHeader = ({title}) => {
    const classes = useStyles();
    let {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [shareItineraryOpen, setShareItineraryOpen] = useState(false);
    const [previewItineraryStatus, setPreviewItineraryStatus] = useState(false);

    const {shareCode} = useSelector(shareCodeSelector);

    const handleShareItinerary = () => {
        setShareItineraryOpen(prevState => !prevState);
        dispatch(clearShareCode());
    };

    const previewItinerary = () => setPreviewItineraryStatus(true);

    useEffect(() => {
        if (previewItineraryStatus) {
            if (shareCode) {
                history.push(`/public/itinerary/${shareCode}`);
            } else {
                dispatch(getShareCode(id));
            }
        }
    }, [dispatch, history, id, previewItineraryStatus, shareCode]);

    const returnToItineraries = () => history.push('/itineraries');

    const addNewBooking = () => {
        dispatch(setEdit(false));
        dispatch(setCategoryFormOpen(true));
    }

    return (
        <React.Fragment>
            {shareItineraryOpen &&
            <ShareItineraryDialog handleShareItinerary={handleShareItinerary} shareItineraryOpen={shareItineraryOpen}/>}
            <HeaderActions>
                <ItineraryTitle>
                    <Typography
                        className={classes.headerTypography}
                        variant="h2"
                        component="h2"
                    >
                        {title}
                        <NavArrowLeft onClick={returnToItineraries} style={{marginRight: '10px', cursor: 'pointer'}}
                                      color={colors.black1} width="30px"/>
                    </Typography>
                </ItineraryTitle>
                <ButtonsContainer>
                    <Button
                        transparent={true}
                        onClick={previewItinerary}
                        iconstart={<Computer width={'22px'}/>}
                    >
                        Preview
                    </Button>
                    <Button
                        transparent={true}
                        onClick={handleShareItinerary}
                        iconstart={<ShareAndroid width={'22px'}/>}
                        className={classes.shareButton}
                    >
                        Share
                    </Button>
                    {/* <Button
                        transparent={true}                        
                        href={`mailto:${process.env.REACT_APP_MAIL_TO}`}
                        iconstart={<Check width={'22px'}/>}
                        className={classes.hireTripKit}
                    >
                        Hire TripKit
                    </Button> */}
                    {/* <Button
                        transparent={true}
                        onClick={handleHireAdvisor}
                        iconstart={<Language width={'22px'}/>}
                        className={classes.hireAdvisor}
                    >
                        Hire Concierge
                    </Button> */}
                   
                    <Button
                        $primary
                        onClick={addNewBooking}
                    >
                        Add Booking
                    </Button>
                </ButtonsContainer>
            </HeaderActions>
        </React.Fragment>
    );
}

export default React.memo(ItineraryDetailsHeader);
