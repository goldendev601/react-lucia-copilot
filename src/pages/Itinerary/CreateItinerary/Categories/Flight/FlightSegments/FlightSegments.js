import React, {useEffect, useState} from "react";
import { addItineraryStyles } from "styles/muiStyles";
import { Typography, Popover, TextField, makeStyles } from "@material-ui/core";
import { AddNewButton, Loading, AutocompleteH, DatePickerField, Button, TimePickerField } from "@core/components";
import {convertDate} from "utils";
import moment from "moment";
import { FieldArray, FormikProvider } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { Trash } from "iconoir-react";
import { colors } from "styles/colors";
import { WarningCircledOutline } from "iconoir-react";
import IconButton from "@material-ui/core/IconButton";
import {
    bookingsSelector,
    deleteItineraryBookingSegment
} from "redux/features/itineraries/bookings/bookingsSlice";
import {debounce} from "debounce";
import { flightsSelector, searchFlights, setEditSegment } from "redux/features/flights/flightsSlice";
import { constantsSelector } from "redux/features/constants/constantsSlice";
import { itinerariesSelector } from "redux/features/itineraries/itinerariesSlice";
import popoverScreenshot from '../../../../../../assets/popover2.png'
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const useStyles = makeStyles(() => ({
    inputLabelRoot: {
        width: '380px',
    }
}));


const FlightSegments = ({ formik }) => {
    const classes = addItineraryStyles();
    const dispatch = useDispatch();
    const segmentClasses = useStyles();

    const { isFetching, flights, editSegment } = useSelector(flightsSelector);
    const { airlines } = useSelector(constantsSelector);
    const { booking, startDateInfo} = useSelector(bookingsSelector);
    const {itineraryId} = useSelector(itinerariesSelector)

    const [anchorEl, setAnchorEl] = React.useState(null);

    const deleteSegment = (remove, index, segment) => {
        if (segment.hasOwnProperty('id')) {
            const {id} = segment;
            const apiPayload = {
                itineraryId: booking?.itineraryId,
                bookingId: booking?.id,
                segmentId: id,
                bookingCategory: 'flights',
            }
            dispatch(deleteItineraryBookingSegment(apiPayload));
            remove(index);
        } else {
            remove(index);
        }
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const { packedItinerary } = useSelector(itinerariesSelector);

    const {
        startDate,
        endDate
    } = packedItinerary || {};

    const itineraryStartDate = new Date(startDate);
    const itineraryEndDate = new Date(endDate);

    // const fetchFight = (text, name, index) => {
    //     const segment = formik.values.segments[index];
    //     segment[name] = text
    //     if (segment.airline !== '' && segment.flightNumber !== '' && segment.departureDay !== '') {
    //         const airline = airlines.find((airline_item) => airline_item.icao === segment.airline)
    //         if (airline) {
    //             const flightNumber = airline.iata + segment.flightNumber;
    //             dispatch(setEditSegment(index));
    //             const apiPayload = {
    //                 itineraryId: itineraryId,
    //                 flightNumber: flightNumber,
    //                 departureDate: convertDate(segment.departureDay),
    //             }
    //             debounce(dispatch(searchFlights(apiPayload)), 1000);
    //         }
    //     }
    // }

    const searchFlightFun = (index) => {
        const segment = formik.values.segments[index];
        if (segment.airline !== '' && segment.flightNumber !== '' && segment.departureDay !== '') {
            const airline = airlines.find((airline_item) => airline_item.name === segment.airline)
            if (airline) {
                const flightNumber = airline.iata + segment.flightNumber;
                dispatch(setEditSegment(index));
                const apiPayload = {
                    itineraryId: itineraryId,
                    flightNumber: flightNumber,
                    departureDate: convertDate(segment.departureDay),
                }
                debounce(dispatch(searchFlights(apiPayload)), 1000);
            }
        }
    }

    useEffect(() => {
        if (flights && editSegment > -1) {
            const segments = [...formik.values.segments];
            if (segments.length > 0 && segments[editSegment]) {
                segments[editSegment].arrivalTime = moment.parseZone(flights?.arrivalDateTime);
                segments[editSegment].departureTime = moment.parseZone(flights?.departureDateTime);
                segments[editSegment].arrivalDay = new Date(flights?.arrivalDateTime);
                segments[editSegment].from = flights?.flightFrom;
                segments[editSegment].to = flights?.flightTo;
                formik.setValues({
                    ...formik.values,
                    segments: segments
                })
            }
        }
    }, [flights, editSegment]);

    return (
        <Loading isFetching={isFetching}>
            <FormikProvider value={formik}>
                <FieldArray name="segments">
                    {({ remove, push }) => {
                        return (
                        <React.Fragment>
                            {formik.values.segments.length > 0 &&
                                formik.values.segments.map((segment, index) => {
                                    return (
                                    <>
                                        <div style={{ width: 380, paddingLeft: '30px', paddingRight: '30px', paddingTop: '30px' }}>
                                            <Typography variant="h2" style={{ fontSize: '14px', fontFamily: 'Raleway', color: '#242424', fontWeight: '600' }}>
                                                FLIGHT SEGMENT
                                            </Typography>
                                        </div>
                                        <React.Fragment key={index}>
                                            <div className={`${classes.information} ${classes.formPadding}`}>
                                                <div style={{ width: 380 }}>
                                                    <div className={classes.spacing}>
                                                        <div>
                                                            <AutocompleteH
                                                                options={airlines}
                                                                formik={formik}
                                                                name={`segments[${index}].airline`}
                                                                value={formik.values.segments[index].airline || ''}
                                                                onChange={(e, value) => {
                                                                    if (value) {
                                                                        formik.setFieldValue(`segments[${index}].airline`, value)
                                                                    } else {
                                                                        formik.setFieldValue(`segments[${index}].airline`, '')
                                                                    }
                                                                }}
                                                                label="Select Airline (*)"
                                                                placeholder="Enter airline name"
                                                                width="380px"
                                                                labelMb="7px"
                                                                iconEnd={
                                                                    <WarningCircledOutline className={classes.warningCircleIcon} aria-describedby={id} variant="contained" onClick={handleClick} />
                                                                }
                                                            />
                                                            <Popover
                                                                id={id}
                                                                open={open}
                                                                anchorEl={anchorEl}
                                                                onClose={handleClose}
                                                                anchorOrigin={{
                                                                    vertical: 'center',
                                                                    horizontal: 'right',
                                                                }}
                                                                transformOrigin={{
                                                                    vertical: 'center',
                                                                    horizontal: 'left',
                                                                }}
                                                            >
                                                                <div className={classes.popoverDiv}>
                                                                    <Typography className={classes.popoverInstruction}>
                                                                        First select your airline and enter your flight number
                                                                    </Typography>
                                                                    <Typography className={classes.popeoverDescription}>
                                                                        Your flight number should look like this 960 (You can put only numbers in this field. no spaces and all caps )
                                                                    </Typography>
                                                                    <div className={classes.popoverInputDiv}>
                                                                        <img onError={(e) => {
                                                                            e.target.onerror = null;
                                                                            e.target.src = popoverScreenshot
                                                                        }} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} src={popoverScreenshot}
                                                                            alt="" />
                                                                    </div>
                                                                    <Typography className={classes.popoverInstruction}>
                                                                        After selecting this, enter the departure day then click the search button.
                                                                    </Typography>
                                                                    <Typography className={classes.popoverInstruction}>
                                                                        This will validate your flight and add the departure and destination cities.
                                                                    </Typography>
                                                                </div>
                                                            </Popover>
                                                            {
                                                                formik.touched.segments && formik.touched.segments[index] && formik.touched.segments[index].airline && formik.errors.segments && formik.errors.segments[index] && formik.errors.segments[index].airline && <div className={classes.validationErrorNotification}>airline is required</div>
                                                            }  
                                                        </div>
                                                        
                                                        <TextField
                                                            style={{width: '380px'}}
                                                            formik={formik}
                                                            label="Select Flight Number (*)"
                                                            name={`segments[${index}].flightNumber`}
                                                            placeholder="Enter number flight ex (960)"
                                                            value={formik.values.segments[index].flightNumber || ''}
                                                            onChange={(e) => {
                                                                formik.handleChange(e);
                                                            }}
                                                            error={formik.touched[`segments[${index}].flightNumber`] && Boolean(formik.errors[`segments[${index}].flightNumber`])}
                                                            InputLabelProps={{
                                                                shrink: true, classes: {
                                                                    root: segmentClasses.inputLabelRoot
                                                                }
                                                            }}
                                                            InputProps={{
                                                                endAdornment: (<Button $primary $width='72px' style={{height: '23px', fontSize: '12px'}} onClick={() => searchFlightFun(index)}>Search</Button>) 
                                                            }}
                                                           
                                                        />   
                                                        {
                                                            formik.touched.segments && formik.touched.segments[index] && formik.touched.segments[index].flightNumber && formik.errors.segments && formik.errors.segments[index] && formik.errors.segments[index].flightNumber && <div className={classes.validationErrorNotification}>{formik.errors.segments[index].flightNumber}</div>
                                                        }                                                    
                                                        <TextField
                                                            style={{width: '380px'}}
                                                            formik={formik}
                                                            label="Departure City (*)"
                                                            name={`segments[${index}].from`}
                                                            placeholder="Enter city"
                                                            value={formik.values.segments[index].from || ''}
                                                            onChange={formik.handleChange}                                                            
                                                            error={formik.touched[`segments[${index}].from`] && Boolean(formik.errors[`segments[${index}].from`])}
                                                            InputLabelProps={{
                                                                shrink: true, classes: {
                                                                    root: segmentClasses.inputLabelRoot
                                                                }
                                                            }}
                                                        />
                                                        {
                                                            formik.touched.segments && formik.touched.segments[index] && formik.touched.segments[index].from && formik.errors.segments && formik.errors.segments[index] && formik.errors.segments[index].from && <div className={classes.validationErrorNotification}>Departure city is required</div>
                                                        }
                                                        <TextField
                                                            style={{width: '380px'}}
                                                            formik={formik}
                                                            label="Arrival City (*)"
                                                            name={`segments[${index}].to`}
                                                            placeholder="Enter city"
                                                            value={formik.values.segments[index].to || ''}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched[`segments[${index}].to`] && Boolean(formik.errors[`segments[${index}].to`])}
                                                            InputLabelProps={{
                                                                shrink: true, classes: {
                                                                    root: segmentClasses.inputLabelRoot
                                                                }
                                                            }}
                                                        />
                                                        {
                                                            formik.touched.segments && formik.touched.segments[index] && formik.touched.segments[index].to && formik.errors.segments && formik.errors.segments[index] && formik.errors.segments[index].to && <div className={classes.validationErrorNotification}>Arrival city is required</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div style={{ width: 380 }}>
                                                    <div className={classes.spacing} style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <StyledContainer>
                                                            <TextField
                                                                style={{width: '380px'}}
                                                                formik={formik}
                                                                label="Operated by (*)"
                                                                name={`segments[${index}].airlineOperator`}
                                                                placeholder="Enter here"
                                                                value={formik.values.segments[index].airlineOperator || ''}
                                                                onChange={formik.handleChange}
                                                                error={formik.touched[`segments[${index}].airlineOperator`] && Boolean(formik.errors[`segments[${index}].airlineOperator`])}
                                                                InputLabelProps={{
                                                                    shrink: true, classes: {
                                                                        root: segmentClasses.inputLabelRoot
                                                                    }
                                                                }}
                                                            />
                                                        </StyledContainer>
                                                        {
                                                            formik.touched.segments && formik.touched.segments[index] && formik.touched.segments[index].airlineOperator && formik.errors.segments && formik.errors.segments[index] && formik.errors.segments[index].airlineOperator && <div className={classes.validationErrorNotification}>{formik.errors.segments[index].airlineOperator}</div>
                                                        }
                                                        <StyledContainer>
                                                            <TextField
                                                                style={{width: '380px'}}
                                                                formik={formik}
                                                                label="Duration"
                                                                name={`segments[${index}].durationInMinutes`}
                                                                placeholder="Duration in minutes"
                                                                value={formik.values.segments[index].durationInMinutes || ''}
                                                                onChange={formik.handleChange}
                                                                error={formik.touched[`segments[${index}].durationInMinutes`] && Boolean(formik.errors[`segments[${index}].durationInMinutes`])}
                                                                InputLabelProps={{
                                                                    shrink: true, classes: {
                                                                        root: segmentClasses.inputLabelRoot
                                                                    }
                                                                }}
                                                            />
                                                        </StyledContainer>
                                                        <StyledContainer>
                                                            <div>
                                                                <DatePickerField
                                                                    name={`segments[${index}].departureDay`}
                                                                    label="Departure day (*)"
                                                                    placeholder="Departure day"
                                                                    formik={formik}
                                                                    width="180px"
                                                                    startDate={itineraryStartDate}
                                                                    endDate={itineraryEndDate}
                                                                    value={formik.values.segments[index].departureDay}
                                                                    onChange={(e) => {
                                                                        formik.setFieldValue(`segments[${index}].departureDay`, e)
                                                                    }}
                                                                />
                                                                {
                                                                    formik.touched.segments && formik.touched.segments[index] && formik.touched.segments[index].departureDay && formik.errors.segments && formik.errors.segments[index] && formik.errors.segments[index].departureDay && <div className={classes.validationErrorNotification}>{formik.errors.segments[index].departureDay}</div>
                                                                }
                                                            </div>
                                                            <div>
                                                                <TimePickerField
                                                                    width="180px"
                                                                    name={`segments[${index}].departureTime`}
                                                                    label="Departure Time (*)"
                                                                    formik={formik}
                                                                    placeholder=" "
                                                                    value={formik.values.segments[index].departureTime}
                                                                />
                                                                {
                                                                    formik.touched.segments && formik.touched.segments[index] && formik.touched.segments[index].departureTime && formik.errors.segments && formik.errors.segments[index] && formik.errors.segments[index].departureTime && <div className={classes.validationErrorNotification}>{formik.errors.segments[index].departureTime}</div>
                                                                }
                                                            </div>
                                                        </StyledContainer>
                                                        <StyledContainer>
                                                            <div>
                                                                <DatePickerField
                                                                    name={`segments[${index}].arrivalDay`}
                                                                    label="Arrival day (*)"
                                                                    placeholder="Arrival day"
                                                                    formik={formik}
                                                                    width="180px"
                                                                    startDate={itineraryStartDate}
                                                                    endDate={itineraryEndDate}
                                                                    value={formik.values.segments[index].arrivalDay}
                                                                />
                                                                {
                                                                    formik.touched.segments && formik.touched.segments[index] && formik.touched.segments[index].arrivalDay && formik.errors.segments && formik.errors.segments[index] && formik.errors.segments[index].arrivalDay && <div className={classes.validationErrorNotification}>{formik.errors.segments[index].arrivalDay}</div>
                                                                }
                                                            </div>
                                                            <div>
                                                                <TimePickerField
                                                                    width="180px"
                                                                    name={`segments[${index}].arrivalTime`}
                                                                    label="Arrival Time (*)"
                                                                    formik={formik}
                                                                    placeholder=" "
                                                                    value={formik.values.segments[index].arrivalTime}
                                                                />
                                                                {
                                                                    formik.touched.segments && formik.touched.segments[index] && formik.touched.segments[index].arrivalTime && formik.errors.segments && formik.errors.segments[index] && formik.errors.segments[index].arrivalTime && <div className={classes.validationErrorNotification}>{formik.errors.segments[index].arrivalTime}</div>
                                                                }
                                                            </div>
                                                        </StyledContainer>
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                        <div style={{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginTop: '20px'
                                            }}>
                                                {formik.values.segments.length > 1 &&
                                                    <IconButton
                                                        style={{paddingLeft: '30px', paddingRight: '30px'}}
                                                        disableRipple={true}
                                                        onClick={() => deleteSegment(remove, index, formik.values.segments[index])}
                                                    >
                                                        <Trash color={colors.brand} width={'20px'}/>
                                                        <span style={{marginLeft: '5px'}} className={'span-small'}>Remove this segment</span>
                                                    </IconButton>
                                                }
                                                {formik.values.segments.length - 1 === index &&
                                                    <div style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                                                        <AddNewButton
                                                            values={{
                                                                airline: '',
                                                                airlineOperator: '',
                                                                from: '',
                                                                to: '',
                                                                flightNumber: '',
                                                                departureTime: '',
                                                                arrivalTime: '',
                                                                departureDay: startDateInfo ? new Date(startDateInfo) : '',
                                                                arrivalDay: '',
                                                                durationInMinutes: '',
                                                            }}
                                                            push={push}
                                                            placeholder="Add new segments"
                                                        />
                                                    </div>
                                                }
                                            </div>
                                    </>
                                )})
                            }
                            {formik.values.segments.length === 0 &&
                                <div style={{ paddingLeft: '30px' }}>
                                    <AddNewButton
                                        values={{
                                            airline: '',
                                            airlineOperator: '',
                                            from: '',
                                            to: '',
                                            flightNumber: '',
                                            departureTime: '',
                                            arrivalTime: '',
                                            departureDay: startDateInfo ? new Date(startDateInfo) : '',
                                            arrivalDay: '',
                                            durationInMinutes: '',
                                        }}
                                        push={push}
                                        placeholder="Add new segments"
                                    />
                                </div>
                            }
                        </React.Fragment>
                    )}}
                </FieldArray>
            </FormikProvider>
        </Loading>
    );
}

export default FlightSegments;
