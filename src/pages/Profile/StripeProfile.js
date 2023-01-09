import React, {useEffect, useState} from "react";
import { SelectField, UploadPicture, Button, Picture } from "@core/components";
import { Box, Typography } from "@material-ui/core";
import { addItineraryStyles } from "styles";
import { useDispatch, useSelector } from "react-redux";
import { clearState, profileSelector, createStripe, completeStripe, getStripe } from "redux/features/profile/profileSlice";
import { error, success } from "styles/snackbarStyles/snackbarStyles";
import { useSnackbar } from 'react-simple-snackbar'
import { createErrorMessage } from "utils";


const StripeProfile = ({ handleOpenProfile }) => {
    const classes = addItineraryStyles();

    const { profileUser, isSuccess, isError, errorMessage, isFetching, stripeUrl } = useSelector(profileSelector);

    const dispatch = useDispatch();

    const [itineraryLogoPicture, setItineraryLogoPicture] = useState([{itineraryLogo: profileUser.itineraryTheme?.itineraryLogoUrl}]);
    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const connectStripe = () => {
        dispatch(createStripe())  
        dispatch(clearState());
    }

    const gotoConnectStripe = () => {
        dispatch(getStripe());
    }

    useEffect(() => {
        if (stripeUrl) {
            window.open(stripeUrl);
        }
    }, [stripeUrl]);

    useEffect(() => {
        if (isError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearState());
        }

        if (isSuccess) {
            openSnackbarSuccess('Your process is successfully done');
            dispatch(clearState());
        }       
    }, [isError, isSuccess]);    

    return (
        <div>

            {
                profileUser.stripeConnect !== 'fully connected' ? (
                    <div className={classes.stripeContainer}> 
                        <Typography style={{width: '100%'}} className={classes.stripeIconText}>
                            stripe
                        </Typography>
                        <Typography style={{width: '100%'}} className={classes.stripeText}>
                            Connecting your Lucia account with your Stripe account will allow to receive payments for you when your clients pay for your completed tasks.
                        </Typography>
                        <div style={{width: '100%', margin: '20px auto', display: 'flex', justifyContent: 'center'}}>
                            <div className={classes.connectStripeBtn}
                                onClick={() => connectStripe()}
                            >
                                Connect Stripe
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={classes.stripeContainer}> 
                        <Typography style={{width: '100%'}} className={classes.stripeIconText}>
                            stripe
                        </Typography>
                        <Typography style={{width: '100%'}} className={classes.stripeText}>
                            Connected to Stripe.
                        </Typography>
                        <Typography style={{width: '100%'}} className={classes.stripeText2}>
                            Status: Active
                        </Typography>
                        <div style={{width: '100%', margin: '20px auto', display: 'flex', justifyContent: 'center'}}>
                            <div className={classes.gotoConnectStripeBtn}
                                onClick={() => gotoConnectStripe()}
                            >
                                Go to Stripe Account
                            </div>
                        </div>
                    </div>
                )
            }
            
            <div className={classes.formActions}>
                <Button
                    $outlined
                    $width={'50%'}
                    onClick={handleOpenProfile}
                >
                    Cancel
                </Button>
                <Button
                    $primary
                    $width={'50%'}
                    type="submit"
                    disabled={isFetching}
                >
                    Save Changes
                </Button>
            </div>
        </div>
    );
}

export default StripeProfile;
