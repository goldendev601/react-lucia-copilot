import authStyles from "styles/muiStyles/authPageStyles";
import {StyledLink, Button } from "@core/components";
import { Typography} from "@material-ui/core";
import {useSnackbar} from 'react-simple-snackbar';
import {colors} from "styles/colors";
import {error} from "styles/snackbarStyles/snackbarStyles";
import { Download } from "iconoir-react";

const Documentation = ({ formik }) => {
    const classes = authStyles();

    const [openSnackbarError] = useSnackbar(error);

    return (
        <>
            <Typography className={classes.title} variant="h2" component="h2">
                Sign documentation
            </Typography>
            <Typography className={classes.description} variant="body1">
                Please carefully review and read these documents. One is a non-disclosure document that protects the information that is shared from advisors and you. 
            </Typography> 
            <Typography className={classes.description} variant="body1">
                After signing please send the documentation to concierge@letslucia.com
            </Typography>
            <div className={classes.downloadBtnDiv}>
                <div>
                    <Typography className={classes.downloadBtnTitle}>
                        NDA
                    </Typography>
                    <Typography className={classes.downloadBtnDescription}>
                        PDF file - 250kb
                    </Typography>
                </div>
                <a href={process.env.REACT_APP_NDA_FILE} download target="_blank" className={classes.downloadLink}><Download width={'25px'} /></a>
            </div>
            <div className={classes.downloadBtnDiv}>
                <div>
                    <Typography className={classes.downloadBtnTitle}>
                        Agreement
                    </Typography>
                    <Typography className={classes.downloadBtnDescription}>
                        PDF file - 250kb
                    </Typography>
                </div>
                <a href={process.env.REACT_APP_AGREEMENT_FILE} download target="_blank" className={classes.downloadLink}><Download width={'25px'} /></a>
            </div>
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
                    I submitted the documentation
                </Button>
                <span style={{ marginTop: '10px' }}>or</span>
                <div style={{ display: 'flex', marginTop: '10px' }}>
                    <span className='span-lucia'>I already have an account.
                        <StyledLink to='/signin' $borderbottom={true}> Login</StyledLink>
                    </span>
                </div>
            </div>
        </>
    )
}

export default Documentation