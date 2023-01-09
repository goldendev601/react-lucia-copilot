import authStyles from "styles/muiStyles/authPageStyles";
import React, {useState, useRef} from "react";
import {StyledLink, TextField, Button, PhoneField, Label} from "@core/components";
import {Typography} from "@material-ui/core";
import styled from "styled-components";
import {colors} from "styles/colors";
import { FileDrop } from 'react-file-drop';
import { GoogleDocs } from "iconoir-react";
import {error} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar';

const StyledP = styled.p`
  font-size: 12px; 
  text-align: center;
`;

const StyledP2 = styled.p`
  font-size: 12px; 
  text-align: left;
  color: #BA886E;
  font-weight: bold;
  margin-top: 10px;
`;

const Divider = styled.div`
    text-align: center;
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &:before {
        content: "";
        width: 250px;
        border: 1px solid #000;
        opacity: 0.3;
        position: absolute;
    }
    span {
        padding: 0 20px;
        background: white;
        z-index: 99;
    }
`

const PersonalInfo = ({ stepChange, formik }) => {

    const classes = authStyles();

    const inputRef = useRef()

    const [openSnackbarError] = useSnackbar(error);

    const gotoNextStep = () => {
        if (formik.values && formik.values.firstName && formik.values.lastName && formik.values.resume && formik.values.email && formik.values.phone) {
            stepChange('questions');
        } else {
            openSnackbarError('Fill in all the fields.');
        }
    }

    function changeFile() {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const handleDroppedFile = (files, event) => {
        if (files.length > 0) {
            formik.setFieldValue('resume', files[0])
        }
    }

    function handleChange(event) {
        if (event.target.files) {
            var files = event.target.files;
            if (files.length > 0) {
                formik.setFieldValue('resume', files[0])
            }
        }
    }

    return (
        <>
            <Typography className={classes.title} variant="h2" component="h2">
                Freelance Concierge Evaluation
            </Typography>
            <Typography className={classes.description} variant="body1">
                Thank you for your interest in freelancing through Lucia. Our team will reach out to you once your evaluation has been reviewed.
            </Typography>
            <div className={classes.outer}>
                <div className={classes.row}>
                    <div className={classes.item}>
                        <TextField
                            formik={formik}
                            label="First Name"
                            name="firstName"
                            placeholder="Enter Your First Name"
                            width="280px"
                        />
                        {formik.touched.firstName && formik.errors.firstName && <div className={classes.validationErrorNotification}>{formik.errors.firstName}</div>}
                    </div>
                    <div className={classes.item}>
                        <TextField
                            formik={formik}
                            label="Last Name"
                            name="lastName"
                            placeholder="Enter Your Last Name"
                            width="280px"
                        />
                        {formik.touched.lastName && formik.errors.lastName && <div className={classes.validationErrorNotification}>{formik.errors.lastName}</div>}
                    </div>
                </div>
                <div className={classes.row}>
                    <div className={classes.item}>
                        <TextField
                            formik={formik}
                            label="Email"
                            name="email"
                            placeholder="Enter Your Email Address"
                            width="280px"
                        />
                        {formik.touched.email && formik.errors.email && <div className={classes.validationErrorNotification}>{formik.errors.email}</div>}
                    </div>
                    <div className={classes.item}>
                        <label className="phonenumberlabel" style={{ color: '#242424', fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                            Phone Number
                        </label>
                        <PhoneField
                            label="Phone"
                            formik={formik}
                            name="phone"
                            placeholder="Enter Your Phone Number"
                            width="280px"
                        />
                        {formik.touched.phone && formik.errors.phone && <div className={classes.validationErrorNotification}>{formik.errors.phone}</div>}
                    </div>
                </div>
                <div style={{width: '100%'}}>
                    <label className="phonenumberlabel" style={{ color: '#242424', fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                        Upload your Resume
                    </label>
                    <div class="border-spaced-large" style={{height: '242px'}}>
                        <FileDrop
                            onDrop={handleDroppedFile}
                        >
                            <Label>DRAG AND DROP YOUR RESUME HERE</Label>
                            <Divider><span>OR</span></Divider>
                            <input type="file" multiple onChange={handleChange} ref={inputRef} style={{display: 'none'}} />
                            <Button
                                $primary
                                $width={'250px'}
                                style={{backgroundColor: '#BA886E', marginTop: '15px', marginBottom: '15px'}}
                                onClick={() => changeFile()}
                            >
                                Browse files
                            </Button>
                            <StyledP>Upload up to 1 PDF file. Max file size 2MB each</StyledP>
                        </FileDrop>
                    </div>
                    {
                        formik && formik.values && formik.values.resume && (
                            <StyledP2><GoogleDocs width={'22px'} style={{paddingTop: '5px'}} /> {formik.values.resume.name}</StyledP2>
                        )
                    }
                    {formik.touched.resume && formik.errors.resume && <div className={classes.validationErrorNotification}>Resume is required</div>}
                </div>
                <div className={classes.additionalActions}>
                    <Button
                        $primary
                        type="button"
                        $width="100%"
                        style={{ backgroundColor: `${colors.black1}` }}
                        onClick={() => gotoNextStep()}
                    >
                        Next step: Questions About You
                    </Button>
                    <span style={{ marginTop: '10px' }}>or</span>
                    <div style={{ display: 'flex', marginTop: '10px' }}>
                        <span className='span-lucia'>I already have an account.
                            <StyledLink to='/signin' $borderbottom={true}> Login</StyledLink>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PersonalInfo