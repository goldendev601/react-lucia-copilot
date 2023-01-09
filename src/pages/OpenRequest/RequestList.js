import React, {useEffect} from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { Circle } from "iconoir-react";
import { Typography } from "@material-ui/core";
import { stringLimit} from "utils";
import { acceptRequest, getOpenRequests, requestSelector, selectRequest, markSeen } from "redux/features/request/requestSlice";
import {setConfirmOfferFormOpen} from "redux/features/dialogForms/dialogFormsOpenStateSlice";


export const RequestListContainer = styled.div`
  background-color: white;
  height: 100vh; 
  border-right: 1px solid #D5D5D5;
`;

const RequestList = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOpenRequests())
    }, [dispatch])

    const { openRequests } = useSelector(requestSelector);

    const useStyles = makeStyles({
        title: {
            fontSize: 26,
            fontFamily: 'MADE Mirage',
            fontWeight: 'normal',
            fontStyle: 'normal',
            paddingLeft: 21,
            paddingTop: 21,
            paddingBottom: 21
        },
        requestInfoDiv: {
            width: '100%',
            borderStyle: 'solid',
            borderBottomColor: '#D5D5D5',
            borderBottomWidth: '1px',
            borderTopColor: '#D5D5D5',
            borderTopWidth: '1px',
            paddingLeft: 21,
            paddingRight: 21,
            paddingTop: 17,
            paddingBottom: 17, 
            borderRight: 'none !important',           
            '&:hover': {
                backgroundColor: "#BA886E",
                '& h4': {
                    color: '#FFF'
                },
                '& h6': {
                    color: '#FFF'
                },
                '& h8': {
                    color: '#FFF'
                },
                '& div': {
                    border: '2px solid #FFF'
                }
            }
        },
        requestBtn: {
            width: 127,
            height: 34,
            borderRadius: '17px',
            padding: '0 5px',
            backgroundColor: '#BA886E',
            color: '#FFFFFF',
            textAlign: 'center',
            alignItems: 'center',
            fontFamily: 'Raleway',
            paddingTop: 7,
            '&:hover': {
                cursor: "pointer"
            }            
        },
        requestTitleDiv: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        requestIdInfo: {
            color: '#000000',
            fontSize: '16px',
            fontWeight: 'bold',
            fontFamily: 'Raleway',
            fontStyle: 'normal'
        },
        requestNote: {
            color: '#000000',
            fontSize: '12px',
            fontWeight: '600',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            textTransform: 'uppercase'
        },
        requestDescription: {
            color: '#000000',
            fontSize: '14px',
            fontWeight: '300',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            opacity: 0.6
        }
    });

    const classes = useStyles();

    const handleRequest = (request) => {
        dispatch(selectRequest(request))
        const payload = {
            advisorId: request.id,
        }
        if (request.has_unread_messages) {
            dispatch(markSeen(payload))
        }
    }

    const handleAcceptRequest = (request) => {
        dispatch(setConfirmOfferFormOpen(true));
        dispatch(selectRequest(request));

        // const payload = {
        //     advisor_id: request.id,
        // }
        // dispatch(acceptRequest(payload))        
    }

    return (
        <RequestListContainer>
            <Typography component="h1" className={classes.title}> Open Requests </Typography>
            {
                openRequests && openRequests.map((openRequest, index) => {
                    return (
                        <div className={classes.requestInfoDiv} onClick={() => handleRequest(openRequest)} key={index}>
                            <span className={classes.requestTitleDiv}>
                                {
                                    openRequest.requestTitle && (
                                        <Typography component="h4" className={classes.requestIdInfo}> {openRequest.requestTitle} </Typography>
                                    )
                                }
                                
                                {   openRequest.has_unread_messages && 
                                        <Circle width={'14px'} color={'#BA886E'} />
                                }
                                    
                            </span>
                            {
                                openRequest.owner && (
                                    <Typography component="h6" className={classes.requestNote}> Request for {openRequest.owner} </Typography>
                                )
                            }
                            {
                                openRequest.notes && (
                                    <Typography component="h8" className={classes.requestDescription}> 
                                        {stringLimit(openRequest.notes)}
                                    </Typography>
                                )
                            }
                            <div className={classes.requestBtn} component="btn" onClick={() => handleAcceptRequest(openRequest)} > Accept Request </div>
                        </div>
                    )
                })
            }
        </RequestListContainer>
    );
}

export default RequestList;
