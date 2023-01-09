import React from 'react';
import Card from '@material-ui/core/Card';
import CardPicture from "./CardComponents/CardPicture";
import CardContent from "./CardComponents/CardContent";
import CardNote from "./CardComponents/CardNote";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import GenericImage from '../../../../assets/generic-image.jpg';

const ImagesContainer = styled.div`
    height: 300px;    
`


const useStyles = makeStyles({
    cardcontentDiv: {
        textAlign: 'left'
    },
    cardTitle: {
        color: '#BA886E',
        fontSize: '32px',
        fontFamily: 'Cormorant',
        fontStyle: 'normal',        
    },
    cardTitleDiv: {
        textAlign: 'left'
    },
    cardPhoneAddress: {
        color: '#242424',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        fontSize: '14px',
        padding: '10px 0px 10px 0px',
        fontWweight: 'normal',
        lineHeight: '24px',
    },
    cardPhoneAddressDiv: {
        textAlign: 'left'
    },
    sliderContainer: {
        '& .control-dots': {
            bottom: '20px !important'
        },
        '& .control-dots > div:only-child': {
            display: 'none'
        }
    },
    sliderImage: {
        width: '100%',
        height: '300px',
        overflow: 'hidden',
        '& img': {
            minWidth: '100%',
            minHeight: '100%',
            objectFit: 'cover'
        }
    },
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
        background: '#FBF8F3',
        margin: '0px 3px',
        display: 'inline-block'
    },
});

const TransportCard = ({booking, showPriceOnShare, ...rest}) => {
    const {
        customHeaderTitle,
        notes,
        address,
        phone,
        pictures,
    } = booking;


    const classes = useStyles()

    return (
        <Card {...rest} style={{borderRadius: '0px', maxWidth: 'unset', marginLeft: '75px', marginBottom: '20px'}}>
            {/* <CardPicture firstPicture={pictures[0]}/> */}
            <ImagesContainer className={classes.sliderContainer}>
            {typeof pictures !== 'undefined' && pictures.length > 0 ?
                    (
                        <Carousel
                            autoPlay
                            height="300px"
                            width="100%"
                            showArrows={false}
                            showStatus={false}
                            showThumbs={false}
                            dynamicHeight={false}
                            renderIndicator={
                                (clickHandler, isSelected, index, label) => (
                                    <div key={index} className={isSelected ? classes.selectedDot : classes.dot} onClick={clickHandler}></div>
                                )
                            }
                        >
                            {pictures.map((img, index) => (
                                <div key={index} className={classes.sliderImage}>
                                    <img alt="" src={img} />
                                </div>
                            ))}
                        </Carousel>
                    ) : (
                        <CardPicture firstPicture={GenericImage}/>
                    )
                }
            </ImagesContainer>
            <CardContent>
                <div className={classes.cardTitleDiv}>
                    <Typography variant="h3" component="h3" className={classes.cardTitle}>
                        {customHeaderTitle}
                    </Typography>
                </div>
                {
                    notes !== "" && (
                        <CardNote notes={notes}/>
                    )
                }
                <div className={classes.cardPhoneAddressDiv}>
                    <Typography variant="h5" component="h5" className={classes.cardPhoneAddress}>
                        {address}{address && phone && ','} {phone}
                    </Typography>
                </div>
            </CardContent>
        </Card>
       
    );
}

export default TransportCard;
