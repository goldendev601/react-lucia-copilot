import React from "react";
import {StyledNavLink} from "../Link/StyledLink";
import {makeStyles} from "@material-ui/core/styles";

const agentNavLinksStyles = makeStyles(() => ({
    menuLinks: {
        width: '450px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));

export const AgentNavLinks = () => {
    const classes = agentNavLinksStyles();
    return (
        <div className={classes.menuLinks}>
            <StyledNavLink $fontweight='400' activeClassName='selected'
                           to='/' exact>Open requests</StyledNavLink>
            <StyledNavLink $fontweight='400' activeClassName='selected'
                           to='/myrequests'>My requests</StyledNavLink>
            <StyledNavLink $fontweight='400' activeClassName='selected'
                           to='/suppliers'>Suppliers</StyledNavLink>
        </div>
    );
}

