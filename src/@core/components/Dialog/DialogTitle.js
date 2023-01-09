import React from "react";
import {withStyles} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography {...other}>
            <Typography component={'div'} variant="h6">{children}</Typography>
        </MuiDialogTitle>
    );
});

export default DialogTitle;
