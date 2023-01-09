import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from '@material-ui/core/Checkbox';
import { setTasksViewExpanded, markTaskCompleted, markTaskUnCompleted } from "redux/features/request/requestSlice";
import { IconButton } from "@material-ui/core";
import { FastArrowRight } from "iconoir-react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { dateToMyDate, dateToMyTimeAMPM } from "utils";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';


const TravelersWrapper = styled.div`
  display: flex;
  margin-top: 20px;
`;

const TravelersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  & > div:not(:first-child) {
    margin-top: 10px;
  }
`;

const Row = styled.div`
  display: flex;
  width: 100%;

  & > div:not(:first-child) {
    margin-left: 50px;
  }
`;


const TasksView = ({ selectedMyRequest }) => {

    console.log(selectedMyRequest);

    const dispatch = useDispatch();

    const [checked, setChecked] = React.useState([]);

    const closeTasksView = () => {
        dispatch(setTasksViewExpanded(false));
    }

    const option = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }

    const option1 = {
        day: 'numeric',
        month: 'numeric'
    }

    const handleChange = (task) => {
        if (checked.indexOf(task.id) >= 0) {
            setChecked([...checked.filter(checkedItem => checkedItem != task.id)])
            if (task.completed) {
                const data = {
                    task_id: task.id
                }
                dispatch(markTaskUnCompleted({ advisorId: selectedMyRequest.id, data: data }))
            }
        } else {
            setChecked([...checked, task.id]);
        }
    };

    const markCompletedFun = () => {
        for (let i = 0; i < checked.length; i++) {
            const data = {
                task_id: checked[i]
            }
            dispatch(markTaskCompleted({ advisorId: selectedMyRequest.id, data: data }))
        }
    }

    useEffect(() => {
        if (selectedMyRequest && selectedMyRequest.tasks && selectedMyRequest.tasks.length > 0) {
            setChecked(selectedMyRequest.tasks.filter(task => task.completed).map(task => task.id))
        }
    }, [selectedMyRequest])


    const useStyles = makeStyles({
        root: {
            width: '350px',
            backgroundColor: '#FFF',
            height: '100vh',
            boxShadow: '0px 24px 34px rgba(0, 0, 0, 0.35)'
        },
        header: {
            width: '100%',
            height: '66px',
            display: 'flex',
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '18px',
            paddingBottom: '18px',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)'
        },
        title: {
            color: '#242424',
            fontWeight: '600',
            fontFamily: 'Raleway',
            fontSize: '17px',
            lineHeight: '30px'
        },
        iconTitle: {
            color: '#BA886E',
            fontWeight: '600',
            fontFamily: 'Raleway',
            fontSize: '14px',
            lineHeight: '16px',
            marginRight: '10px'
        },
        mainContent: {
            width: '100%',
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '18px',
            paddingBottom: '18px',
            alignItems: 'center',
            textAlign: 'center',
        },
        tasksContent: {
            width: '100%',
            alignItems: 'center',
            textAlign: 'center',
            border: '1px solid #D5D5D5',
            borderRadius: '10px'
        },
        profilePicture: {
            textAlign: 'center'
        },
        profileImage: {
            width: '96px',
            height: '96px',
            objectFit: 'cover',
            borderRadius: '96px'
        },
        profileName: {
            textAlign: 'center',
            color: '#242424',
            fontWeight: '600',
            fontFamily: 'Raleway',
            fontSize: '20px',
            lineHeight: '20px',
            marginTop: '4px'
        },
        profileInfo: {
            textAlign: 'center',
            color: '#242424',
            fontWeight: '400',
            fontFamily: 'Raleway',
            fontSize: '14px',
            lineHeight: '20px',
            marginTop: '8px'
        },
        label: {
            textAlign: 'left',
            color: '#242424',
            fontWeight: '600',
            fontFamily: 'Raleway',
            fontSize: '14px',
            lineHeight: '20px',
            marginTop: '8px'
        },
        info: {
            textAlign: 'left',
            color: '#242424',
            fontWeight: '400',
            fontFamily: 'Raleway',
            fontSize: '14px',
            lineHeight: '20px',
            marginTop: '8px'
        },
        documentDiv: {
            textAlign: 'center',
            borderRadius: '5px',
            height: '48px',
            width: '100%',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#E8E8E8',
            alignItems: 'center',
            marginTop: '8px',
            paddingLeft: '12px',
            paddingRight: '12px',
            display: 'flex'
        },
        pdfIconDiv: {
            backgroundColor: '#E3555F',
            borderRadius: '5px',
            width: '49px',
            height: '21px',
            fontSize: '12px',
            color: '#FFF',
            paddingTop: '3px',
            marginRight: '10px',
            textAlign: 'center'
        },
        markCompletedBtn: {
            width: '100%',
            fontSize: '13px',
            lineHeight: '15px',
            fontWeight: '600',
            fontFamily: 'Raleway',
            backgroundColor: '#BA886E',
            color: '#FFF',
            textAlight: 'center',
            paddingTop: '10px',
            paddingBottom: '10px',
            "&:hover": {
                cursor: 'pointer'
            }
        },
        markCompletedDisabledBtn: {
            width: '100%',
            fontSize: '13px',
            lineHeight: '15px',
            fontWeight: '600',
            fontFamily: 'Raleway',
            backgroundColor: '#BA886E',
            color: '#FFF',
            textAlight: 'center',
            paddingTop: '10px',
            paddingBottom: '10px',
            opacity: 0.4
        },
        latestActivitiesInfo: {
            color: '#828282',
            fontFamily: 'Raleway',
            fontWeight: '400',
            fontSize: '10px',
            lineHeight: '20px',
            textTransform: 'capitalize',
            textAlign: 'left',
            marginTop: '8px'
        }
    })

    const classes = useStyles();


    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography className={classes.title}>Tasks and Activies</Typography>
                <IconButton
                    color="secondary"
                    aria-label="edit-action"
                    onClick={closeTasksView}
                >
                    <Typography className={classes.iconTitle}>Hide</Typography>
                    <FastArrowRight width="18px" height="18px" color="#BA886E" />
                </IconButton>
            </div>
            <div className={classes.mainContent}>
                <div className={classes.tasksContent}>
                    {
                        selectedMyRequest && selectedMyRequest.tasks && selectedMyRequest.tasks.length > 0 && (
                            <div className={classes.mainContent}>
                                <Typography className={classes.label}>Tasks</Typography>
                                {
                                    selectedMyRequest.tasks.map((task, index) => {
                                        return (

                                            <TravelersWrapper key={index}>
                                                {
                                                    checked.indexOf(task.id) >= 0 ? (
                                                        <>
                                                            <Checkbox
                                                                checked={checked.indexOf(task.id) >= 0}
                                                                onChange={(e) => handleChange(task)}
                                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                                                style={{ padding: '0px', alignItems: 'flex-start', marginRight: '10px' }}
                                                            />
                                                            <TravelersContainer>
                                                                <Row>
                                                                    <Typography style={{ textDecoration: 'line-through', fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '14px', lineHeight: '20px' }}>
                                                                        {task.advisorRequestType}
                                                                    </Typography>
                                                                </Row>
                                                                <Row>
                                                                    <Typography style={{ textDecoration: 'line-through', fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '10px', lineHeight: '15px' }}>
                                                                        {task.explanation}
                                                                    </Typography>
                                                                </Row>
                                                            </TravelersContainer>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Checkbox
                                                                checked={checked.indexOf(task.id) >= 0}
                                                                onChange={(e) => handleChange(task)}
                                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                                                style={{ padding: '0px', alignItems: 'flex-start', marginRight: '10px' }}
                                                            />
                                                            <TravelersContainer>
                                                                <Row>
                                                                    <Typography style={{ fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '14px', lineHeight: '20px' }}>
                                                                        {task.advisorRequestType}
                                                                    </Typography>
                                                                </Row>
                                                                <Row>
                                                                    <Typography style={{ fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '10px', lineHeight: '15px' }}>
                                                                        {task.explanation}
                                                                    </Typography>
                                                                </Row>
                                                            </TravelersContainer>
                                                        </>
                                                    )
                                                }

                                            </TravelersWrapper>
                                        )
                                    })
                                }
                                {
                                    checked.length > 0 ? (
                                        <div style={{ width: '100%', margin: '20px auto', display: 'flex', justifyContent: 'center' }}>
                                            <div className={classes.markCompletedBtn}
                                                onClick={() => markCompletedFun()}
                                            >
                                                Mark as Completed
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ width: '100%', margin: '20px auto', display: 'flex', justifyContent: 'center' }}>
                                            <div className={classes.markCompletedDisabledBtn}
                                            >
                                                Mark as Completed
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        )
                    }

                </div>
            </div>
            <div className={classes.mainContent}>
                {
                    selectedMyRequest && selectedMyRequest.activities && selectedMyRequest.activities.length > 0 && (
                        <div className={classes.mainContent}>
                            <Typography className={classes.label}>Recent Activities</Typography>
                            {
                                selectedMyRequest.activities && selectedMyRequest.activities.length > 0 && (
                                    <Typography className={classes.latestActivitiesInfo}>
                                        Last updated {dateToMyDate(selectedMyRequest.activities[selectedMyRequest.activities.length - 1].createdAt).toLocaleDateString('en-US', option)}, {dateToMyTimeAMPM(selectedMyRequest.activities[selectedMyRequest.activities.length - 1].createdAt)}
                                    </Typography>
                                )
                            }

                            <Timeline align="both" style={{ marginTop: '30px' }}>
                                {
                                    selectedMyRequest.activities && selectedMyRequest.activities.length > 0 && selectedMyRequest.activities.map((activity, index) => {
                                        return (
                                            <TimelineItem>
                                                <TimelineOppositeContent>
                                                    <Typography style={{ fontFamily: 'Raleway', fontWeight: '700', color: '#000000', fontSize: '12px', lineHeight: '12px' }}>
                                                        {dateToMyDate(activity.createdAt).toLocaleDateString('en-US', option1)}
                                                    </Typography>
                                                </TimelineOppositeContent>
                                                <TimelineSeparator>
                                                    {
                                                        index === 0 ? (
                                                            <TimelineDot />
                                                        ) : (
                                                            <TimelineDot variant="outlined" />
                                                        )
                                                    }
                                                    {
                                                        (index < (selectedMyRequest.activities.length - 1)) && (
                                                            <TimelineConnector />
                                                        )
                                                    }
                                                </TimelineSeparator>
                                                <TimelineContent>
                                                    <Typography style={{ fontFamily: 'Raleway', fontWeight: '500', color: '#BA886E', fontSize: '10px', lineHeight: '10px', textTransform: 'capitalize' }}>
                                                        {activity.details}
                                                    </Typography>
                                                </TimelineContent>
                                            </TimelineItem>
                                        )
                                    })
                                }
                            </Timeline>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default TasksView