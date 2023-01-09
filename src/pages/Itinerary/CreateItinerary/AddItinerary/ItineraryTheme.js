import React, { useEffect } from "react";
import ItineraryLogoPicture from "@core/components/Pictures/ItineraryLogoPicture/ItineraryLogoPicture";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyDesigns, itinerariesSelector } from "redux/features/itineraries/itinerariesSlice";
import { SelectField } from "@core/components";
import {makeStyles, Box} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    themeInfo: {
        display: 'block'
    },
    designInfo: {
        width: '250px',
        marginTop: '45px',
        marginLeft: '30px'
    }    
}));

const ItineraryTheme = ({formik, ...props}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPropertyDesigns())
    }, [dispatch])

    const { propertyDesigns } = useSelector(itinerariesSelector);
    const classes = useStyles();

    return (
        <div className={classes.themeInfo}> 
            {/* <ItineraryLogoPicture {...props}/> */}
            <Box className={classes.designInfo}>
                <SelectField
                    formik={formik}
                    label="Design"
                    name="propertyDesignId"
                    options={propertyDesigns}                
                    fieldName="propertyDesignId"
                    propertyName="propertyDesignId"
                    constants
                />
            </Box>
        </div>
    )
}

export default ItineraryTheme;