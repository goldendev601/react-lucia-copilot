import React from "react";
import {Label} from "../Label";
import {DatePicker} from "rsuite";
import {DateRangePicker} from "rsuite";

const DatePickerField = ({label, placeholder, name, width, formik, startDate, endDate, ...props}) => {
    const {allowedRange} = DateRangePicker;

    return (
        <div>
            <Label>{label}</Label>
            <DatePicker
                style={{zIndex: '1300', width: width ? width : '180px'}}
                format={"YYYY-MM-DD"}
                placeholder={placeholder}
                value={formik.values[name]}
                onChange={(e) => formik.setFieldValue(name, e)}
                disabledDate={allowedRange(startDate > new Date() ? startDate : new Date(), endDate)}
                disabled={startDate === '' || startDate === null || endDate === '' || endDate === null}
                {...props}
            />
        </div>
    );
}

export default React.memo(DatePickerField);
