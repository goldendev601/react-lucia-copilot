import {Button} from "@core/components";
import React from "react";
import {addItineraryStyles} from "styles";
import {NavArrowRight, Airplane, Trekking} from "iconoir-react";
import {ReactComponent as Hotel} from '../../../../assets/icons/hotel.svg';
import {ReactComponent as Cruise} from '../../../../assets/icons/cruise.svg';
import {ReactComponent as Bus} from '../../../../assets/icons/bus.svg';
import {ReactComponent as Medical} from '../../../../assets/icons/medical.svg';
import {ReactComponent as Food} from '../../../../assets/icons/food.svg';
import {ReactComponent as Note} from '../../../../assets/icons/note.svg';
import {useDispatch} from "react-redux";
import {setBookingCategory} from "redux/features/dialogForms/bookingFormSlice";
import {setBookingFormOpen, setCategoryFormOpen} from "redux/features/dialogForms/dialogFormsOpenStateSlice";

const SelectCategory = () => {
    const classes = addItineraryStyles();
    const dispatch = useDispatch();

    const handleCategoryChange = (e) => {
        dispatch(setBookingCategory(e.currentTarget.name));
        dispatch(setCategoryFormOpen(false));
        setTimeout(() => dispatch(setBookingFormOpen(true)), 150);
    }

    return (
        <div>
            <div className={`${classes.spacing} ${classes.formPadding} ${classes.categoryForm}`}>
                <div className={classes.categoryForm}>
                    <div className={classes.categoryButtonsContainer}>
                        <Button
                            $primary
                            $width={'145px'}
                            name="hotels"
                            onClick={handleCategoryChange}
                            className={classes.categoryButton}
                        >
                            <Hotel/>
                            Hotel
                            <NavArrowRight/>
                        </Button>
                        <Button
                            $primary
                            $width={'140px'}
                            name="flights"
                            onClick={handleCategoryChange}
                            className={classes.categoryButton}
                            style={{padding: '5px'}}
                        >
                            <Airplane width={'28px'} height={'28px'}/>
                            Flight
                            <NavArrowRight/>
                        </Button>
                        <Button
                            $primary
                            $width={'145px'}
                            name="cruises"
                            onClick={handleCategoryChange}
                            className={classes.categoryButton}
                        >
                            <Cruise/>
                            Cruise
                            <NavArrowRight/>
                        </Button>
                        <Button
                            $primary
                            $width={'200px'}
                            name="transports"
                            onClick={handleCategoryChange}
                            className={classes.categoryButton}
                        >
                            <Bus/>
                            Transportation
                            <NavArrowRight/>
                        </Button>
                    </div>
                    <div style={{marginLeft: '150px'}} className={classes.categoryButtonsContainer}>
                        <Button
                            $primary
                            $width={'160px'}
                            name="tours"
                            onClick={handleCategoryChange}
                            style={{padding: '5px'}}
                            className={classes.categoryButton}
                        >
                            <Trekking width={'30px'} height={'30px'}/>
                            Activity
                            <NavArrowRight/>
                        </Button>
                        <Button
                            $primary
                            $width={'180px'}
                            name="insurances"
                            onClick={handleCategoryChange}
                            className={classes.categoryButton}
                        >
                            <Medical/>
                            Insurance
                            <NavArrowRight/>
                        </Button>
                        <Button
                            $primary
                            $width={'180px'}
                            name="concierges"
                            onClick={handleCategoryChange}
                            className={classes.categoryButton}
                        >
                            <Food/>
                            Concierge
                            <NavArrowRight/>
                        </Button>
                        <Button
                            $primary
                            className={classes.categoryButton}
                            $width={'200px'}
                            name="others"
                            onClick={handleCategoryChange}
                        >
                            <Note/>
                            Other / Notes
                            <NavArrowRight/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectCategory;
