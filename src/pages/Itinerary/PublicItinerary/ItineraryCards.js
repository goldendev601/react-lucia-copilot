import React from "react";
import styled from "styled-components";
import {makeStyles} from "@material-ui/core/styles";
import cardSelector from "./Cards/cardSelector";
import moment from "moment";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ItineraryCardsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ItineraryDate = styled.div`
  margin: 50px 0;
`;

const ItineraryHeader = styled.div`
    font-size: 32px;
    line-height: 50px;
    font-weight: 600;
    color: #BA886E;
    font-family: 'Cormorant';
    margin-left: 75px;
`;

const ItineraryCardsSpacing = styled.div`
  & > div {
    margin-bottom: 50px;
  }
`;

const useStyles = makeStyles({
    selectedDot: {
        width: '10px',
        height: '10px',
        borderRadius: '10px',
        background: '#BA886E',
        margin: '0px 3px',
        display: 'inline-block'
    },
    dot: {
        width: '10px',
        height: '10px',
        borderRadius: '10px',
        background: '#828282',
        margin: '0px 3px',
        display: 'inline-block'
    },
    carouselContainer: {
        '& .carousel-slider': {
            overflow: 'inherit'
        },
        '& .control-dots': {
            textAlign: 'left',
            bottom: '-45px',
            marginLeft: '75px'
        },
        '& .control-dots > div:only-child': {
            display: 'none'
        },
        '& .slide': {
            // minWidth: '50% !important',
            width: '50% !important',
        }  
    }
});


const ItineraryCards = ({bookings, showPriceOnShare, itineraryPropertyDesignId}) => {
    const classes = useStyles();
    return (
        <ItineraryCardsContainer id='#itinerary'>
            <ItineraryCardsSpacing>
                {bookings && Object.keys(bookings).map((date) => 
                    <div id={`#booking${date}`} key={date}>
                        <ItineraryDate>
                            {bookings[date].length !== 0 &&
                            <ItineraryHeader>
                                {moment(date).format("dddd, MMMM D")}
                            </ItineraryHeader>}
                        </ItineraryDate>
                        {bookings[date].filter((booking) => ['Hotel', 'Flight', 'Cruise'].indexOf(booking.category) >= 0).map((booking, index) =>
                            <ItineraryCardsSpacing key={index}>
                                {cardSelector(booking.category, booking, showPriceOnShare, itineraryPropertyDesignId)}
                            </ItineraryCardsSpacing>
                        )}
                        {bookings[date].filter((booking) => ['Hotel', 'Flight', 'Cruise'].indexOf(booking.category) === -1).length > 0 && (
                            <div className={classes.carouselContainer}>
                            <Carousel
                                centerMode
                                infiniteLoop={false}
                                showStatus={false}
                                showArrows={false}
                                centerSlidePercentage={50}
                                renderIndicator={
                                    (clickHandler, isSelected, index, label) => (
                                        <div key={index} className={isSelected ? classes.selectedDot : classes.dot} onClick={clickHandler}></div>
                                    )
                                }
                            >
                                {bookings[date].filter((booking) => ['Hotel', 'Flight', 'Cruise'].indexOf(booking.category) < 0).map((booking, index) =>
                                    (cardSelector(booking.category, booking, showPriceOnShare, itineraryPropertyDesignId))
                                )}
                            </Carousel>
                            </div>
                        )}
                    </div>
                )}
            </ItineraryCardsSpacing>
        </ItineraryCardsContainer>
    );
}

export default ItineraryCards;