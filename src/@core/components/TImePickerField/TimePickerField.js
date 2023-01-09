import React from "react";
import {Label} from "../Label";
import {ClockOutline} from "iconoir-react";
import {colors} from "styles/colors";
import {TimePicker} from "antd";

const TimePickerField = ({label, placeholder, name, width, formik, ...rest}) => {
    console.log(formik.values[name], formik.values, name)
    return (
        <div>
            <Label>{label}</Label>
            <TimePicker
                {...rest}
                placeholder={placeholder}
                style={{width: width ? width : '180px'}}
                suffixIcon={<ClockOutline color={colors.brand}/>}
                use12Hours={true}
                format="hh:mm A"
                value={formik.values[name]}
                onChange={(timeString) => formik.setFieldValue(name, timeString)}
            />
        </div>
    );
}

export default TimePickerField;
