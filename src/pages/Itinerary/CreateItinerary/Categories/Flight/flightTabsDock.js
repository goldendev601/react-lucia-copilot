import React from "react";
import FlightInformation from "./FlightInformation/FlightInformation";
import FlightPassengers from "./FlightPassengers";
import FlightNotes from "./FlightNotes";

export const createFlightTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    const notesFieldNames = ['notes', 'cancellationPolicy'];
    return {
        "FLIGHT INFORMATION":
            <FlightInformation
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                edit={edit}
                formik={formik}
            />,
        PASSENGERS:
            <FlightPassengers
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                edit={edit}
                formik={formik}
            />,
        // PICTURES:
        //     <FlightPictures
        //         handleStateChange={setImages}
        //         nextStep={nextStep}
        //         max={2}
        //         edit={edit}
        //         formik={formik}
        //     />,
        NOTES:
            <FlightNotes
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                fieldNames={notesFieldNames}
                edit={edit}
                formik={formik}
            />,
    }
}