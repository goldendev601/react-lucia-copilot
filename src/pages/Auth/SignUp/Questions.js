import authStyles from "styles/muiStyles/authPageStyles";
import {StyledLink, Button} from "@core/components";
import {Typography} from "@material-ui/core";
import {colors} from "styles/colors";
import { RichEdit } from "@core/components";
import {error} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar';

const Questions = ({ stepChange, formik }) => {
    const classes = authStyles();

    const [openSnackbarError] = useSnackbar(error);

    // const gotoNextStep = () => {
    //     stepChange('documentation');
    // }

    const gotoNextStep = () => {
        if (formik.values && formik.values.experience && formik.values.howToFulfill && formik.values.freeTimeRecommendations && formik.values.confidentialHandling && formik.values.contactReferences) {
            stepChange('profileSettings');
        } else {
            openSnackbarError('Fill in all the fields.');
        }
    }

    const gotoPreviousStep = () => {
        stepChange('peronalInfo');
    }

    return (
        <>
            <Typography className={classes.title} variant="h2" component="h2">
                Questions About You
            </Typography>
            <Typography className={classes.description} variant="body1">
                Please Note: Things like spelling, grammar and content are all important here as we are trying to select the best potential Co-Pilot team to represent Lucia. We would rather answers to be concise and to the point, rather than long and lengthy. Feel free to answer the following in bullet point format.
            </Typography>
            <div className={classes.notesDiv}>
                <RichEdit
                    formik={formik}
                    label="What experiences have prepared you for freelance concierge work in the travel industry?"
                    name='experience'
                    placeholder={"Enter response here"}
                />    
            </div>
            <div className={classes.notesDiv}>
                <RichEdit
                    formik={formik}
                    label="You accept a request you later realize you are not sure how to complete. What would you do?"
                    name='howToFulfill'
                    placeholder={"Enter response here"}
                />    
            </div>
            <div className={classes.notesDiv}>
                <RichEdit
                    formik={formik}
                    label="Concierges are often asked to help travelers figure out how to spend their free time in an area. How would you make recommendations."
                    name='freeTimeRecommendations'
                    placeholder={"Enter response here"}
                />    
            </div>
            {/* <div className={classes.notesDiv}>
                <RichEdit
                    formik={formik}
                    label="What are your strengths?"
                    name='strengths'
                    placeholder={"Enter response here"}
                />    
            </div> */}
            {/* <div className={classes.notesDiv}>
                <RichEdit
                    formik={formik}
                    label="What are your weaknesses? Do they interfere with your ability to be a great concierge?"
                    name='weaknesses'
                    placeholder={"Enter response here"}
                />    
            </div> */}
            <div className={classes.notesDiv}>
                <RichEdit
                    formik={formik}
                    label="How do you handle confidential information?"
                    name='confidentialHandling'
                    placeholder={"Enter response here"}
                />    
            </div>            
            <div className={classes.notesDiv}>
                <RichEdit
                    formik={formik}
                    label="Please share a reference we can contact (Name, Phone Number and Email)"
                    name='contactReferences'
                    placeholder={"Enter response here"}
                />    
            </div>
            <div className={classes.notesDiv}>
                <RichEdit
                    formik={formik}
                    label="Is there anything else you would like us to know?"
                    name='otherInfo'
                    placeholder={"Enter response here"}
                />    
            </div>
            {/* <div className={classes.additionalActions2}>
                <Button
                    // onClick={() => {
                        // if (!formik.isValid) {
                        //     openSnackbarError('Fill in all the fields.')
                        // }
                    // }}
                    // onClick={() => gotoNextStep()}
                    $primary
                    type="submit"
                    $width="100%"
                    style={{ backgroundColor: `${colors.black1}` }}
                >
                    Create Account
                </Button>
                <span style={{ marginTop: '10px' }}>or</span>
                <div style={{ display: 'flex', marginTop: '10px' }}>
                    <span className='span-lucia'>I already have an account.
                        <StyledLink to='/signin' $borderbottom={true}> Login</StyledLink>
                    </span>
                </div>
            </div> */}
            <div className={classes.additionalActions}>
                <Button
                    $primary
                    type="button"
                    $width="100%"
                    style={{ backgroundColor: `${colors.black1}`, marginTop: '25px' }}
                    onClick={() => gotoNextStep()}
                >
                    Next step: Profile settings
                </Button>
                <div style={{ display: 'flex', marginTop: '10px' }}>
                    <StyledLink $borderbottom={true} onClick={() => gotoPreviousStep()}> Back </StyledLink>
                </div>
            </div>
        </>
    )
}

export default Questions