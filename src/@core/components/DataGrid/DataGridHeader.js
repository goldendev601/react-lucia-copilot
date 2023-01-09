import React, { useEffect, useState } from "react";
import { Checkbox, ListItemText, MenuItem, Typography, Menu } from "@material-ui/core";
import { Button } from "@core/components";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { clearState, itinerariesSelector } from "redux/features/itineraries/itinerariesSlice";

const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
    headerTypography: {
        fontSize: '40px',
        color: '#242424',
        margin: '0 0 30px 0',
    },
    button: {
        backgroundColor: `${colors.brand}`,
        width: '150px',
        color: 'white',
        '&:hover': {
            backgroundColor: `${colors.brand}`,
            color: 'white',
        },
    },
    actions: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '490px',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    totalCards: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '25px',
    }
});

const DataGridHeader = ({ component, headerName, addButtonName, open, handleClickOpen, hasFilter, handleFilter, filterOptions, filterVal }) => {
    const dispatch = useDispatch();

    const { addedError } = useSelector(itinerariesSelector);

    useEffect(() => {
        if (addedError) {
            dispatch(clearState());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addedError]);

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <div className={classes.actions}>
                <Typography
                    className={classes.headerTypography}
                    variant="h2"
                    component="h2"
                >
                    {headerName}
                </Typography>
                {component &&
                    <div className={classes.buttonsContainer}>
                        {
                            hasFilter && (
                                <>
                                    <Button aria-controls="filter-list" aria-haspopup="true" onClick={handleClick} $outlined style={{marginRight: '20px'}}>
                                        Filter By
                                    </Button>
                                    <Menu
                                        id="filter-list"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        {filterOptions.map((filterOption, index) => (
                                            <MenuItem key={index} value={filterOption} onClick={() => handleFilter(filterOption)}>
                                                <Checkbox checked={filterVal && filterVal.indexOf(filterOption) > -1} />
                                                <ListItemText>{filterOption}</ListItemText>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </>
                            )
                        }
                        <Button
                            onClick={handleClickOpen}
                            $primary
                        >
                            Add {addButtonName}
                        </Button>
                    </div>}
            </div>
            {component && open && React.cloneElement(component, { open: open })}
        </div>
    );
}

export default React.memo(DataGridHeader);
