import React, {useEffect, useState} from 'react';
import {Typography} from "@material-ui/core";
import * as yup from 'yup';
import {useFormik} from 'formik';
import {Button, PasswordField, StyledLink, TextField} from "@core/components";
import {authPageStyles} from "styles";
import {useSnackbar} from 'react-simple-snackbar'
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {colors} from "styles/colors";
import Logo from "assets/Logo";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom"
import {loginUser, userSelector, clearState} from "redux/features/auth/authSlice";
import {createErrorMessage} from "../../../utils";
import * as PusherPushNotifications from "@pusher/push-notifications-web";

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(6, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});


function initializeBeam({ userId, token}){

    console.log(process.env.REACT_APP_PUSHER_BEAM_AUTH_URL);
    console.log(process.env.REACT_APP_PUSHER_BEAM_INSTANCE_ID);

    const tokenProvider = new PusherPushNotifications.TokenProvider({
        url: process.env.REACT_APP_PUSHER_BEAM_AUTH_URL,      // the url should be dynamic, staging or live
        queryParams: {
            token: token
        }
    })

    const beamsClient = new PusherPushNotifications.Client({
        instanceId: process.env.REACT_APP_PUSHER_BEAM_INSTANCE_ID, // this should come from ENV
    });

    beamsClient
        .start()
            .then((beamsClient) => beamsClient.getDeviceId())
            .then((deviceId) =>
                {
                    console.log("Successfully registered with Beams. Device ID:", deviceId);
                }
            )
        .then(() => beamsClient.setUserId( userId, tokenProvider))
        .then(() => {
            console.log('User ID has been set');
        })
        .catch(e => {
            console.error('Could not authenticate with Beams:', e);
        })
        .catch(console.error);
}

const SignIn = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const {isSuccess, isError, errorMessage, user, accessToken} = useSelector(userSelector);
    const classes = authPageStyles();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        validateOnMount: true,
        onSubmit: (values) => {
            dispatch(loginUser(values));
        }
    });

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const [showPassword, setShowPassword] = useState({
        password: false,
    });
    const handleClickShowPassword = (propertyName) => setShowPassword(({
        [propertyName]: !showPassword[propertyName]
    }));

    useEffect(() => {
        if (isError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearState());
        }

        if (isSuccess) {
            openSnackbarSuccess('You are successfully signed in');
            dispatch(clearState());
            if (user.hasValidLicense) {
                history.push('/');
            } else {
                // history.push('/subscription');
                history.push('/');
            }
        }
    }, [isError, isSuccess]);

    useEffect(() => {
        if (user && accessToken) {
            let userAgent = navigator.userAgent;
            if(userAgent.match(/chrome|chromium|crios/i)) {
                const pushNotificationUrl = `${process.env.REACT_APP_BASE_URL}/beam?token=${accessToken}&userId=${user.id}&redirect_url=${process.env.REACT_APP_DOMAIN_URL}`
                window.location.href = pushNotificationUrl;
            }
        }
    }, [user, accessToken])

    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <div className='logo'>
                    <Logo/>
                </div>
                <Typography className={classes.description} variant="body1"/>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        formik={formik}
                        label="Email"
                        name="email"
                        placeholder="Enter email address"
                        width="100%"
                    />
                    <PasswordField
                        fullWidth
                        style={{marginTop: '30px'}}
                        formik={formik}
                        handleClickShowPassword={handleClickShowPassword}
                        showPassword={showPassword}
                        label="Password"
                        name="password"
                    />
                    <div className={classes.formActions}>
                        <StyledLink $borderbottom={true} to='/recovery'>
                            Forgot password
                        </StyledLink>
                        <Button
                            $primary
                            type="submit"
                            $width="180px"
                            onClick={() => {
                                !formik.isValid && openSnackbarError('Fill in all the fields.')
                            }}
                            style={{backgroundColor: `${colors.black1}`}}
                        >
                            Login as concierge
                        </Button>
                    </div>
                    <div className={classes.additionalActions}>
                        <span>or</span>
                        <StyledLink $borderbottom={true} to='/signup'>
                            Create account
                        </StyledLink>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
