import {makeStyles} from "@material-ui/core";

const authStyles = makeStyles(() => ({
    container: {
        width: '630px',
        display: 'flex',
        flexDirection: 'column',
    },
    formActions: {
        display: 'flex',
        justifyContent: 'space-between',
        textDecoration: 'none',
        marginTop: '25px',
    },
    additionalActions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '40px',
        marginBottom: '200px',
        '& > a:nth-child(2)': {
            marginTop: '10px',
        }
    },
    requestCheckBoxWrapper: {
        marginTop: '15px',
        marginBottom: '15px'
    },
    requestTitleContent: {
        color: '#000',
        fontSize: 14,
        fontFamily: 'Raleway',
        fontWeight: '600',
        lineHeight: '20px'
    },
    validationErrorNotification: {
        fontStyle: 'italic',
        color: 'red',
        marginTop: '5px !important',
        marginBottom: '5px !important',
        fontSize: '12px'
    },
    tasksContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '20px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    additionalActions2: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '80px',
        marginBottom: '200px',
        '& > a:nth-child(2)': {
            marginTop: '10px',
        }
    },
    title: {
        fontSize: 40
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
        paddingTop: 20
    },
    rowcol: {
        display: 'block',
        flex: '1',
        flexWrap: 'wrap',
        paddingTop: 20
    },
    item: {
        flex: '1',
        // height: '30px',
    },
    label: {
        color: '#242424',
        fontSize: 14,
        fontFamily: 'Raleway',
        fontWeight: '600'
    },
    notesDiv: {
        width: '100%',
        height: '200px',
        marginTop: '80px'
    },
    photoDiv: {
        width: '150px',
        marginTop: '80px'
    },
    downloadBtnDiv: {
        width: '600px',
        height: '78px',
        marginTop: '50px',
        border: '1px solid rgba(0, 0, 0, .2)',        
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 19,
        display: 'flex',
        justifyContent: 'space-between',
        textAlign: 'center'
    },
    downloadBtnTitle: {
        color: '#000',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '16px',
        lineHeight: '20px',
        textAlign: 'left'
    },
    downloadBtnDescription: {
        color: '#000',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '12px',
        textAlign: 'center',
        opacity: 0.5
    },
    downloadLink: {
        color: '#000 !important',
    }
}));

export default authStyles;