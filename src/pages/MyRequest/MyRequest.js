import React, { useEffect, useRef, useState } from 'react';
import { Typography, Grid, TextField, Menu, MenuItem, ListItemText, LinearProgress, Popover } from "@material-ui/core";
import styled from "styled-components";
import { Button } from "@core/components";
import { Check, Attachment } from "iconoir-react";
import { makeStyles } from "@material-ui/core/styles";
import MyRequestList from "./MyRequestList";
import { useDispatch, useSelector } from "react-redux";
import { markCompleted, sendMessage, sendFile, listChats, requestSelector, refundRequest, getMyRequests, setTasksViewExpanded, selectMyRequest, clearState } from "redux/features/request/requestSlice";
import { setItineraryId } from "redux/features/itineraries/itinerariesSlice";
import { setCategoryFormOpen, setEdit } from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import TasksView from "./TasksView";
import { dateToMyDate, dateToMyTime } from "utils";
import userDefaultAvatar from 'assets/person.png';
import { NavArrowDown } from "iconoir-react";
import fileDownload from 'js-file-download';
import Info from 'assets/info.png';
import Download from 'assets/download.png';
import axios from 'axios';
import IconButton from "@material-ui/core/IconButton";
import { useSnackbar } from 'react-simple-snackbar'
import { error, success } from "styles/snackbarStyles/snackbarStyles";
import { createErrorMessage } from "utils";


export const RequestDetailContainer = styled.div`
  margin-left: 44px;
  padding-top: 29px;
  margin-right: 44px;
  position: relative;
  height: 100%;
`;

const MyRequest = () => {


    const useStyles = makeStyles({
        root: {
            height: '90vh',
            maxHeight: '90vh',
            overflow: 'hidden',
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
            width: '80%',
            height: 42,
            padding: '0 5px',
            backgroundColor: '#BA886E',
            color: '#FFFFFF',
            textAlign: 'center',
            alignItems: 'center',
            fontFamily: 'Raleway',
            paddingTop: 10,
            marginTop: 94,
            float: 'right',
            '&:hover': {
                cursor: "pointer"
            }
        },
        requestDetailBlockWrapper: {
            width: '50%',
            textAlign: 'right',
            margin: 'auto',
            marginBottom: 70,
            marginTop: 20,
        },
        messagesBlockWrapper: {
            flex: 1,
            textAlign: 'left',
            marginLeft: '15px',
            marginRight: '15px'            
        },
        messageDetailBlock: {
            width: '100%',
            textAlign: 'left',
            padding: '17px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            backgroundColor: '#FFF',
        },
        messageDetailBlockSender: {
            width: '100%',
            textAlign: 'left',
            padding: '17px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            backgroundColor: '#BA886E',
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
        messageDetailInfo: {
            color: '#000',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: '300',
            fontSize: 16
        },
        messageDetailInfoSender: {
            color: '#FFF !important',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: '300',
            fontSize: 16
        },
        requestDetailInfo: {
            color: '#FFF',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: '300',
            fontSize: 16
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
        messageDate: {
            fontSize: 14,
            fontFamily: 'Raleway',
            color: '#000',
            marginTop: 15,
            float: 'left'
        },
        messageTime: {
            fontSize: 12,
            fontFamily: 'Raleway',
            color: '#000',
            marginTop: 15,
            float: 'left',
            marginLeft: 10
        },
        markRequestAsComplete: {
            fontSize: '10px',
            borderRadius: '15px'
        },
        cancelRequestBtn: {
            fontSize: '10px',
            marginRight: '20px',
            borderRadius: '15px'
        },
        messageInput: {
            backgroundColor: '#FFF',
            boxShadow: '0px 14px 34px rgba(0, 0, 0, 0.05)',
            padding: 8,
            width: '100%',
            borderRadius: '5px'
        },
        messageinputWrapper: {
            // position: 'absolute',
            // bottom: '50px',
            width: '100%',
            marginTop: '50px'
        },
        mainContainer: {
            padding: '20px',
            height: 'calc(100vh - 450px)',
            overflowY: 'scroll'
        },
        senderName: {
            color: '#000',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 16,
            marginBottom: '11px'
        },
        senderNameSender: {
            color: '#FFF',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 16,
            marginBottom: '11px'
        },
        messagesImageWrapper: {
            width: 40,
            height: 40,
            borderRadius: 20,
            overflow: 'hidden'
        },
        messagesSenderImage: {
            width: 40,
            height: 40,
        },
        messagesDiv: {
            display: 'flex',
            textAlign: 'left',
            marginTop: 25,
            width: '100%'
        },
        messagesDiv1: {
            display: 'flex',
            textAlign: 'left',
            marginTop: 25,
            width: '100%'
        },
        notificationInfo: {
            color: '#BA886E',
            fontFamily: 'Raleway',
            fontStyle: 'italic',
            fontWeight: '300',
            fontSize: 16,
        },
        notificationBlock: {
            width: '100%',
            textAlign: 'center',
            padding: '17px',
            border: '1px solid #BA886E',
            marginTop: 150
        },
        requestStatusInfo: {
            fontSize: 10,
            textTransform: 'uppercase',
            fontWeight: '600',
            fontStyle: 'normal',
            width: 78,
            height: 12,
            textAlign: 'right',
            marginTop: 15,
            marginLeft: 5
        },
        requestDeadlineInfo: {
            fontSize: '12px',
            textTransform: 'uppercase',
            fontWeight: '600',
            fontStyle: 'normal',
            lineHeight: '30px',
            textAlign: 'right',
            marginTop: '13px',
            marginLeft: '15px',
            color: '#EB5757'
        },
        requestSteps: {
            fontFamily: 'Raleway',
            fontSize: '12px',
            fontWeight: '700',
            fontStyle: 'normal',
            lineHeight: '30px',
            textAlign: 'left',
            marginLeft: '15px',
            marginRight: '10px',
            color: '#000'
        },
        countDownBar: {
            width: '216px'
        },
        colorPrimary: {
            backgroundColor: '#C4C4C4',
        },
        barColorPrimary: {
            backgroundColor: '#BA886E',
        },
        headerInfoWrapper: {
            width: '50%',
            paddingBottom: '50px'
        },
        buttonListWrapper: {
            width: '50%'
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
        popoverDiv: {
            backgroundColor: '#FFFFFF',
            padding: 20
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

    const { selectedMyRequest, myRequestInfo, messages, expanded, myRequests, isMarkCompleted, isMarkCompletedError, isCompleted, isCompletedError, errorMessage } = useSelector(requestSelector);

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElClock, setAnchorElClock] = useState(null);

    const [message, setMessage] = React.useState('');
    const [messageFile, setMessageFile] = React.useState();

    const messagesRef = useRef();
    const attachRef = useRef();

    const open = Boolean(anchorEl);
    const openClock = Boolean(anchorElClock);
    const id = open ? 'simple-popover' : undefined;
    const idClock = openClock ? 'simple-popover' : undefined;

    useEffect(() => {
        dispatch(setTasksViewExpanded(false));
        dispatch(getMyRequests())
    }, [dispatch]);

    useEffect(() => {
        if (myRequests) {
            dispatch(selectMyRequest(myRequests[0]))
        }
    }, [myRequests])

    const option = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }

    const downloadFile = (url, filename) => {
        axios.get(url, {
            responseType: 'blob',
        })
            .then((res) => {
                fileDownload(res.data, filename)
            })
    }

    const handleMarkCompleted = (request) => {
        dispatch(markCompleted({ advisorId: request.id }))
    }

    const handleViewTasks = (request) => {
        dispatch(setTasksViewExpanded(true));
    }

    const handleCancelRequest = (request) => {
        dispatch(refundRequest({ advisorId: request.id }))
    }

    const addBookingToItinerary = (id) => {
        dispatch(setItineraryId(parseInt(id)));
        dispatch(setEdit(false));
        dispatch(setCategoryFormOpen(true));
    }

    const previewItinerary = (requestDetail) => {
        if (requestDetail.itineraryAppPreviewUrl) {
            const preview_page_link = requestDetail.itineraryAppPreviewUrl.replace('shares/itineraries', 'public/itinerary');
            window.open(preview_page_link, '_blank');

        }
    }

    const handleClick = (event1) => {
        setAnchorEl(event1.currentTarget);
    };

    const handleClickClock = (event2) => {
        setAnchorElClock(event2.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseClock = () => {
        setAnchorElClock(null);
    };

    const handleSendMessage = (request) => {
        const data = {
            'plain_text': message
        }
        dispatch(sendMessage({ advisorId: request.id, data: data }))
        // if (messageFile) {
        //     const formData = new FormData();
        //     for (const file of Array.from(messageFile)) {
        //         formData.append('document', file)
        //     }
        //     dispatch(sendFile({advisorId: request.id, data: formData}))
        // }
        if (request.advisorRequestStatusId === 4 || request.advisorRequestStatusId === 3) {
            dispatch(listChats({ advisorId: request.id }))
        }
        setMessage('');
    }

    // useEffect(() => {
    //     if (selectedMyRequest) {
    //         const interval = setInterval(() => {
    //             if (selectedMyRequest.advisorRequestStatusId === 4 || selectedMyRequest.advisorRequestStatusId === 3) {
    //                 dispatch(listChats({ advisorId: selectedMyRequest.id }))
    //             }
    //         }, 5000);
    //         return () => clearInterval(interval);
    //     }

    // }, [selectedMyRequest]);

    useEffect(() => {
        if (isMarkCompletedError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearState());
        }

        if (isMarkCompleted) {
            openSnackbarSuccess('The request has been successfully marked completed');
        }
    }, [isMarkCompletedError, isMarkCompleted]);

    useEffect(() => {
        if (isCompletedError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearState());
        }
        if (isCompleted) {
            openSnackbarSuccess('Tasks have been successfully marked completed');
            dispatch(clearState());
        }
    }, [isCompleted, isCompletedError]);

    useEffect(() => {
        if (messages) {
            if (messagesRef.current) {
                messagesRef.current.scrollIntoView()
            }
        }
    }, [messages])


    function changeFile() {
        if (attachRef.current) {
            attachRef.current.click()
        }
    }

    function handleChange(event) {
        if (event.target.files) {
            const formData = new FormData();
            for (const file of Array.from(event.target.files)) {
                formData.append('document', file)
            }
            dispatch(sendFile({ advisorId: selectedMyRequest.id, data: formData }))
        }

    }

    const requestStatusSymbolList = ['Draft', 'Pending', 'In Progress', 'Approved'];
    const requestStatusSymbolColorList = ['#828282', '#828282', '#81A03F', '#BA886E'];


    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
                <Grid container className={classes.root}>
                    <Grid item md={3} sm={3} style={{ height: '100%', overflow: 'auto' }}>
                        <MyRequestList>
                        </MyRequestList>
                    </Grid>
                    <Grid item md={9} sm={9} className={classes.openRequestDetailWrapper}>
                        {
                            selectedMyRequest && (
                                <RequestDetailContainer>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div className={classes.headerInfoWrapper}>
                                            {
                                                selectedMyRequest.requestTitle && (
                                                    <Typography component="h1" className={classes.requestIdInfo}> {selectedMyRequest.requestTitle} </Typography>
                                                )
                                            }
                                            <div style={{ display: 'flex' }}>
                                                {
                                                    selectedMyRequest.owner && (
                                                        <Typography component="h6" className={classes.requestNote}> Request for {selectedMyRequest.owner} </Typography>
                                                    )
                                                }
                                                <Typography component="h5" className={classes.requestStatusInfo} style={{ color: requestStatusSymbolColorList[selectedMyRequest.advisorRequestStatusId - 1] }} >{requestStatusSymbolList[selectedMyRequest.advisorRequestStatusId - 1]}</Typography>
                                                {
                                                    myRequestInfo && myRequestInfo.request && myRequestInfo.request.dueMinutesLeft !== 0 && Math.floor(myRequestInfo.request.dueMinutesLeft / 1440) !== 0 && (
                                                        <Typography component="h5" className={classes.requestDeadlineInfo} >Due in {Math.floor(myRequestInfo.request.dueMinutesLeft / 1440)} days and {Math.floor(myRequestInfo.request.dueMinutesLeft / 60) - Math.floor(myRequestInfo.request.dueMinutesLeft / 1440) * 24} hours</Typography>
                                                    )
                                                }
                                                {
                                                    myRequestInfo && myRequestInfo.request && myRequestInfo.request.dueMinutesLeft !== 0 && Math.floor(myRequestInfo.request.dueMinutesLeft / 1440) === 0 && (
                                                        <Typography component="h5" className={classes.requestDeadlineInfo} >Due in {Math.floor(myRequestInfo.request.dueMinutesLeft / 60)} hours</Typography>
                                                    )
                                                }
                                            </div>
                                            {
                                                selectedMyRequest && selectedMyRequest.tasks && selectedMyRequest.tasks.length !== 0 && (
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <div className={classes.countDownBar}>
                                                            <LinearProgress
                                                                variant="determinate"
                                                                value={(selectedMyRequest.taskCompletedCount / selectedMyRequest.tasks.length) * 100}
                                                                classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }}
                                                            />
                                                        </div>
                                                        {
                                                            selectedMyRequest.tasks.length === 1 ? (
                                                                <Typography component="h5" className={classes.requestSteps} >{selectedMyRequest.taskCompletedCount}/{selectedMyRequest.tasks.length} task completed</Typography>
                                                            ) : (
                                                                <Typography component="h5" className={classes.requestSteps} >{selectedMyRequest.taskCompletedCount}/{selectedMyRequest.tasks.length} tasks completed</Typography>
                                                            )
                                                        }
                                                        <img className={classes.clockImage} src={Info} alt="img" onClick={handleClickClock} />
                                                        <Popover
                                                            id={idClock}
                                                            open={openClock}
                                                            anchorEl={anchorElClock}
                                                            onClose={handleCloseClock}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'center',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'center',
                                                            }}
                                                        >
                                                            <div className={classes.popoverDiv}>
                                                                {selectedMyRequest && selectedMyRequest.tasks && selectedMyRequest.tasks.map((task, index) =>
                                                                    <div>
                                                                        <div className={classes.tasksContainer}>
                                                                            <div style={{ display: 'flex' }}>
                                                                                <Typography style={{ fontFamily: 'Raleway', marginRight: '16px', fontWeight: '400', color: '#000', fontSize: '12px' }}>
                                                                                    {index + 1}.
                                                                                </Typography>
                                                                                <Typography style={{ fontFamily: 'Raleway', fontWeight: '400', color: '#000', fontSize: '12px', paddingRight: '5px' }}>
                                                                                    {task.advisorRequestType}
                                                                                </Typography>
                                                                                {
                                                                                    task.completed && (
                                                                                        <Check width={'15px'} color={'#219653'} />
                                                                                    )
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </Popover>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className={classes.buttonListWrapper}>
                                            {
                                                selectedMyRequest.advisorRequestStatus === 'ACCEPTED' && (
                                                    <Grid container spacing={1}>
                                                        {
                                                            (myRequestInfo && myRequestInfo.request && myRequestInfo.request.itineraryId) ? (
                                                                <>
                                                                    <Grid item xs={3}>
                                                                        <Button
                                                                            $outlined
                                                                            $width={'100%'}
                                                                            className={classes.cancelRequestBtn}
                                                                            onClick={() => handleCancelRequest(selectedMyRequest)}
                                                                        >
                                                                            Cancel Request
                                                                        </Button>
                                                                    </Grid>
                                                                    <Grid item xs={3}>
                                                                        <Button
                                                                            $outlined
                                                                            $width={'100%'}
                                                                            className={classes.cancelRequestBtn}
                                                                            aria-controls="filter-list"
                                                                            aria-haspopup="true"
                                                                            onClick={handleClick}
                                                                            endIcon={<NavArrowDown width={'22px'} />}
                                                                        >
                                                                            {myRequestInfo.request.itineraryTitle}
                                                                        </Button>
                                                                        <Menu
                                                                            id="filter-list"
                                                                            anchorEl={anchorEl}
                                                                            keepMounted
                                                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                                            transformOrigin={{ vertical: "top", horizontal: 'right' }}
                                                                            open={Boolean(anchorEl)}
                                                                            onClose={handleClose}
                                                                        >
                                                                            <MenuItem>
                                                                                <ListItemText onClick={() => addBookingToItinerary(myRequestInfo.request.itineraryId)}>
                                                                                    Add booking to itinerary
                                                                                </ListItemText>
                                                                            </MenuItem>
                                                                            <MenuItem onClick={() => previewItinerary(myRequestInfo.request)}>
                                                                                <ListItemText>Preview itinerary</ListItemText>
                                                                            </MenuItem>
                                                                        </Menu>
                                                                    </Grid>
                                                                    <Grid item xs={3}>
                                                                        <Button
                                                                            $primary
                                                                            $width={'100%'}
                                                                            iconstart={<Check width={'25px'} />}
                                                                            className={classes.cancelRequestBtn}
                                                                            onClick={() => handleMarkCompleted(selectedMyRequest)}
                                                                        >
                                                                            Mark as complete
                                                                        </Button>
                                                                    </Grid>
                                                                    <Grid item xs={3}>
                                                                        <Button
                                                                            $primary
                                                                            $width={'100%'}
                                                                            className={classes.markRequestAsComplete}
                                                                            onClick={() => handleViewTasks()}
                                                                        >
                                                                            View Tasks
                                                                        </Button>
                                                                    </Grid>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Grid item xs={4}>
                                                                        <Button
                                                                            $outlined
                                                                            $width={'100%'}
                                                                            className={classes.cancelRequestBtn}
                                                                            onClick={() => handleCancelRequest(selectedMyRequest)}
                                                                        >
                                                                            Cancel Request
                                                                        </Button>
                                                                    </Grid>
                                                                    <Grid item xs={4}>
                                                                        <Button
                                                                            $primary
                                                                            $width={'100%'}
                                                                            iconstart={<Check width={'25px'} />}
                                                                            className={classes.cancelRequestBtn}
                                                                            onClick={() => handleMarkCompleted(selectedMyRequest)}
                                                                        >
                                                                            Mark as complete
                                                                        </Button>
                                                                    </Grid>
                                                                    <Grid item xs={4}>
                                                                        <Button
                                                                            $primary
                                                                            $width={'100%'}
                                                                            className={classes.markRequestAsComplete}
                                                                            onClick={() => handleViewTasks()}
                                                                        >
                                                                            View Tasks
                                                                        </Button>
                                                                    </Grid>
                                                                </>
                                                            )
                                                        }



                                                    </Grid>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <Grid container spacing={1}>
                                        <Grid item lg={2} md={1} sm={0}></Grid>
                                        <Grid item lg={8} md={10} sm={12}>
                                            {
                                                selectedMyRequest.advisorRequestStatus === 'ACCEPTED' ? (
                                                    <>
                                                        <div className={classes.mainContainer}>
                                                            <Grid container spacing={0}>
                                                                <Grid item lg={12} md={12} sm={12}>
                                                                    <div className={classes.messagesDiv1}>
                                                                        <div className={classes.messagesBlockWrapper}>
                                                                            <div className={classes.requestDetailBlock}>
                                                                                <div className={classes.modalUserInfoWrapper}>
                                                                                    <Typography className={classes.modalUserInfo}>{selectedMyRequest.owner}</Typography>
                                                                                </div>
                                                                                <div className={classes.modalTasksWrapper}>
                                                                                    <div style={{ display: 'flex' }}>
                                                                                        <Typography className={classes.modalTasksTitle}>Tasks</Typography>
                                                                                    </div>
                                                                                    <div style={{ marginTop: '12px' }}>
                                                                                        {selectedMyRequest && selectedMyRequest.tasks && selectedMyRequest.tasks.map((task, index) =>
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
                                                                                    {
                                                                                        selectedMyRequest.notes && (
                                                                                            <div style={{ marginTop: '32px' }}>
                                                                                                <Typography style={{ fontFamily: 'Raleway', fontWeight: '300', color: '#333', fontSize: '14px' }}>
                                                                                                    {selectedMyRequest.notes}
                                                                                                </Typography>
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className={classes.messagesDiv1}>
                                                                        <div className={classes.messagesBlockWrapper}>
                                                                            <div className={classes.requestDetailBlock}>
                                                                                {selectedMyRequest && selectedMyRequest.advisorRequestAttachments && selectedMyRequest.advisorRequestAttachments.map((document, index) =>
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
                                                                    </div>
                                                                </Grid>
                                                                <Grid item lg={0} md={0} sm={0}>
                                                                </Grid>
                                                            </Grid>

                                                            {
                                                                messages && messages.map((messageInfo, index) => {
                                                                    return (
                                                                        <Grid container spacing={0}>
                                                                            {
                                                                                messageInfo.loggedInUserIsSender ? (
                                                                                    <>
                                                                                        <Grid item lg={3} md={2} sm={2}>
                                                                                        </Grid>
                                                                                        <Grid item lg={9} md={10} sm={10}>
                                                                                            <div key={index} className={classes.messagesDiv} style={{marginRight: '10px'}} >
                                                                                                <div className={classes.messagesBlockWrapper}>
                                                                                                    <div className={classes.messageDetailBlockSender}>
                                                                                                        <Typography component="h4" className={classes.senderNameSender}>
                                                                                                            {messageInfo.sender.firstName}
                                                                                                        </Typography>
                                                                                                        {
                                                                                                            messageInfo && messageInfo.chatContentType === "TEXT" && (
                                                                                                                <Typography component="h8" className={classes.messageDetailInfoSender}>
                                                                                                                    {messageInfo.plainText}
                                                                                                                </Typography>
                                                                                                            )
                                                                                                        }
                                                                                                        {
                                                                                                            messageInfo && messageInfo.chatContentType === "DOCUMENT" && (
                                                                                                                <a className={classes.messageDetailInfoSender}
                                                                                                                    onClick={() => downloadFile(messageInfo.documentUrl, messageInfo.plainText)}
                                                                                                                >
                                                                                                                    {messageInfo.plainText}
                                                                                                                </a>
                                                                                                            )
                                                                                                        }
                                                                                                    </div>
                                                                                                    <div style={{display: 'flex', justifyContent: 'end'}}>
                                                                                                        <Typography component="label" className={classes.messageDate}> Submitted on {dateToMyDate(messageInfo.createdAt).toLocaleDateString('en-US', option)}, </Typography>
                                                                                                        <Typography component="p" className={classes.messageTime}> {dateToMyTime(messageInfo.createdAt)} </Typography>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className={classes.messagesImageWrapper}>
                                                                                                    {
                                                                                                        messageInfo.sender.profileImageUrl ? (
                                                                                                            <img className={classes.messagesSenderImage} src={messageInfo.sender.profileImageUrl} alt="img" />
                                                                                                        ) : (
                                                                                                            <img className={classes.messagesSenderImage} src={userDefaultAvatar} alt="img" />
                                                                                                        )
                                                                                                    }
                                                                                                </div>
                                                                                            </div>
                                                                                        </Grid>
                                                                                    </>
                                                                                ) : (
                                                                                    <>
                                                                                        <Grid item lg={9} md={10} sm={10}>
                                                                                            <div key={index} className={classes.messagesDiv} >
                                                                                                <div className={classes.messagesImageWrapper}>
                                                                                                    {
                                                                                                        messageInfo.sender.profileImageUrl ? (
                                                                                                            <img className={classes.messagesSenderImage} src={messageInfo.sender.profileImageUrl} alt="img" />
                                                                                                        ) : (
                                                                                                            <img className={classes.messagesSenderImage} src={userDefaultAvatar} alt="img" />
                                                                                                        )
                                                                                                    }

                                                                                                </div>
                                                                                                <div className={classes.messagesBlockWrapper}>
                                                                                                    <div className={classes.messageDetailBlock}>
                                                                                                        <Typography component="h4" className={classes.senderName}>
                                                                                                            {messageInfo.sender.firstName}
                                                                                                        </Typography>
                                                                                                        {
                                                                                                            messageInfo && messageInfo.chatContentType === "TEXT" && (
                                                                                                                <Typography component="h8" className={classes.messageDetailInfo}>
                                                                                                                    {messageInfo.plainText}
                                                                                                                </Typography>
                                                                                                            )
                                                                                                        }
                                                                                                        {
                                                                                                            messageInfo && messageInfo.chatContentType === "DOCUMENT" && (
                                                                                                                <a className={classes.messageDetailInfo}
                                                                                                                    onClick={() => downloadFile(messageInfo.documentUrl, messageInfo.plainText)}
                                                                                                                >
                                                                                                                    {messageInfo.plainText}
                                                                                                                </a>
                                                                                                            )
                                                                                                        }
                                                                                                    </div>
                                                                                                    <Typography component="label" className={classes.messageDate}> Submitted on {dateToMyDate(messageInfo.createdAt).toLocaleDateString('en-US', option)}, </Typography>
                                                                                                    <Typography component="p" className={classes.messageTime}> {dateToMyTime(messageInfo.createdAt)} </Typography>
                                                                                                </div>
                                                                                            </div>
                                                                                        </Grid>
                                                                                        <Grid item lg={3} md={2} sm={2}>
                                                                                        </Grid>
                                                                                    </>
                                                                                )
                                                                            }
                                                                            
                                                                        </Grid>
                                                                    )
                                                                })
                                                            }
                                                            <div ref={messagesRef} />
                                                        </div>
                                                        <div className={classes.messageinputWrapper}>
                                                            <input type="file" className={classes.fileInput} multiple onChange={handleChange} ref={attachRef} style={{ display: 'none' }} />
                                                            <TextField
                                                                placeholder="Type Message Here..."
                                                                variant='outlined'
                                                                className={classes.messageInput}
                                                                value={message}
                                                                multiline
                                                                disabled={selectedMyRequest.advisorRequestStatus === 'COMPLETED'}
                                                                onChange={(e) => setMessage(e.target.value)}
                                                                InputProps={{
                                                                    style: {
                                                                        height: '57px',
                                                                        maxHeight: '57px',
                                                                        overflow: 'auto'
                                                                    },
                                                                    endAdornment: <>
                                                                        <Attachment width={'50px'} color={'#636671'} onClick={() => changeFile()} />
                                                                        <Button $primary $width={'100px'} style={{ borderRadius: '10px' }} onClick={() => handleSendMessage(selectedMyRequest)}>Send</Button>
                                                                    </>
                                                                }}
                                                            />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className={classes.mainContainer}>
                                                            <Grid container spacing={0}>
                                                                <Grid item lg={12} md={12} sm={12}>
                                                                    <div className={classes.messagesDiv1}>
                                                                        <div className={classes.messagesBlockWrapper}>
                                                                            <div className={classes.requestDetailBlock}>
                                                                                <div className={classes.modalUserInfoWrapper}>
                                                                                    <Typography className={classes.modalUserInfo}>{selectedMyRequest.owner}</Typography>
                                                                                </div>
                                                                                <div className={classes.modalTasksWrapper}>
                                                                                    <div style={{ display: 'flex' }}>
                                                                                        <Typography className={classes.modalTasksTitle}>Tasks</Typography>
                                                                                    </div>
                                                                                    <div style={{ marginTop: '12px' }}>
                                                                                        {selectedMyRequest && selectedMyRequest.tasks && selectedMyRequest.tasks.map((task, index) =>
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
                                                                                    {
                                                                                        selectedMyRequest.notes && (
                                                                                            <div style={{ marginTop: '32px' }}>
                                                                                                <Typography style={{ fontFamily: 'Raleway', fontWeight: '300', color: '#333', fontSize: '14px' }}>
                                                                                                    {selectedMyRequest.notes}
                                                                                                </Typography>
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className={classes.messagesDiv1}>
                                                                        <div className={classes.messagesBlockWrapper}>
                                                                            <div className={classes.requestDetailBlock}>
                                                                                {selectedMyRequest && selectedMyRequest.advisorRequestAttachments && selectedMyRequest.advisorRequestAttachments.map((document, index) =>
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
                                                                    </div>
                                                                </Grid>
                                                                <Grid item lg={0} md={0} sm={0}>
                                                                </Grid>
                                                            </Grid>

                                                            {
                                                                messages && messages.map((messageInfo, index) => {
                                                                    return (
                                                                        <div key={index} className={classes.messagesDiv} >
                                                                            <div className={classes.messagesImageWrapper}>
                                                                                {
                                                                                    messageInfo.sender.profileImageUrl ? (
                                                                                        <img className={classes.messagesSenderImage} src={messageInfo.sender.profileImageUrl} alt="img" />
                                                                                    ) : (
                                                                                        <img className={classes.messagesSenderImage} src={userDefaultAvatar} alt="img" />
                                                                                    )
                                                                                }

                                                                            </div>
                                                                            <div className={classes.messagesBlockWrapper}>
                                                                                <div className={classes.messageDetailBlock}>
                                                                                    <Typography component="h4" className={classes.senderName}>
                                                                                        {messageInfo.sender.firstName}
                                                                                    </Typography>
                                                                                    {
                                                                                        messageInfo && messageInfo.chatContentType === "TEXT" && (
                                                                                            <Typography component="h8" className={classes.messageDetailInfo}>
                                                                                                {messageInfo.plainText}
                                                                                            </Typography>
                                                                                        )
                                                                                    }
                                                                                    {
                                                                                        messageInfo && messageInfo.chatContentType === "DOCUMENT" && (
                                                                                            <a className={classes.messageDetailInfo}
                                                                                                onClick={() => downloadFile(messageInfo.documentUrl, messageInfo.plainText)}
                                                                                            >
                                                                                                {messageInfo.plainText}
                                                                                            </a>
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                                <Typography component="label" className={classes.messageDate}> Submitted on {dateToMyDate(messageInfo.createdAt).toLocaleDateString('en-US', option)}, </Typography>
                                                                                <Typography component="p" className={classes.messageTime}> {dateToMyTime(messageInfo.createdAt)} </Typography>
                                                                            </div>
                                                                        </div>

                                                                    )
                                                                })
                                                            }
                                                            <div ref={messagesRef} />
                                                        </div>

                                                        {
                                                            selectedMyRequest.advisorRequestStatus === 'PAID' && (
                                                                <div className={classes.notificationBlock}>
                                                                    <Typography component="h8" className={classes.notificationInfo}>
                                                                        Your request is in pending status. If anyone will accept this request, chat will be enabled.
                                                                    </Typography>
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            selectedMyRequest.advisorRequestStatus === 'COMPLETED' && (
                                                                <div className={classes.notificationBlock}>
                                                                    <Typography component="h8" className={classes.notificationInfo}>
                                                                        This request has been completed and the chat has been disabled.
                                                                    </Typography>
                                                                </div>
                                                            )
                                                        }
                                                    </>
                                                )
                                            }

                                        </Grid>
                                        <Grid item lg={2} md={1} sm={0}></Grid>
                                    </Grid>
                                </RequestDetailContainer>
                            )
                        }
                    </Grid>
                </Grid>
            </div>
            {
                expanded && (
                    <TasksView selectedMyRequest={selectedMyRequest} />
                )
            }
        </div>
    )
}

export default MyRequest;
