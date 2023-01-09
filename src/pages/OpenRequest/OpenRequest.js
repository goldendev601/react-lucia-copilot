import React, { useEffect, useState } from 'react';
import { Typography, Grid } from "@material-ui/core";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import RequestList from "./RequestList";
import { useDispatch, useSelector } from "react-redux";
import { setTasksViewExpanded, requestSelector, getOpenRequests, selectRequest } from "redux/features/request/requestSlice";
import { setConfirmOfferFormOpen } from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import Clock from 'assets/clock.png';
import fileDownload from 'js-file-download';
import Download from 'assets/download.png';
import IconButton from "@material-ui/core/IconButton";
import axios from 'axios';



export const RequestDetailContainer = styled.div`  
  padding-top: 29px;
  padding-bottom: 29px;
  border-bottom: solid 1px #2424;
`;





const OpenRequest = () => {


    const useStyles = makeStyles({
        root: {
            Height: '90vh',
            backgroundColor: '#FFF !important'
        },
        openRequestDetailWrapper: {
            backgroundColor: '#C4C4C412 !important'
        },
        requestIdInfo: {
            color: '#242424',
            fontSize: '32px',
            fontWeight: 'normal',
            fontFamily: 'MADE Mirage',
            fontStyle: 'normal'
        },
        requestNote: {
            color: '#242424',
            fontSize: '12px',
            fontWeight: '600',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            textTransform: 'uppercase',
            marginTop: 15
        },
        requestDescription: {
            color: '#000000',
            fontSize: '14px',
            fontWeight: '300',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            opacity: 0.6
        },
        requestBtn: {
            width: '376px',
            height: '42px',
            padding: '0 5px',
            backgroundColor: '#BA886E',
            color: '#FFFFFF',
            textAlign: 'center',
            alignItems: 'center',
            fontFamily: 'Raleway',
            paddingTop: '10px',
            marginTop: '30px',
            borderRadius: '21px',
            '&:hover': {
                cursor: "pointer"
            }
        },
        requestDetailBlockWrapper: {
            width: '100%',
            textAlign: 'right',
            margin: 'auto',
            marginBottom: 70,
            marginTop: 20,
        },
        requestDetailBlock: {
            width: '100%',
            backgroundColor: '#FFF',
            textAlign: 'left',
            padding: '24px',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        requestDetailInfo: {
            color: '#FFF',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: '300',
            fontSize: 16
        },
        requestNotesInfo: {
            color: '#000',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: '300',
            fontSize: '12px',
            lineHeight: '14px'
        },
        requestDeadlineInfo: {
            color: '#EB5757',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '12px',
            lineHeight: '14px',
            textTransform: 'uppercase'
        },
        requestDate: {
            fontSize: 14,
            fontFamily: 'Raleway',
            color: '#000',
            marginTop: 15,
            float: 'right'
        },
        requestTime: {
            fontSize: 12,
            fontFamily: 'Raleway',
            color: '#000',
            marginTop: 15,
            float: 'right',
            marginLeft: 10
        },
        acceptRequestWrapper: {
            height: '288px',
            position: 'fixed',
            bottom: '0px',
            backgroundColor: '#FFF',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            right: 0,
            width: '75%'
        },
        copilotLastNameInfo: {
            fontWeight: '700',
            fontSize: '16px',
            color: '#000',
            lineHeight: '19px',
            fontFamily: 'Raleway',
            textAlign: 'center',
            marginTop: '30px'
        },
        acceptRequestDescription: {
            fontWeight: '300',
            fontSize: '14px',
            color: '#000',
            lineHeight: '22px',
            fontFamily: 'Raleway',
            textAlign: 'center',
            marginTop: '30px',
        },
        headerWrapper: {
            paddingLeft: '44px',
            paddingRight: '44px'
        },
        DetailWrapper: {
            width: '100%',
            display: 'flex',
            marginTop: '15px'
        },
        notesWrapper: {
            width: '60%',
            textAlign: 'left'
        },
        deadlineWrapper: {
            width: '40%',
            textAlign: 'right',
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'flex-end',
        },
        modalUserInfoWrapper: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
        },
        modalTitleInfoWrapper: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            marginTop: '60px',
            justifyContent: 'center'
        },
        modalPriceWrapper: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            padding: '24px',
            justifyContent: 'space-between',
            backgroundColor: '#F8F8F8',
            marginTop: '32px'
        },
        modalTasksWrapper: {
            width: '100%',
            alignItems: 'center',
            padding: '24px',
            backgroundColor: 'rgba(186, 136, 110, 0.1)',
            marginTop: '32px'
        },
        modalDescriptionWrapper: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '32px'
        },
        tasksContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
        clockImage: {
            width: '16px',
            height: '16px'
        },
        modalUserInfo: {
            fontWeight: '700',
            fontSize: '16px',
            color: '#242424',
            lineHeight: '19px',
            fontFamily: 'Raleway'
        },
        modalTasksTitle: {
            fontWeight: '600',
            fontSize: '14px',
            color: '#242424',
            lineHeight: '20px',
            fontFamily: 'Raleway',
            marginRight: '10px'
        },
        modalDueDates: {
            color: '#EB5757',
            fontWeight: '500',
            fontSize: '12px',
            lineHeight: '20px',
            fontFamily: 'Raleway',
            marginLeft: '10px',
            textTransform: 'uppercase'
        },
        modalPriceValue: {
            fontWeight: '600',
            fontSize: '32px',
            color: '#BA886E',
            lineHeight: '38px',
            fontFamily: 'Raleway'
        },
        modalPriceTitle: {
            fontWeight: '600',
            fontSize: '14px',
            color: '#242424',
            lineHeight: '20px',
            fontFamily: 'Raleway'
        },
        attachmentContainer: {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between'
        },
        attachmentNameContainer: {
            display: 'flex',
            borderColor: '#E8E8E8',
            borderWidth: '1px',
            borderStyle: 'solid',
            width: '90%',
            padding: '10px',
            marginTop: '5px'
        },
        pdfIconDiv: {
            backgroundColor: '#E3555F',
            borderRadius: '5px',
            width: '49px',
            height: '29px',
            fontSize: '12px',
            color: '#FFF',
            paddingTop: '5px',
            textAlign: 'center',
            marginRight: '20px'
        } 
    });

    const classes = useStyles();

    const dispatch = useDispatch();

    const { selectedRequest, openRequests } = useSelector(requestSelector);

    const downloadFile = (url, filename) => {
        axios.get(url, {
          responseType: 'blob',
        })
        .then((res) => {
          fileDownload(res.data, filename)
        })
    }

    useEffect(() => {
        dispatch(getOpenRequests())
        dispatch(setTasksViewExpanded(true));
    }, [dispatch]);

    const option = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }

    const handleAcceptRequest = (request) => {
        dispatch(setConfirmOfferFormOpen(true));
        dispatch(selectRequest(request));
    }

    useEffect(() => {
        if (openRequests) {
            dispatch(selectRequest(openRequests[0]))
        }
    }, [openRequests])

    // console.log(selectedRequest);


    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
                <Grid container className={classes.root}>
                    <Grid item md={3} sm={3}>
                        <RequestList>
                        </RequestList>
                    </Grid>
                    <Grid item md={9} sm={9} className={classes.openRequestDetailWrapper}>
                        {
                            selectedRequest && (
                                <>
                                    <RequestDetailContainer>
                                        <div className={classes.headerWrapper}>
                                            {
                                                selectedRequest.requestTitle && (
                                                    <Typography component="h1" className={classes.requestIdInfo}> {selectedRequest.requestTitle} </Typography>
                                                )
                                            }
                                            {
                                                selectedRequest.owner && (
                                                    <Typography component="h6" className={classes.requestNote}> Request for {selectedRequest.owner} </Typography>
                                                )
                                            }

                                            {/* <div className={classes.DetailWrapper}>
                                                <div className={classes.notesWrapper}>
                                                    {
                                                        selectedRequest.notes && (
                                                            <Typography className={classes.requestNotesInfo}>
                                                                {selectedRequest.notes}
                                                            </Typography>
                                                        )
                                                    }
                                                </div>
                                                <div className={classes.deadlineWrapper}>
                                                    {
                                                        selectedRequest && selectedRequest.dueMinutesLeft !== 0 && Math.floor(selectedRequest.dueMinutesLeft / 1440) !== 0 && (
                                                            <Typography component="h5" className={classes.requestDeadlineInfo} >Due in {Math.floor(selectedRequest.dueMinutesLeft / 1440)} days and {Math.floor(selectedRequest.dueMinutesLeft / 60) - Math.floor(selectedRequest.dueMinutesLeft / 1440) * 24} hours</Typography>
                                                        )
                                                    }
                                                    {
                                                        selectedRequest && selectedRequest.dueMinutesLeft !== 0 && Math.floor(selectedRequest.dueMinutesLeft / 1440) === 0 && (
                                                            <Typography component="h5" className={classes.requestDeadlineInfo} >Due in {Math.floor(selectedRequest.dueMinutesLeft / 60)} hours</Typography>
                                                        )
                                                    }
                                                </div>
                                            </div> */}
                                        </div>

                                    </RequestDetailContainer>
                                    <Grid container spacing={1}>
                                        <Grid item lg={2} md={1} sm={0}>
                                        </Grid>
                                        <Grid item lg={8} md={10} sm={12}>
                                            <div className={classes.requestDetailBlockWrapper}>
                                                <div className={classes.requestDetailBlock}>
                                                    <div className={classes.modalUserInfoWrapper}>
                                                        <Typography className={classes.modalUserInfo}>{selectedRequest.owner}</Typography>
                                                    </div>
                                                    <div className={classes.modalTasksWrapper}>
                                                        <div style={{ display: 'flex' }}>
                                                            <Typography className={classes.modalTasksTitle}>Tasks</Typography>
                                                            {
                                                                selectedRequest && selectedRequest.dueMinutesLeft !== 0 && Math.floor(selectedRequest.dueMinutesLeft / 1440) !== 0 && (
                                                                    <>
                                                                        <img className={classes.clockImage} src={Clock} alt="img" />
                                                                        <Typography component="h5" className={classes.modalDueDates} >Due in {Math.floor(selectedRequest.dueMinutesLeft / 1440)} days and {Math.floor(selectedRequest.dueMinutesLeft / 60) - Math.floor(selectedRequest.dueMinutesLeft / 1440) * 24} hours</Typography>
                                                                    </>
                                                                )
                                                            }
                                                            {
                                                                selectedRequest && selectedRequest.dueMinutesLeft !== 0 && Math.floor(selectedRequest.dueMinutesLeft / 1440) === 0 && (
                                                                    <>
                                                                        <img className={classes.clockImage} src={Clock} alt="img" />
                                                                        <Typography component="h5" className={classes.modalDueDates} >Due in {Math.floor(selectedRequest.dueMinutesLeft / 60)} hours</Typography>
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                        <div style={{ marginTop: '12px' }}>
                                                            {selectedRequest && selectedRequest.tasks && selectedRequest.tasks.map((task, index) =>
                                                                <div>
                                                                    <div className={classes.tasksContainer}>
                                                                        <div style={{ display: 'flex' }}>
                                                                            <Typography style={{ fontFamily: 'Raleway', marginRight: '16px', fontWeight: '400', color: '#000', fontSize: '14px' }}>
                                                                                {index + 1}.
                                                                            </Typography>
                                                                            <div>
                                                                                <Typography style={{ fontFamily: 'Raleway', fontWeight: '400', color: '#000', fontSize: '14px' }}>
                                                                                    {task.advisorRequestType}
                                                                                </Typography>
                                                                                <Typography style={{ fontFamily: 'Raleway', fontWeight: '400', color: '#4F4F4F', fontSize: '10px' }}>
                                                                                    {task.explanation}
                                                                                </Typography>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {/* {
                                                            selectedRequest.notes && (
                                                                <div style={{ marginTop: '32px' }}>
                                                                    <Typography style={{ fontFamily: 'Raleway', fontWeight: '300', color: '#333', fontSize: '14px' }}>
                                                                        {selectedRequest.notes}
                                                                    </Typography>
                                                                </div>
                                                            )
                                                        } */}
                                                    </div>
                                                    <div className={classes.modalPriceWrapper}>
                                                        <div>
                                                            <Typography className={classes.modalPriceTitle}>{selectedRequest.owner}'s Offer</Typography>
                                                        </div>
                                                        <Typography className={classes.modalPriceValue}>${selectedRequest.totalAmount.toFixed(2)}</Typography>
                                                    </div>
                                                </div>
                                                <div className={classes.requestDetailBlock}>
                                                    {selectedRequest && selectedRequest.advisorRequestAttachments && selectedRequest.advisorRequestAttachments.map((document, index) =>
                                                        <div className={classes.attachmentContainer}>
                                                            <div className={classes.attachmentNameContainer} >
                                                                <div className={classes.pdfIconDiv}>PDF</div>
                                                                <div>
                                                                    {
                                                                        document.name.length < 20 ? (
                                                                            <Typography style={{ fontFamily: 'Raleway', fontWeight: '400', color: '#000', fontSize: '14px' }}>
                                                                                {document.name}
                                                                            </Typography>
                                                                        ) : (
                                                                            <Typography style={{ fontFamily: 'Raleway', fontWeight: '400', color: '#000', fontSize: '14px' }}>
                                                                                {document.name.substring(0, 20)}...
                                                                            </Typography>
                                                                        )
                                                                    }
                                                                    
                                                                </div>
                                                            </div>
                                                            <IconButton style={{
                                                                padding: '0 5px 0 5px',
                                                                marginLeft: 'auto'
                                                            }} onClick={() => downloadFile(document.documentUrl, document.name)}>
                                                                <img className={classes.clockImage} src={Download} alt="img" />
                                                            </IconButton>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item lg={2} md={1} sm={0}>
                                        </Grid>
                                    </Grid>
                                    <div className={classes.acceptRequestWrapper}>
                                        {
                                            selectedRequest.copilotLastName ? (
                                                <Typography className={classes.copilotLastNameInfo}>
                                                    Ready to CoPilot this request?
                                                </Typography>
                                            ) : (
                                                <Typography className={classes.copilotLastNameInfo}>
                                                    Ready to CoPilot this request?
                                                </Typography>
                                            )
                                        }
                                        <div style={{ width: '600px' }}>
                                            <Typography className={classes.acceptRequestDescription}>
                                                By accepting this request, you are agreeing to complete the tasks above prior to the due date. Payment will be processed once tasks have been completed and submitted.
                                            </Typography>
                                        </div>
                                        <div className={classes.requestBtn} onClick={() => handleAcceptRequest(selectedRequest)}> Accept </div>
                                    </div>
                                </>
                            )
                        }
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default OpenRequest;
