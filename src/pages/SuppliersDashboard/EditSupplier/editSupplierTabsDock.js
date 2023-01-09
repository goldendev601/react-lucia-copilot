import React from "react";
import EditSupplier from "./EditSupplier";

export const createEditSupplierTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit) => {
    return {
        'PROVIDER INFORMATION':
            <EditSupplier
                handleStateChange={handleStateChange}
            />,
    }
}
