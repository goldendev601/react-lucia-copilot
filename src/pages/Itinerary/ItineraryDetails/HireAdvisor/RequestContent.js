import React, {useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid } from "@material-ui/core";
import { SelectField, Button } from "@core/components";
import { getAdvisorRequestTypes, constantsSelector } from "redux/features/constants/constantsSlice";
import { itinerariesSelector } from "redux/features/itineraries/itinerariesSlice";
import { makeStyles } from "@material-ui/core/styles";
import {
    DatePickerField,
    TextField
} from "@core/components";


const RequestContent = ({stepChange, formik}) => {
    const dispatch = useDispatch();
    const { advisorRequestTypes } = useSelector(constantsSelector);
    const { hiredSuccess, isHiring } = useSelector(itinerariesSelector);

    useEffect(() => {
        dispatch(getAdvisorRequestTypes())
    }, [dispatch])
    
    const inputRef = useRef()


    function handleChange(event) {
        if (event.target.files) {
            formik.setFieldValue('attachments', event.target.files)
        }

    }

    function changeFile() {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const handleClick = () => {
        formik.submitForm()
    }

    useEffect(() => {
        if (!isHiring && hiredSuccess) {
            stepChange('advisorPay');
        }
    }, [hiredSuccess]);

    const useStyles = makeStyles({
        requestBtn: {
            fontSize: 12
        },
        nextBtn: {
            fontSize: 16
        },
        requestTitleContent: {
            marginTop: 28,
            color: '#242424',
            fontSize: 14,
            fontWeight: '600'
        },
        deadlineDescription: {
            color: '#000',
            fontSize: 14,
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: 'normal',
            marginTop: 8
        },
        validationErrorNotification: {
            fontStyle: 'italic',
            color: 'red',
            marginTop: '5px !important',
            marginBottom: '5px !important',
            fontSize: '12px'
        },
        contentDiv: {
            minHeight: 600
        },
        selectField: {
            width:'100%',
            background: '#FFFFFF',
            border: '1px solid #E8E8E8',
            letterSpacing: '0.08em',
            padding: '7px 18px',
            textTransform: 'uppercase',
            fontFamily: 'Raleway',
            fontWeight: '600',
            fontSize: '12px',
            lineHeight: '30px',
            color:' #242424',
            appearance:'none',
            outline: 'none',
            marginTop:'12px !important',
            '&:before':{
                outline:'none',
                content: '" "',
                borderBottom: '0px',
                background: '#BA886E',
                borderRadius: '0px',
                position:'absolute',
                left:'auto',
                right:'0',               
                height: '100%',
                width: '54px',
            },
        },
    });

    const classes = useStyles();

    return (
        <>  
            <Grid container className={classes.contentDiv}>
                <Grid item md={12} style={{width: '100%'}} className={classes.selectFields} >
                    <Typography className={classes.requestTitleContent}>Type</Typography>     
                    <Grid item>
                        <SelectField
                            style={{ width: '100%' }}
                            formik={formik}
                            name="advisorRequestTypeId"
                            options={advisorRequestTypes}
                            width="100%"
                            variant="outlined"
                            constants
                        />
                    </Grid>
                </Grid>
                <Grid item md={12} style={{width: '100%'}}>
                    <Typography className={classes.requestTitleContent}>Title</Typography>
                    <Grid item>
                        <TextField
                            width='100%'
                            formik={formik}
                            name="requestTitle"
                            placeholder="Enter title for request"
                        />
                        {formik.touched.requestTitle && formik.errors.requestTitle && <div className={classes.validationErrorNotification}>{formik.errors.requestTitle}</div>}
                    </Grid>
                </Grid>
                <Grid item md={12} style={{width: '100%'}}>
                    <Typography className={classes.requestTitleContent}>Describe your request</Typography>
                    <Grid item>
                        <TextField
                            width='100%'
                            formik={formik}
                            name="notes"
                            placeholder="Please be descriptive with exact details of what you need"
                            multiline={true}
                            rows={10}
                        />
                    </Grid>
                </Grid>
                <Grid item md={12} style={{marginTop: '20px', width: '100%'}}>
                    <input type="file" className={classes.fileInput} multiple onChange={handleChange} ref={inputRef} style={{display: 'none'}} />
                    <Button
                        $outlined
                        className={classes.requestBtn}
                        $width='100%'
                        onClick={() => changeFile()}
                    >
                        Add Attachment
                    </Button>
                </Grid>
                <Grid item md={12} style={{width: '100%'}}>
                    <Typography className={classes.requestTitleContent}>Set deadline request</Typography>
                    <Typography className={classes.deadlineDescription}>
                        If the request is not completed by this date, then it will be automatically cancelled
                    </Typography>
                    <DatePickerField
                        name="deadline"
                        placeholder="Deadline"
                        formik={formik}
                        width="100%" 
                        placement="topStart"                       
                    />
                </Grid>
                <Grid item md={12} style={{marginTop: '30px', width: '100%'}}>
                    <Button
                        $primary
                        className={classes.nextBtn}
                        $width='100%'
                        onClick={() => {
                            handleClick()
                        }}
                    >
                        Next: Payment
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default RequestContent