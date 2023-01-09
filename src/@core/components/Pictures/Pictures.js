import {Grid, Typography} from "@material-ui/core";
import React, {useCallback, useEffect} from "react";
import {addItineraryStyles} from "styles";
import {colors} from "styles/colors";
import {
    Picture,
    UploadPicture,
    ItineraryFormContainer,
    Loading
} from "@core/components";
import {useDispatch, useSelector} from "react-redux";
import {bookingsSelector} from "redux/features/itineraries/bookings/bookingsSlice";
import {bookingFormSelector} from "redux/features/dialogForms/bookingFormSlice";
import {createErrorMessage} from "utils";
import {
    itinerariesSelector,
} from "redux/features/itineraries/itinerariesSlice";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar'
import {
    clearPicturesFlags, deleteItineraryBookingPicture, deleteItineraryPicture,
    getItineraryBookingPictures, getItineraryPictures,
    picturesSelector,
    removePicture,
    setMaxPictures,
    setPicture
} from "redux/features/pictures/picturesSlice";
import {setPictureUploadOpen, setEditPictureInfo} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import { suppliersSelector } from "redux/features/suppliers/suppliersSlice";

const Pictures = ({max, edit, itineraryLogo}) => {
    const classes = addItineraryStyles();
    const dispatch = useDispatch();
    const {booking} = useSelector(bookingsSelector);

    const {id} = booking || {};

    const {pictures, flags, errorMessage, isFetching} = useSelector(picturesSelector);

    const {
        isItineraryPictureDeletedSuccess,
        isItineraryPictureDeletedError,
        isItineraryPictureAddedSuccess,
        isItineraryPictureAddedError,

        isBookingPictureDeletedSuccess,
        isBookingPictureDeletedError,
        isBookingPictureAddedSuccess,
        isBookingPictureAddedError
    } = flags;

    const {category} = useSelector(bookingFormSelector);

    const {itineraryId} = useSelector(itinerariesSelector);
    const {supplier} = useSelector(suppliersSelector);

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const openPictureUpload = (index = null, id = null) => {
        dispatch(setEditPictureInfo({
            id,
            index
        }));
        dispatch(setPictureUploadOpen(true));
    }

    const handlePictures = (imageFile, src) => {
        dispatch(setPicture({imageUrl: src, imageFile: imageFile}));
    }

    const deleteImage = useCallback((index, id) => {
        const picturesArray = [...pictures];
        if (edit && id) {
            if (category) {
                const apiPayload = {
                    itineraryId: itineraryId,
                    bookingId: booking?.id,
                    pictureId: id,
                    bookingCategory: category,
                }
                dispatch(deleteItineraryBookingPicture(apiPayload));
                dispatch(removePicture(picturesArray));
            } else {
                const apiPayload = {
                    itineraryId: itineraryId,
                    pictureId: id,
                }
                dispatch(deleteItineraryPicture(apiPayload));
                dispatch(removePicture(picturesArray));
            }
        }
        if (!edit) {
            picturesArray.splice(index, 1);
            dispatch(removePicture(picturesArray));
        }
    }, [booking?.id, category, dispatch, edit, itineraryId, pictures]);

    useEffect(() => {
        if (edit) {
            if (category && category !== 'others') {
                dispatch(getItineraryBookingPictures({itineraryId, bookingId: id, bookingCategory: category}));
            } else {
                dispatch(getItineraryPictures(itineraryId));
            }
        }
    }, [id, category, dispatch, edit, itineraryId]);

    useEffect(() => {
        dispatch(setMaxPictures(max))
    }, [dispatch, max])

    useEffect(() => {
        if (supplier) {
            console.log(supplier)
        }
    }, [supplier])

    useEffect(() => {
            if (edit) {
                dispatch(clearPicturesFlags());

                if (isItineraryPictureDeletedError) {
                    openSnackbarError(createErrorMessage(errorMessage));
                    dispatch(getItineraryPictures(itineraryId));
                }

                if (isBookingPictureDeletedError) {
                    openSnackbarError(createErrorMessage(errorMessage));
                    dispatch(getItineraryBookingPictures({itineraryId, bookingId: id, bookingCategory: category}))
                }

                if (isItineraryPictureDeletedSuccess) {
                    openSnackbarSuccess('Picture is successfully deleted');
                    dispatch(getItineraryPictures(itineraryId));
                }

                if (isBookingPictureDeletedSuccess) {
                    openSnackbarSuccess('Picture is successfully deleted');
                    dispatch(getItineraryBookingPictures({itineraryId, bookingId: id, bookingCategory: category}))
                }

                if (isItineraryPictureAddedError) {
                    openSnackbarError(createErrorMessage(errorMessage));
                    dispatch(getItineraryPictures(itineraryId));
                }

                if (isBookingPictureAddedError) {
                    openSnackbarError(createErrorMessage(errorMessage));
                    dispatch(getItineraryBookingPictures({itineraryId, bookingId: id, bookingCategory: category}))
                }

                if (isItineraryPictureAddedSuccess) {
                    openSnackbarSuccess('Picture is successfully added');
                    dispatch(clearPicturesFlags());
                    dispatch(getItineraryPictures(itineraryId));
                }

                if (isBookingPictureAddedSuccess) {
                    openSnackbarSuccess('Picture is successfully added');
                    dispatch(clearPicturesFlags());
                    dispatch(getItineraryBookingPictures({itineraryId, bookingId: id, bookingCategory: category}))
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isItineraryPictureDeletedSuccess, isItineraryPictureDeletedError,
            isItineraryPictureAddedSuccess, isItineraryPictureAddedError,
            isBookingPictureDeletedError, isBookingPictureDeletedSuccess,
            isBookingPictureAddedError, isBookingPictureAddedSuccess]
    );

    return (
        <Loading isFetching={isFetching}>
            <ItineraryFormContainer>
                <div>
                    <Typography style={{marginBottom: '10px'}} component={'div'}
                                variant='body2'>{!itineraryLogo ? 'Picture' : 'Itinerary Logo'}</Typography>
                    <div className={classes.pictures} style={{flexGrow: '1'}}>
                        <Grid container spacing={1}>
                            {
                                supplier && Array.isArray(supplier) && supplier.filter(sup => sup.imageUrl).map((sup) => (
                                    <Grid item xs={4}>
                                        <Picture
                                            imageSrc={sup.imageUrl}
                                        />
                                    </Grid>
                                ))
                            }
                            {pictures && pictures.map((image, index) => {
                                return (
                                    <Grid item xs={4} key={image.id}>
                                        <Picture
                                            id={image.id}
                                            imageSrc={image.imageUrl}
                                            openPictureUpload={() => openPictureUpload(index, image.id)}
                                            deleteImage={deleteImage}
                                            index={index}
                                            itineraryLogo={itineraryLogo}
                                            key={index}
                                        />
                                    </Grid>);
                            })}
                            <Grid item xs={4}>
                                {pictures.length < max &&
                                <UploadPicture openPictureUpload={() => openPictureUpload()} itineraryLogo={itineraryLogo}
                                               handlePictures={handlePictures}/>}
                            </Grid>
                        </Grid>
                    </div>
                    <span style={{color: `${colors.black1}`, fontWeight: '400', marginTop: '10px'}}
                          className='span-small'
                    >
                        Max {max} {max === 1 ? 'picture' : 'pictures'}
                    </span>
                </div>
            </ItineraryFormContainer>
        </Loading>
    );
}

export default Pictures;
