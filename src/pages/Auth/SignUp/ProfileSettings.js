import authStyles from "styles/muiStyles/authPageStyles";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {UploadPicture, Picture, Button, StyledLink } from "@core/components";
import Checkbox from '@material-ui/core/Checkbox';
import { getAdvisorRequestTypes, constantsSelector } from "redux/features/constants/constantsSlice";
import { Typography, Grid } from "@material-ui/core";
import {useSnackbar} from 'react-simple-snackbar';
import {colors} from "styles/colors";
import {error} from "styles/snackbarStyles/snackbarStyles";
import { RichEdit } from "@core/components";


const ProfileSettings = ({ stepChange, formik }) => {
    const classes = authStyles();
    const dispatch = useDispatch();

    const { advisorRequestTypes } = useSelector(constantsSelector);
    const [checked, setChecked] = React.useState([]);
    const [checkedError, setCheckedError] = React.useState(false);

    const [openSnackbarError] = useSnackbar(error);
    const [profilePicture, setProfilePicture] = useState(['https://s3-lucia-staging.s3.us-east-2.amazonaws.com/fncfranzese3-at-gmailcom-1637321387/profile_picture-LwsKb6LjyOdtvWSI.png']);

    const handlePictures = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const imageFile = e.target.files[0];
            const url = URL.createObjectURL(imageFile)
            setProfilePicture([{
                profileImage: url,
            }]);
            formik.setFieldValue('profileImage', imageFile);
            console.log(formik.values.profileImage);
        }
    }

    const handleSelect = (task) => {
        let newChecked = [...checked]
        if (checked.findIndex((checkedItem) => checkedItem == task.id) >= 0) {
            newChecked = [...checked.filter(checkedItem => checkedItem != task.id)]
            setChecked(newChecked)
        } else {
            newChecked = [...checked, task.id]
            setChecked(newChecked);
        }
        formik.setFieldValue('copilotDuties', newChecked)
    };

    const deletePicture = () => {
        setProfilePicture([]);
    };

    const gotoPreviousStep = () => {
        stepChange('questions');
    }

    useEffect(() => {
        dispatch(getAdvisorRequestTypes())
    }, [dispatch])

    return (
        <>
            <Typography className={classes.title} variant="h2" component="h2">
                Build Your Profile
            </Typography>
            <Typography className={classes.description} variant="body1">
                These details will be visible to Lucia users looking to hire a Co-Pilot, so make sure you highlight your skills and specialties!
            </Typography> 
            <div className={classes.photoDiv}>
                {formik.values.profileImage
                    ? <Picture width={'150px'} height={'150px'} deleteImage={deletePicture}
                                imageSrc={URL.createObjectURL(formik.values.profileImage)}/>
                    : <UploadPicture width={'150px'} height={'150px'} profile={true}
                                        handlePictures={handlePictures}/>
                }
            </div>  
            <div className={classes.notesDiv}>
                <RichEdit
                    formik={formik}
                    label="Bio"
                    name='bio'
                    placeholder={"Enter your bio here"}
                />    
            </div>
            <Grid item md={12} style={{width: '100%', marginTop: '80px'}}>
                <Typography className={classes.requestTitleContent}>Select your areas of expertise to be best matched with incoming Co-Pilot requests:</Typography>
                {advisorRequestTypes && advisorRequestTypes.map((task, index) =>
                <>
                    {
                        task.isActive && (
                            <div>
                                <div key={index} style={{display: 'flex'}} className={classes.requestCheckBoxWrapper}>
                                    <>
                                        <Checkbox
                                            checked={formik.values.copilotDuties.findIndex(checkedItem => checkedItem === task.id) >= 0}
                                            onChange={(e) => handleSelect(task)}
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                        <div className={classes.tasksContainer}>
                                            <div>
                                                <Typography style={{fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '14px', lineHeight: '20px'}}>
                                                    {task.description}
                                                </Typography>
                                            </div>
                                        </div>
                                    </>
                                </div>
                            </div>
                        )
                    }
                </>
                )}
                {checkedError && <div className={classes.validationErrorNotification}>You should select at least a task.</div>}
                
            </Grid>
            <div className={classes.additionalActions2}>
                <Button
                    onClick={() => {
                        if (!formik.isValid) {
                            openSnackbarError('Fill in all the fields.')
                        }
                    }}
                    $primary
                    type="submit"
                    $width="100%"
                    style={{ backgroundColor: `${colors.black1}` }}
                >
                    Submit Your Evaluation
                </Button>
                <div style={{ display: 'flex', marginTop: '10px' }}>
                    <StyledLink $borderbottom={true} onClick={() => gotoPreviousStep()}> Back </StyledLink>
                </div>
            </div>
        </>
    )
}

export default ProfileSettings