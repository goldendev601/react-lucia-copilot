import React, {useEffect, useState} from "react";
import {Dialog, Typography} from '@material-ui/core'
import {Button} from "@core/components";
import { clearState, profileSelector, createStripe } from "redux/features/profile/profileSlice";
import {useDispatch, useSelector} from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { addItineraryStyles } from "styles";
import {setConnectStripeFormOpen} from "redux/features/dialogForms/dialogFormsOpenStateSlice";


const ConnectStripe = ({...props}) => {
    const classes = addItineraryStyles();
    const dispatch = useDispatch();
    const history = useHistory()

    const { stripeUrl } = useSelector(profileSelector);


    const connectStripeClick = () => {
        dispatch(createStripe())  
        dispatch(clearState())           
        dispatch(setConnectStripeFormOpen(false));
    }

    useEffect(() => {
        if (stripeUrl) {
            window.open(stripeUrl);
        }
    }, [stripeUrl]);

    useEffect(() => {
        dispatch(clearState());
    }, []);

    const handleClose = () => {
        dispatch(clearState());
        dispatch(setConnectStripeFormOpen(false));
    }

    return (
        <Dialog open={props.open} onClose={handleClose}>
            <div className={classes.modalStripeMainWrapper}> 
                <div className={classes.modalTitleInfoWrapper}>
                    <Typography className={classes.modalTitleInfo}>Connect Stripe</Typography>
                </div>
                <div className={classes.modalStripeDescriptionWrapper}>
                    <Typography className={classes.modalStripeDescription}>
                        Connecting your Lucia account with your Stripe
                    </Typography>
                    <Typography className={classes.modalStripeDescription}>
                        account will allow to receive payments for you when
                    </Typography>
                    <Typography className={classes.modalStripeDescription}>
                        your clients pay for your completed tasks.
                    </Typography>
                </div>
                <Typography className={classes.modalStripeNote} style={{marginTop: '50px'}}>
                    By selecting “Continue” you agree to the 
                </Typography>
                <Typography className={classes.modalStripeNote}>
                    Stripe End User Privacy Policy and SMS terms
                </Typography>
                <div style={{width: '100%', marginTop: '20px', marginBottom: '72px', textAlign: 'center'}}>
                    <Button
                        onClick={() => connectStripeClick()}
                        $primary
                        $width="330px"
                        style={{backgroundColor: '#242424', fontSize: '16px', lineHeight: '20px', color: '#FFF', textAlign: 'center'}}
                        type="submit"
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}

export default ConnectStripe;
