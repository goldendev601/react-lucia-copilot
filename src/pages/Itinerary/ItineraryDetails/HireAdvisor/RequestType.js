import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Typography, Grid } from "@material-ui/core";
import {getAdvisorRequestTypes, constantsSelector} from "redux/features/constants/constantsSlice";
import {setAdvisorRequestType} from "redux/features/itineraries/itinerariesSlice";
import { makeStyles } from "@material-ui/core/styles";
import MapBackground  from '../../../../assets/map-1.png';
import MapBackground1  from '../../../../assets/map-2.png';
import MapBackground2  from '../../../../assets/map-3.png';

const RequestType = ({stepChange, formik}) => {
    const dispatch = useDispatch();
    const {advisorRequestTypes} = useSelector(constantsSelector);

    useEffect(() => {
        dispatch(getAdvisorRequestTypes())
    }, [dispatch])

    const useStyles = makeStyles({
        hireAdvisorMainText: {
            fontSize: 12,
            color: '#242424',
            fontFamily: 'Raleway',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            lineHeight: '30px',
            fontWeight: '600',
            paddingBottom:'10px',
        },
        hireAdvisorGrid:{
            width: '100%'
        },
        hireAdvisorInfo: {
            height: '100%',
            width: '100%',
            padding: 20,
            boxShadow: '0px 4px 44px rgba(0, 0, 0, 0.1)',
            background: 'rgba(255, 255, 255, 0.32)',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'center',
            height:'216px',
            textAlign: 'center',
            '& h4': {
                color: '#242424',
                fontFamily: 'Raleway',
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: '12px',
                textTransform: 'uppercase',
                paddingBottom: '10px'
            },
            '& p': {
                color: '#242424',
                fontFamily: 'Raleway',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '12px',
                lineHeight:'18px',
                letterSpacing: '0.03em'
            },
            "&:hover": {
                background: "#BA886E",
                '& h4': {
                    color: '#FFF',
                },
                '& p': {
                    color: '#FFF',
                },
            },
        },
        BgImageMap:{
            position: 'relative',
            '& img':{
                height:'100%',
                width:'100%',
                objectFit: 'contain',
            }
        },
        AirplaneImgTop:{
            position: 'absolute',
            top: '42px',
            left: '0',
            right: '0',
            margin: '0 auto',
        },
        AirplaneImgbottom:{
            position: 'absolute',
            top: '120px',
        }
    });

    const classes = useStyles();

    const handleAdvisorType = (advisorRequestType) => {
        formik.setFieldValue('advisorRequestTypeId', advisorRequestType.id);
        dispatch(setAdvisorRequestType(advisorRequestType));
        stepChange('requestContent');
    }

    return (
        <>
            <Typography component="h6" className={classes.hireAdvisorMainText}>SELECT TYPE OF REQUEST</Typography>
            <Grid container spacing={2} className={classes.hireAdvisorContentDiv}>
                {
                    advisorRequestTypes && ( 
                        advisorRequestTypes.map((advisorRequestType, index) => {
                            return (
                                <Grid item md={6} className={classes.hireAdvisorGrid} key={index}>
                                    <Grid container className={classes.hireAdvisorInfo} onClick={() => handleAdvisorType(advisorRequestType)}>
                                        <Typography component="h4">{advisorRequestType.description}</Typography>
                                        {/* <Typography component="p">{advisorRequestType.explanation}</Typography> */}
                                    </Grid>
                                </Grid>
                            )
                        })
                    )
                }
            </Grid>
            <div className={classes.BgImageMap}>   
                <div className="mapbackground-img">
                    <img src={MapBackground} />
                </div>
                <div className={classes.AirplaneImgTop}> 
                    <img src={MapBackground1} />
                </div>
                <div className={classes.AirplaneImgbottom}>
                    <img src={MapBackground2} />
                </div>
            </div>
        </>
    )
}

export default RequestType