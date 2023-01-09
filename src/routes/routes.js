import React, {useEffect} from "react";
import SignIn from "../pages/Auth/SignIn/SignIn";
import MainRecoveryForm from "../pages/Auth/MainRecoveryForm/MainRecoveryForm";
import SignUp from "../pages/Auth/SignUp/SignUp";
import Route from "components/RouteWrapper/RouteWrapper";
import {SuppliersDashboard} from "../components";
import {Switch, useHistory, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearState, impersonate, userSelector} from "../redux/features/auth/authSlice";
import {error, success} from "../styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar'
import {createErrorMessage} from "../utils";
import { OpenRequest } from "pages/OpenRequest";
import { MyRequest } from "pages/MyRequest";

const ROUTES = [
    {path: "/signin", exact: true, component: () => <SignIn/>},    
    {path: "/recovery", exact: true, component: () => <MainRecoveryForm/>},
    {path: "/signup", exact: true, component: () => <SignUp/>},
    {path: "/", exact: true, isPrivate: true, component: () => <OpenRequest/>},
    {path: "/myrequests", exact: true, isPrivate: true, component: () => <MyRequest/>},  
    {path: "/suppliers", exact: true, isPrivate: true, component: () => <SuppliersDashboard/>},  
    {path: "/auth/impersonate/:impersonateToken", exact: true, component: () => <Impersonate/>},
];

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const Impersonate = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();
    const {impersonateIsSuccess, impersonateIsError, errorMessage} = useSelector(userSelector);

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const {impersonateToken} = useParams();
    const redirectPath = query.get("redirect");

    useEffect(() => {
        if (impersonateToken) {
            dispatch(impersonate(impersonateToken));
        }
    }, [dispatch, history, impersonateToken, redirectPath]);

    useEffect(() => {
        if (impersonateIsSuccess) {
            openSnackbarSuccess('Impersonate is successfully completed');
            dispatch(clearState());
            if (redirectPath) {
                history.push(redirectPath);
            } else {
                history.push('/');
            }
        }
        if (impersonateIsError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearState());
            history.push('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorMessage, impersonateIsError, impersonateIsSuccess, openSnackbarError, openSnackbarSuccess, redirectPath]);

    return null;
}

export const RenderRoutes = ({routes}) => {
    return (
        <Switch>
            {routes.map((route, i) => {
                return <Route key={i} {...route} />;
            })}
        </Switch>
    );
}

export default ROUTES;
