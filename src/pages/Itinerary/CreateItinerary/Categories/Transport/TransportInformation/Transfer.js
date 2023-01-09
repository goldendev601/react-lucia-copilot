import React from "react";
import {useSelector} from "react-redux";
import {Grid, TextField} from "@material-ui/core";
import {DatePickerField, SwitchLucia, TimePickerField} from "@core/components";
import { itinerariesSelector } from "redux/features/itineraries/itinerariesSlice";
import {addItineraryStyles} from "styles";

const Transfer = ({formik}) => {
    const classes = addItineraryStyles();

    const {packedItinerary} = useSelector(itinerariesSelector);

    const {
        startDate,
        endDate        
    } = packedItinerary || {};

    const itineraryStartDate = new Date(startDate);
    const itineraryEndDate = new Date(endDate);

    return (
        <Grid container className={classes.spacing}>
            <Grid container justify="space-between">
                <Grid item>
                    <DatePickerField
                        name="departureDay"
                        label="Departure Day (*)"
                        placeholder="Select Day"
                        formik={formik}
                        startDate={itineraryStartDate}
                        endDate={itineraryEndDate}
                    />
                    {formik.touched.departureDay && formik.errors.departureDay && <div className={classes.validationErrorNotification}>{formik.errors.departureDay}</div>}
                </Grid>
                <Grid item>
                    <TimePickerField
                        name="departureTime"
                        label="Departure Time (*)"
                        placeholder="Select Time"
                        formik={formik}
                    />
                    {formik.touched.departureTime && formik.errors.departureTime && <div className={classes.validationErrorNotification}>{formik.errors.departureTime}</div>}
                </Grid>
                <Grid item>
                    <TextField
                        style={{width: '380px'}}
                        id="transportFrom"
                        name="transportFrom"
                        label="Departure Location"
                        placeholder='Enter location'
                        value={formik.values.transportFrom}
                        onChange={formik.handleChange}
                        error={formik.touched.transportFrom && Boolean(formik.errors.transportFrom)}
                        InputLabelProps={{shrink: true}}
                    />
                </Grid>
            </Grid>
            <Grid container justify="space-between">
                <Grid item>
                    <DatePickerField
                        name="arrivalDay"
                        label="Arrival Day (*)"
                        placeholder="Select Day"
                        formik={formik}
                        startDate={formik.values.departureDay > itineraryStartDate ? formik.values.departureDay : itineraryStartDate}
                        endDate={itineraryEndDate}                        
                    />
                    {formik.touched.arrivalDay && formik.errors.arrivalDay && <div className={classes.validationErrorNotification}>{formik.errors.arrivalDay}</div>}
                </Grid>
                <Grid item>
                    <TimePickerField
                        name="arrivalTime"
                        label="Arrival Time (*)"
                        placeholder="Select Time"
                        formik={formik}
                    />
                    {formik.touched.arrivalTime && formik.errors.arrivalTime && <div className={classes.validationErrorNotification}>{formik.errors.arrivalTime}</div>}
                </Grid>
                <Grid item>
                    <TextField
                        style={{width: '380px'}}
                        id="transportTo"
                        name="transportTo"
                        label="Arrival Location"
                        placeholder='Enter location'
                        value={formik.values.transportTo}
                        onChange={formik.handleChange}
                        error={formik.touched.transportTo && Boolean(formik.errors.transportTo)}
                        InputLabelProps={{shrink: true}}
                    />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item>
                    <TextField
                        style={{width: '380px'}}
                        id="vehicle"
                        name="vehicle"
                        label="Vehicle"
                        placeholder='Enter vehicle'
                        value={formik.values.vehicle}
                        onChange={formik.handleChange}
                        error={formik.touched.vehicle && Boolean(formik.errors.vehicle)}
                        InputLabelProps={{shrink: true}}
                    />
                </Grid>
            </Grid>
            <Grid item style={{display: 'flex'}}>
                <SwitchLucia
                    placeholder="Save supplier to library"
                    value={formik.values.saveToLibrary}
                    name="saveToLibrary"
                    onChangeHandler={formik.handleChange}
                />
            </Grid>
        </Grid>
    );
}

export default React.memo(Transfer);