import {StepByStepDialog} from "../Dialog";
import React from "react";
import {createPictureUploadTabsDock} from "./pictureUploadTabsDock";
import {useDispatch, useSelector} from "react-redux";
import {dialogFormsStateSelector, setPictureUploadOpen } from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {useFormik} from "formik";
import {
    addItineraryBookingPicture,
    addItineraryPicture,
    picturesSelector, removeLastPicture,
    deleteItineraryBookingPicture,
    deleteItineraryPicture,
    removePicture
} from "redux/features/pictures/picturesSlice";
import {bookingFormSelector} from "redux/features/dialogForms/bookingFormSlice";
import {itinerariesSelector} from "redux/features/itineraries/itinerariesSlice";
import {bookingsSelector} from "redux/features/itineraries/bookings/bookingsSlice";

const PictureUpload = () => {
    const dispatch = useDispatch();
    const {pictureUploadOpen} = useSelector(dialogFormsStateSelector);
    const {edit, editPicture} = useSelector(dialogFormsStateSelector);
    const {category} = useSelector(bookingFormSelector);
    const {itineraryId} = useSelector(itinerariesSelector);
    const {booking} = useSelector(bookingsSelector);
    const {pictures} = useSelector(picturesSelector);

    const formik = useFormik({
        initialValues: {
            query: '',
            url: '',
            imageFiles: [],
            picturesCount: '',
        },
    });

    const closePictureUpload = () => {
        dispatch(setPictureUploadOpen(false));
    }

    const cancelPictureUpload = () => {
        dispatch(removeLastPicture());
        dispatch(setPictureUploadOpen(false));
    }

    const uploadPictures = () => {
        const pictureToUpload = pictures[pictures.length - 1];
        const picturesArray = [...pictures];
        if (edit && editPicture.id) {
            if (category) {
                const apiPayload = {
                    itineraryId: itineraryId,
                    bookingId: booking?.id,
                    pictureId: editPicture.id,
                    bookingCategory: category,
                }
                dispatch(deleteItineraryBookingPicture(apiPayload));
                dispatch(removePicture(picturesArray));
            } else {
                const apiPayload = {
                    itineraryId: itineraryId,
                    pictureId: editPicture.id,
                }
                dispatch(deleteItineraryPicture(apiPayload));
                dispatch(removePicture(picturesArray));
            }
        }
        if (edit && pictureToUpload?.imageFile) {
            if (category) {
                const formData = new FormData();
                formData.append("image_url[]", pictureToUpload?.imageFile);

                const picturePayload = {
                    itineraryId: itineraryId,
                    bookingId: booking?.id,
                    bookingCategory: category,
                    images: formData,
                }
                dispatch(addItineraryBookingPicture(picturePayload));
                closePictureUpload();
            } else {
                const formData = new FormData();
                formData.append("image_url[]", pictureToUpload?.imageFile);

                const picturePayload = {
                    itineraryId: itineraryId,
                    images: formData,
                }
                dispatch(addItineraryPicture(picturePayload));
            }
        } else {

        }
        closePictureUpload();
    }

    return (
        <StepByStepDialog
            description="Upload picture"
            id="upload-picture"
            createTabsDock={createPictureUploadTabsDock}
            open={pictureUploadOpen}
            alertType="discard"
            unlockTabs={true}
            formik={formik}
            closePictureUpload={closePictureUpload}
            uploadPictures={uploadPictures}
            cancelPictureUpload={cancelPictureUpload}
        />
    );
}

export default PictureUpload;