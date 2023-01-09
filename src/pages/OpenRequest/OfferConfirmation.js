import React, {useEffect, useState} from "react";
import {Dialog, DialogTitle, Button, Typography} from '@material-ui/core'
import { acceptRequest, requestSelector, selectMyRequest, listChats, markSeen, fetchRequest } from "redux/features/request/requestSlice";
import {useDispatch, useSelector} from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { addItineraryStyles } from "styles";
import Clock from 'assets/clock.png';
import {setConfirmOfferFormOpen} from "redux/features/dialogForms/dialogFormsOpenStateSlice";


const OfferConfirmation = ({...props}) => {
    const classes = addItineraryStyles();
    const dispatch = useDispatch();
    const history = useHistory()

    const {selectedRequest, acceptedRequest} = useSelector(requestSelector);

    const handleClose = () => {
        dispatch(setConfirmOfferFormOpen(false));
    }

    const acceptRequset = () => {
        if (selectedRequest) {
            const payload = {
                advisor_id: selectedRequest.id,
            }
            dispatch(acceptRequest(payload))
            dispatch(setConfirmOfferFormOpen(false));
        }
        history.push('/myrequests');
    }

    // useEffect(() => {
    //     if (acceptedRequest) {
    //         dispatch(selectMyRequest(acceptedRequest))
    //         dispatch(listChats({advisorId: acceptedRequest.id}))
    //         dispatch(fetchRequest({advisorId: acceptedRequest.id}))
    //         if (acceptedRequest.has_unread_messages) {
    //             dispatch(markSeen({advisorId: acceptedRequest.id}))
    //         }
    //     }
    //     history.push('/myrequests');
    // }, [acceptedRequest])

    return (
        <Dialog open={props.open} onClose={handleClose}>
            <div className={classes.modalheaderWrapper}>
                <Typography className={classes.modalTitle}>Confirm Offer</Typography>
            </div>
            {
                selectedRequest && (
                    <div className={classes.modalMainWrapper}> 
                        <div className={classes.modalUserInfoWrapper}>
                            {
                                selectedRequest.ownerProfileImageUrl ? (
                                    <img className={classes.modalUserImg} src={selectedRequest.ownerProfileImageUrl} alt="img" />
                                ) : (
                                    <img className={classes.modalUserImg} src='https://s3-lucia-staging.s3.us-east-2.amazonaws.com/fncfranzese3-at-gmailcom-1637321387/profile_picture-LwsKb6LjyOdtvWSI.png' alt="img" />
                                )
                            }
                            
                            <Typography className={classes.modalUserInfo}>{selectedRequest.owner} (#{selectedRequest.id})</Typography>
                        </div>
                        <div className={classes.modalTasksWrapper}>
                            <div style={{display: 'flex'}}>
                                <Typography className={classes.modalTasksTitle}>Tasks</Typography>
                                {
                                    selectedRequest && selectedRequest.dueMinutesLeft !== 0 && Math.floor(selectedRequest.dueMinutesLeft/1440) !== 0 && (
                                        <>
                                            <img className={classes.clockImage} src={Clock} alt="img" />
                                            <Typography component="h5" className={classes.modalDueDates} >Due in {Math.floor(selectedRequest.dueMinutesLeft/1440)} days and {Math.floor(selectedRequest.dueMinutesLeft/60) - Math.floor(selectedRequest.dueMinutesLeft/1440) * 24} hours</Typography>
                                        </>
                                    )
                                }
                                {
                                    selectedRequest && selectedRequest.dueMinutesLeft !== 0 && Math.floor(selectedRequest.dueMinutesLeft/1440) === 0 && (
                                        <>
                                            <img className={classes.clockImage} src={Clock} alt="img" />
                                            <Typography component="h5" className={classes.modalDueDates} >Due in {Math.floor(selectedRequest.dueMinutesLeft/60)} hours</Typography>
                                        </>
                                    )
                                }
                            </div>
                            <div style={{marginTop: '12px'}}>
                                {selectedRequest && selectedRequest.tasks && selectedRequest.tasks.map((task, index) =>
                                    <div>
                                        <div className={classes.tasksContainer}>
                                            <div style={{display: 'flex'}}>
                                                <Typography style={{fontFamily: 'Raleway', marginRight: '16px', fontWeight: '400', color: '#000', fontSize: '14px'}}>
                                                    {index + 1}.
                                                </Typography>
                                                <div>
                                                    <Typography style={{fontFamily: 'Raleway', fontWeight: '400', color: '#000', fontSize: '14px'}}>
                                                        {task.advisorRequestType}
                                                    </Typography>
                                                    <Typography style={{fontFamily: 'Raleway', fontWeight: '400', color: '#4F4F4F', fontSize: '10px'}}>
                                                        {task.explanation}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {
                                selectedRequest.notes && (
                                    <div style={{marginTop: '32px'}}>
                                        <Typography style={{fontFamily: 'Raleway', fontWeight: '300', color: '#333', fontSize: '14px'}}>
                                            {selectedRequest.notes}
                                        </Typography>
                                    </div>
                                )
                            }
                        </div>
                        <div className={classes.modalPriceWrapper}>
                            <div>
                                <Typography className={classes.modalPriceTitle}>Total</Typography>
                                <Typography className={classes.modalPriceNote}>(What you will receive)</Typography>
                            </div>
                            <Typography className={classes.modalPriceValue}>${selectedRequest.totalAmount.toFixed(2)}</Typography>
                        </div>
                        <div className={classes.modalDescriptionWrapper}>
                            <Typography className={classes.modalDescription}>
                                Payment will be processed after completing all the requested tasks. Please review details before confirming.
                            </Typography>
                        </div>
                        <div style={{width: '100%', margin: '20px auto'}}>
                            <Button
                                onClick={() => acceptRequset()}
                                $primary
                                fullWidth
                                style={{backgroundColor: '#BA886E', fontSize: '16px', lineHeight: '20px', color: '#FFF', textAlign: 'center'}}
                                type="submit"
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>
                )
            }
            
        </Dialog>
    );
}

export default OfferConfirmation;
