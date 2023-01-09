import React from "react";
import {MenuAppBar} from "@core/components";

const DefaultLayout = ({children}) => {
    return (
        <div>
            <MenuAppBar/>
            {children}
        </div>
    )
}

export default DefaultLayout;
