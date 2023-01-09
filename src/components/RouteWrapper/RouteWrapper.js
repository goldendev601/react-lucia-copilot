import React, {useEffect} from "react";
import {Route, Redirect} from "react-router-dom";
import DefaultLayout from "../Layouts/DefaultLayout";
import NotAuthorizedLayout from "../Layouts/NotAuthorizedLayout";
import {useSelector, useDispatch} from "react-redux";
import {userSelector} from "../../redux/features/auth/authSlice";
import { profileSelector, getProfile, clearState} from "redux/features/profile/profileSlice";
import {setConnectStripeFormOpen} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {CircularProgress, Grid} from "@material-ui/core";



export default function RouteWrapper({
                                         component: Component,
                                         isPrivate,
                                         ...rest
                                     }) {
    const { user, isFetching } = useSelector(userSelector);
    const {redirectUrl, profileUser} = useSelector(profileSelector);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getProfile);
    }, [])

    useEffect(() => {
        if (redirectUrl) {
            dispatch(clearState());
            window.location.href = redirectUrl
        }
    }, [redirectUrl])

    if (isPrivate && !user) {
        return <Redirect to="/signin"/>;
    }

    if (profileUser && (!profileUser.stripeConnect || profileUser.stripeConnect !== "fully connected")) {
        dispatch(setConnectStripeFormOpen(true));
    } else {
        dispatch(setConnectStripeFormOpen(false));
    }

    const Layout = (user) ? DefaultLayout : NotAuthorizedLayout;

    return (
        <Route
            {...rest}
            render={props => (
                <React.Fragment>
                    {isFetching
                        ? <Grid
                            container
                            justify="center"
                            alignItems="center"
                            style={{height: '100vh'}}
                        >
                            <CircularProgress/>
                        </Grid>
                        : <Layout>
                            <Component {...props} />
                        </Layout>
                    }
                </React.Fragment>
            )}
        />
    );
}
