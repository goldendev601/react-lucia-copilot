import React from "react";
import SupplierForm from "../shared/SupplierForm";
import SupplierPictures from "../shared/SupplierPictures";

export const createSuppliersTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    return {
        'PROVIDER INFORMATION':
            <SupplierForm
                formik={formik}
                edit={edit}
            />,
        PICTURES:
            <SupplierPictures
                max={1}
                formik={formik}
            />,
    }
}
