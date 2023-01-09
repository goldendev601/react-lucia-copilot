import React, {useEffect, useState} from "react";
import authStyles from "styles/muiStyles/authPageStyles";
import {Container} from "@material-ui/core";
import {useFormik} from "formik";

import * as yup from "yup";
import AccountApproval from "../AccountApproval/AccountApproval";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar'

import Logo from "assets/Logo";
import {clearState, registerUser, userSelector} from "redux/features/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {createErrorMessage, objFieldsToSnakeCase, removeProperty} from "utils";
import PersonalInfo from "./PersonalInfo";
import Questions from "./Questions";
import Documentation from "./Documentation";
import ProfileSettings from "./ProfileSettings";

const validationSchema = yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    resume: yup.string().required('Resume is required'),
    freeTimeRecommendations: yup.string().required("You didn't answer to some questions"),    
    confidentialHandling: yup.string().required("You didn't answer to some questions."),
    experience: yup.string().required("You didn't answer to some questions."),
    contactReferences: yup.string().required("You didn't answer to some questions."),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    phone: yup
        .string()
        .transform((value, originalValue) => (/\s/.test(originalValue) ? NaN : value))
        .required('Phone number is required'),    
});

const SignUp = () => {
    const classes = authStyles();
    const dispatch = useDispatch();
    const {isSuccess, isError, errorMessage} = useSelector(userSelector);

    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
            resume: null,
            copilotDuties: ['1'],
            howToFulfill: '',
            freeTimeRecommendations: '',
            strengths: '',
            weaknesses: '',
            confidentialHandling: '',
            experience: '',
            contactReferences: '',
            otherInfo: '',
            profileImage: null,
            bio: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {   
            const formData = new FormData();
            formData.append(`resume`, values?.resume)
            formData.append(`phone`, values.phone.replaceAll(' ', ''))
            formData.append(`email`, values?.email)
            formData.append(`first_name`, values?.firstName)
            formData.append(`last_name`, values?.lastName)
            formData.append(`how_to_fulfill`, values?.howToFulfill)
            formData.append(`free_time_recommendations`, values?.freeTimeRecommendations)
            formData.append(`strengths`, values?.strengths)
            formData.append(`weaknesses`, values?.weaknesses)
            formData.append(`confidential_handling`, values?.confidentialHandling)
            formData.append(`experience`, values?.experience)
            formData.append(`contact_references`, values?.contactReferences)
            if (values?.otherInfo) {
                formData.append(`other_info`, values?.otherInfo)
            }
            formData.append(`profile_image`, values?.profileImage)
            formData.append(`bio`, values?.bio)

            var copilotDuties = values.copilotDuties;
            for(let index = 0; index < copilotDuties.length; index ++ ) {
                formData.append(`copilot_duties[${index}]`, copilotDuties[index])
            }
            dispatch(registerUser(formData));
        }
    });
    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    useEffect(() => {
        if (isError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearState());
        }

        if (isSuccess) {
            openSnackbarSuccess('Your account has been successfully created');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess]);

    const [step, setStep] = useState("peronalInfo");

    return (
        isSuccess
            ? <AccountApproval/>
            : <Container fixed>
                <div className={classes.wrapper}>
                    <div className={classes.container}>
                        <div className='logo'>
                            <Logo/>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            {
                                step === 'peronalInfo' && (
                                    <PersonalInfo stepChange = {setStep} formik={formik} />
                                )
                            }
                            {
                                step === 'questions' && (
                                    <Questions stepChange = {setStep} formik={formik} />
                                )
                            }
                            {
                                step === 'profileSettings' && (
                                    <ProfileSettings stepChange = {setStep} formik={formik} />
                                )
                            }
                            {/* {
                                step === 'documentation' && (
                                    <Documentation formik={formik} />
                                )
                            } */}
                        </form>
                    </div>
                </div>
            </Container>
    )
}

SignUp.layout = 'notAuthorizedLayout';

export default SignUp;
