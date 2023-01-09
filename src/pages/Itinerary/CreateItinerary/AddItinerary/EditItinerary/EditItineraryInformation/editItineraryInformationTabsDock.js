import React from "react";
import ItineraryInformation from "../../ItineraryInformation";
import ItineraryPictures from "../../ItineraryPictures";
import ItineraryTheme from "../../ItineraryTheme";

export const createEditItineraryInformationTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    return {
        INFORMATION:
            <ItineraryInformation
                handleStateChange={handleStateChange}
                edit={edit}
                nextStep={nextStep}
                formik={formik}
            />,
        PICTURES:
            <ItineraryPictures
                handleStateChange={setImages}
                nextStep={nextStep}
                max={3}
                edit={edit}
                formik={formik}
            />,
        THEME:
            <ItineraryTheme
                max={1}
                formik={formik}
                edit={edit}
                itineraryLogo
            />
    }
}
