import React from "react";
import { addItineraryStyles } from "styles/muiStyles";
import {Grid} from "@material-ui/core";
import {PriceField, SelectField, TextField} from "@core/components";

const TransportGeneral = ({formik}) => {
    const classes = addItineraryStyles();

    const selectOptions = [
        {name: 'Rail', value: 1},
        {name: 'Ferry', value: 2},
        {name: 'Car', value: 3},
        {name: 'Transfer', value: 4},
    ];

    return (
        <>
        <Grid container justify="space-between">
            <Grid item>
                <SelectField
                    formik={formik}
                    width="180px"
                    label="Transit type (*)"
                    name="transitTypeId"
                    options={selectOptions}
                />
                {formik.touched.transitTypeId && formik.errors.transitTypeId && <div className={classes.validationErrorNotification}>{formik.errors.transitTypeId}</div>}
            </Grid>
            <Grid item>
                <PriceField
                    formik={formik}
                    label="Price"
                    name="price"
                    placeholder="Enter price"
                    width="180px"
                />
            </Grid>           
            <Grid item>
                <TextField
                    formik={formik}
                    label="Service Provider (*)"
                    name="providerName"
                    placeholder="Select a Name"
                />
                {formik.touched.providerName && formik.errors.providerName && <div className={classes.validationErrorNotification}>{formik.errors.providerName}</div>}
            </Grid>
        </Grid>
        <Grid container>
             <Grid item>
                <TextField
                    formik={formik}
                    label="Custom Header Title"
                    name="customHeaderTitle"
                    placeholder="Enter custom header title"
                />
            </Grid>
        </Grid>
        </>
    );
}

export default React.memo(TransportGeneral);
