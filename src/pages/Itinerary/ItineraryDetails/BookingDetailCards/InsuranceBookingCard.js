import React from "react";
import {Text} from "../Text";
import BookingTitle from "./BookingDetailCardComponents/BookingTitle";
import BookingGeneralInformation from "./BookingDetailCardComponents/BookingGeneralInformation";
import {Grid, useMediaQuery, useTheme} from "@material-ui/core";
import GridSpacing from "./BookingDetailCardComponents/GridSpacing";
import BookingCard from "./BookingDetailCardComponents/BookingCard";
import BookingCardOptions from "./BookingDetailCardComponents/BookingCardOptions";
import {BookingCardHeader} from "./BookingDetailCardComponents/BookingCardHeader";
import BookingCardHeaderContent from "./BookingDetailCardComponents/BookingCardHeaderContent";
import {Draggable} from "./BookingDetailCardComponents/Draggable";
import { formatPhoneNumberIntl } from 'react-phone-number-input';

const InsuranceBookingCard = ({booking, dragHandleProps, ...rest}) => {
    const {
        categoryBookingId,
        title,
        address,
        phone,
        effectiveDate,
        category,
    } = booking;

    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
        defaultMatches: true
    });

    const option = {
        day : '2-digit',
        month : '2-digit',
        year : 'numeric'
    }

    return (
        <BookingCard {...rest}>
            <BookingCardHeader>
                <Draggable dragHandleProps={dragHandleProps}/>
                <BookingCardHeaderContent>
                    <BookingTitle>{title}</BookingTitle>
                    <BookingCardOptions category={category} categoryBookingId={categoryBookingId}/>
                </BookingCardHeaderContent>
            </BookingCardHeader>
            <Text mb="10px">{address}</Text>
            <Text mb="20px">{formatPhoneNumberIntl(phone)}</Text>
            <BookingGeneralInformation>
                    <GridSpacing>
                        <Grid container spacing={isMobile ? 2 : 6}>
                            <Grid item>
                                <Text bold>Effective Date:</Text>
                            </Grid>
                            <Grid item>
                                <Text>{new Date(effectiveDate).toLocaleDateString('en-US', option)}</Text>
                            </Grid>
                        </Grid>
                    </GridSpacing>
            </BookingGeneralInformation>
        </BookingCard>
    );
}

export default InsuranceBookingCard;
