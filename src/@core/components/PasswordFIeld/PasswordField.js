import React from "react";
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import {EyeEmpty} from "iconoir-react";

const PasswordField = ({formik, name, label, placeholder, handleClickShowPassword, showPassword, width, ...rest}) =>
    <TextField
        {...rest}
        // style={{width: width || '320px'}}
        id={name}
        name={name}
        label={label}
        placeholder={placeholder || 'Put your password'}
        type={showPassword[name] ? "text" : "password"}
        value={formik.values[name]}
        onChange={formik.handleChange}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        InputLabelProps={{shrink: true}}
        InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        size='small'
                        onClick={() => handleClickShowPassword(name)}
                    >
                        <EyeEmpty width='23px' color='black'/>
                    </IconButton>
                </InputAdornment>
            )
        }}
    />

export default PasswordField;