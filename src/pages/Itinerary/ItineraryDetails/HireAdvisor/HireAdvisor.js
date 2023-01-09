import { useEffect, useState } from 'react';
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { Button } from "@core/components";
import { useDispatch, useSelector } from "react-redux";
import { Cancel } from "iconoir-react";
import {useSnackbar} from 'react-simple-snackbar'
import { makeStyles } from "@material-ui/core/styles";
import { advisorRequestsHire, clearAdvisorId, clearStripeKey, clearState, itinerariesSelector } from "redux/features/itineraries/itinerariesSlice";
import { deleteRequest } from "redux/features/request/requestSlice";
import { convertDate, createErrorMessage } from "utils";
import RequestType from "./RequestType";
import {error} from "styles/snackbarStyles/snackbarStyles";
import RequestContent from "./RequestContent";
import AdvisorPay from "./AdvisorPay";
import Final from "./Final";
import { useFormik } from "formik";
import * as yup from "yup";


const validationSchema = yup.object({
    advisorRequestTypeId: yup
        .number('You should set the advisor request type')
        .required('You should set the advisor request type'),
    requestTitle: yup
        .string('Enter request title')
        .required('Request title is required'),
});


export const HireAdvisorContainer = styled.div`
    position: fixed;
    bottom: 0;
    right: 10px;
    width: 492px;
    background: #FFFFFF;
    box-shadow: 0px 24px 34px rgba(0, 0, 0, 0.35);
    height: calc(100% - 75px);
`;

export const HireAdvisorContainerHide = styled.div`
    position: fixed;
    bottom: 0;
    right: 10px;
    width: 492px;
    height: 55px;
    background: #FFFFFF;
    box-shadow: 0px 24px 34px rgba(0, 0, 0, 0.35);
`;

export const HireAdvisorTitleContainer = styled.div`
    width: 492px;
    height: 55px;
    background: #FFFFFF;    
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    padding-left: 27px;
    position: relative;
    z-index: 1;
    &:hover {
        cursor: pointer;
    }    
`;

export const HireAdvisorMainContentContainer = styled.div`
    width: 492px;
    background: #FFFFFF;
    padding: 24px;
    height: 94%;
    overflow-y: auto;
`;

const HireAdvisor = (id) => {

    const dispatch = useDispatch();
    const [advisorStatus, setAdvisorStatus] = useState(false);

    const {hiredError, errorMessage, advisorRequestId} = useSelector(itinerariesSelector);

    const [openSnackbarError] = useSnackbar(error);

    const closeAdvisorContainer = () => {
        if (step === 'advisorPay') {
            dispatch(deleteRequest({advisorId: advisorRequestId}));
        }
        setAdvisorStatus(false);
        setStep("requestType");
        dispatch(clearStripeKey())
        dispatch(clearAdvisorId())
    }
    const openAdvisorContainer = () => setAdvisorStatus(true);
    const [step, setStep] = useState("requestType");

    useEffect(() => {
        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );
        if (clientSecret) {
            setStep('advisorPay')
            setAdvisorStatus(true)
        } else {
            dispatch(clearStripeKey())
            dispatch(clearAdvisorId())
        }
    }, [])

    const formik1 = useFormik({
        initialValues: {
            requestTitle: '',
            advisorRequestTypeId: 1,
            notes: '',
            attachments: [],
            deadline: undefined,
            itineraryId: parseInt(id.id)
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const data = values;
            const formData = new FormData();
            if (values && values.deadline) {
                data.deadline = convertDate(values.deadline);
                formData.append('deadline', data.deadline)
            }
            formData.append('request_title', data.requestTitle)
            formData.append('advisor_request_type_id', data.advisorRequestTypeId)
            formData.append('notes', data.notes)
            for (const file of Array.from(data.attachments)) {
                formData.append('attachments[]', file)
            }
            formData.append('itinerary_id', data.itineraryId)
            dispatch(advisorRequestsHire(formData));
            if (hiredError) {
                openSnackbarError(createErrorMessage(errorMessage));
                dispatch(clearState());
                setStep('requestType')
            }
        }
    });

    const useStyles = makeStyles({
        hireadvisorTitle: {
            color: '#242424',
            fontSize: 17,
            fontWeight: '600',
            fontFamily: 'Raleway'
        }
    });

    const classes = useStyles();

    return (
        <>
            {
                advisorStatus ? (
                    <HireAdvisorContainer>
                        <HireAdvisorTitleContainer>
                            <Typography component="h6" className={classes.hireadvisorTitle}>Hire advisor</Typography>
                            <Button
                                transparent={true}
                                onClick={closeAdvisorContainer}
                                iconstart={<Cancel width={'20px'} color={'#000'} />}
                                style={{ width: 20, marginLeft: "auto" }}
                            >
                            </Button>
                        </HireAdvisorTitleContainer>
                        <HireAdvisorMainContentContainer>
                            <form id="hireAdvisor" onSubmit={formik1.handleSubmit}>
                                {
                                    step === 'requestType' && (
                                        <RequestType stepChange={setStep} formik={formik1} />
                                    )
                                }
                                {
                                    step === 'requestContent' && (
                                        <RequestContent stepChange={setStep} formik={formik1} />
                                    )
                                }
                            </form>
                            {
                                step === 'advisorPay' && (
                                    <AdvisorPay stepChange={setStep} id={id} />
                                )
                            }
                            {
                                step === 'final' && (
                                    <Final />
                                )
                            }
                        </HireAdvisorMainContentContainer>
                    </HireAdvisorContainer>
                ) : (
                    <HireAdvisorContainerHide onClick={openAdvisorContainer}>
                        <HireAdvisorTitleContainer>
                            <Typography component="h6" className={classes.hireadvisorTitle}>Hire Concierge</Typography>
                        </HireAdvisorTitleContainer>
                    </HireAdvisorContainerHide>
                )
            }
        </>
    )
}

export default HireAdvisor;