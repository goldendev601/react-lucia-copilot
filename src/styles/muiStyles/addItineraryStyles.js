import {makeStyles} from "@material-ui/core";
import {colors} from "../colors";

const addItineraryStyles = makeStyles((theme) => ({
    formActions: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '40px',
        width: '100%'
    },
    additionalActions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '40px',
        '& > a:nth-child(2)': {
            marginTop: '10px',
        }
    },
    description: {
        margin: '30px 0 30px 0',
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '110px',
    },
    outer: {
        display: 'flex',
        minHeight: '100%',
        flexDirection: 'column',
    },
    row: {
        display: 'flex',
        flex: '1',
        flexWrap: 'wrap',
    },
    item: {
        flex: '1',
        height: '30px',
    },
    spacing: {
        "& > div:not(:first-child)": {
            marginTop: '20px',
        }
    },
    spacing1: {
        "& > div:not(:first-child)": {
            marginTop: '60px',
        }
    },
    calendarInfo: {
        width: '100%',
        height: '296px',
        background: '#F8F8FB'
    },
    calendarInfoTitle: {
        marginTop: '58px',
        width: '622px',
        height: '20px',
        fontWeight: '600',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        fontSize: '18px',
        lineHeight: '20px',
        textAlign: 'center',
        color: '#4F4F4F'
    },
    calendarInfoText: {
        margin: '13px auto',    
        width: '416px',
        height: '54px',
        fontWeight: '400',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        fontSize: '12px',
        lineHeight: '18px',
        textAlign: 'center',
        color: '#4F4F4F'
    },
    calendarbtn: {
        width: '150px',
        height: '30px',
        color: '#FFFFFF',
        backgroundColor: '#BA886E',
        border: '1px solid #BA886E',
        alignItems: 'center',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '12px',
        lineHeight: '20px'
    },
    calendarbtnDiv: {
        textAlign: 'center'
    },
    formPadding: {
        padding: '30px 30px 0 30px'
    },
    information: {
        display: 'flex',
        justifyContent: 'space-between'
    },    
    pictures: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > div:not(:last-child)': {
            marginRight: '20px'
        }
    },
    categoryButton: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'white !important',
        color: `${colors.brand} !important`
    },
    categoryForm: {
        display: 'flex',
    },
    categoryButtonsContainer: {
        "& > *": {
            marginBottom: '30px',
        }
    },
    iconButton: {
        padding: '0',
        justifyContent: 'flex-start',
        marginTop: '20px',
    },
    flex: {
        display: 'flex',
    },
    fontWeightLight: {
        fontWeight: '300',
    },
    dates: {
        fontWeight: '600',
        color: colors.black1,
        display: 'flex',
        marginTop: '31px',
        fontSize: '14px'
    },
    passengers: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    label: {
        fontWeight: '600',
        color: colors.black1,
        display: 'flex',
        marginBottom: '3px',
        fontSize: '14px'
    },
    switch: {
        fontWeight: '300',
        marginLeft: '20px',
        display: 'flex',
        alignItems: 'center',
    },
    rooms: {
        overflow: 'auto',
        maxHeight: '570px'
    },
    notesDiv: {
        width: '385px',
        height: '249px',
    },
    notesDiv1: {
        width: '770px',
        height: '249px',
    },
    popoverDiv: {
        backgroundColor: '#FFFFFF',
        width: 385,
        height: 365,
        padding: 20
    },
    popoverInstruction: {
        color: '#BA886E',
        fontFamily: 'Raleway',
        fontSize: 12,
        fontWeight: 600,
        padding: 10        
    },
    popeoverDescription: {
        color: '#242424',
        fontFamily: 'Raleway',
        fontSize: 12,
        fontWeight: 600,  
        padding: 10    
    },
    popoverInputDiv: {
        width: 264,
        height: 55,
        paddingLeft: 10
    },
    warningCircleIcon: {
        color: '#BA886E',
    },
    stripeContainer: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '50px',
        paddingBottom: '50px',
        paddingLeft: '180px',
        paddingRight: '180px'
    },
    modalheaderWrapper: {
        width: '492px',
        height: '66px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)'
    },
    modalMainWrapper: {
        width: '492px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    modalStripeMainWrapper: {
        width: '600px',
        paddingLeft: '40px',
        paddingRight: '40px',
        display: 'flex',
        flexDirection: 'column',
    },
    modalUserInfoWrapper: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    modalTitleInfoWrapper: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: '60px',
        justifyContent: 'center'
    },
    modalPriceWrapper: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '24px',
        justifyContent: 'space-between',
        backgroundColor: '#F8F8F8',
        marginTop: '32px'
    },
    modalTasksWrapper: {
        width: '100%',
        alignItems: 'center',
        padding: '24px',
        backgroundColor: 'rgba(186, 136, 110, 0.1)',
        marginTop: '32px'
    },
    modalDescriptionWrapper: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '32px'
    },
    modalStripeDescriptionWrapper: {
        width: '100%',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: '32px'
    },
    modalPriceTitle: {
        fontWeight: '600',
        fontSize: '14px',
        color: '#242424',
        lineHeight: '20px',
        fontFamily: 'Raleway'
    },
    modalTasksTitle: {
        fontWeight: '600',
        fontSize: '14px',
        color: '#242424',
        lineHeight: '20px',
        fontFamily: 'Raleway',
        marginRight: '10px'
    },
    modalDueDates: {
        color: '#EB5757',
        fontWeight: '500',
        fontSize: '12px',
        lineHeight: '20px',
        fontFamily: 'Raleway',
        marginLeft: '10px',
        textTransform: 'uppercase'
    },
    tasksContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    clockImage: {
        width: '16px',
        height: '16px'
    },
    modalPriceNote: {
        fontWeight: '600',
        fontSize: '10px',
        color: '#242424',
        opacity: '0.5',
        lineHeight: '20px',
        fontFamily: 'Raleway'
    },
    modalDescription: {
        fontWeight: '600',
        fontSize: '10px',
        color: '#242424',
        lineHeight: '20px',
        fontFamily: 'Raleway'
    },
    modalStripeDescription: {
        fontWeight: '400',
        fontSize: '16px',
        color: '#242424',
        lineHeight: '20px',
        fontFamily: 'Raleway',
        textAlight: 'center'
    },
    modalStripeNote: {
        fontWeight: '400',
        fontSize: '12px',
        color: '#242424',
        lineHeight: '18px',
        fontFamily: 'Raleway',
        textAlight: 'center',
        display: 'flex',
        justifyContent: 'center'
    },
    modalPriceValue: {
        fontWeight: '600',
        fontSize: '32px',
        color: '#BA886E',
        lineHeight: '38px',
        fontFamily: 'Raleway'
    },
    modalUserInfo: {
        fontWeight: '700',
        fontSize: '16px',
        color: '#242424',
        lineHeight: '19px',
        fontFamily: 'Raleway'
    },
    modalTitleInfo: {
        fontWeight: '400',
        fontSize: '39px',
        color: '#94745C',
        lineHeight: '60px',
        fontFamily: 'MADE Mirage',
        textAlight: 'center'
    },
    modalTitle: {
        fontWeight: '600',
        fontSize: '17px',
        color: '#242424',
        lineHeight: '30px',
        fontFamily: 'Raleway'
    },
    modalUserImg: {
        width: '42px',
        height: '42px',
        marginRight: '15px'
    },
    stripeIconText: {
        fontWeight: 'bold',
        fontSize: '25px',
        color: '#000',
        marginTop: '25px'
    },
    stripeText: {
        textAlign: 'center',
        fontWeight: '300',
        fontSize: '14px',
        lineHeight: '22px',
        color: '#000',
        fontFamily: 'Raleway',
        marginTop: '15px'
    },
    stripeText2: {
        textAlign: 'center',
        fontWeight: '300',
        fontSize: '14px',
        lineHeight: '22px',
        color: '#000',
        fontFamily: 'Raleway',
        marginTop: '5px'
    },
    gotoConnectStripeBtn: {
        width: '173px',
        fontSize: '13px',
        lineHeight: '15px',
        fontWeight: '600',
        fontFamily: 'Raleway',
        backgroundColor: '#BA886E',
        color: '#FFF',
        textAlight: 'center',
        paddingTop: '10px',
        paddingBottom: '10px',
        "&:hover": {
            cursor: 'pointer'
        }
    },
    connectStripeBtn: {
        width: '127px',
        fontSize: '13px',
        lineHeight: '15px',
        fontWeight: '600',
        fontFamily: 'Raleway',
        backgroundColor: '#BA886E',
        color: '#FFF',
        textAlight: 'center',
        paddingTop: '10px',
        paddingBottom: '10px',
        "&:hover": {
            cursor: 'pointer'
        }
    },
    validationErrorNotification: {
        fontStyle: 'italic',
        color: 'red',
        marginTop: '5px !important',
        marginBottom: '5px !important',
        fontSize: '12px'
    },
    avatarListContainer: {
        maxHeight: "500px",
        overflow: 'auto'
    },
    avatarContainer: {
        padding: '8px'
    },
    selectedAvatarContainer: {
        padding: '8px',
        border: "1px solid #BA886E",
        position: "relative",
        "&:before": {
            content: '"🗸"',
            width: "15px",
            height: "15px",
            position: "absolute",
            background: "#BA886E",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }
    }

}));

export default addItineraryStyles;