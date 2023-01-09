import moment from "moment";

export const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

export const toSnakeCase = string => {
    return string.replace(/\W+/g, " ")
        .split(/ |\B(?=[A-Z])/)
        .map(word => word.toLowerCase())
        .join('_');
};

export const objFieldsToSnakeCase = (obj) => {
    const snakeCaseObject = {};
    for (const camel in obj) {
        snakeCaseObject[camelToSnakeCase(camel)] = obj[camel];
    }

    return snakeCaseObject;
}

export const snakeNestedKeys = (dataObj) => {
    return JSON.parse(JSON.stringify(dataObj).trim().replace(/("\w+":)/g, (keys) => {
        return camelToSnakeCase(keys);
    }));
}

export const camelizeNestedKeys = (dataObj) => {
    return JSON.parse(JSON.stringify(dataObj).trim().replace(/("\w+":)/g, (keys) => {
        return keys.replace(/(.(_|-|\s)+.)/g, (subStr) => {
            return subStr[0]+(subStr[subStr.length-1].toUpperCase());
        })
    }));
}

export const removeObjProperties = (arr, propsToKeep) => {
    const propsToKeepDict = new Set(propsToKeep);

    const inner = (arr) =>
        arr.map((obj) =>
            Object.entries(obj).reduce((result, [key, value]) => {
                propsToKeepDict.has(key) && (result[key] = Array.isArray(value) ? inner(value) : value);

                return result;
            }, {}));


    return inner(arr);
}

export const capitalizeFirstLetter = (string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
}

export const validateEmail = (email) => {
    const validationResult = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (validationResult ===  null) {
        return false;
    } else {
        return true;
    }
};

export const camel2title = (camelCase) => camelCase
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim();

export const removeProperty = (propKey, {[propKey]: propValue, ...rest}) => rest;

export const convertDate = (date) => {
    // const convertedDate = moment.utc(date).format('YYYY-MM-DD');
    if (moment(date).isValid()) {
        return new Date(date).toLocaleDateString("en-GB", { year: 'numeric' }) + "-" + new Date(date).toLocaleDateString("en-GB", { month: '2-digit' }) + "-" + new Date(date).toLocaleDateString('en-GB', { day: '2-digit' });    
    }
    return '';
}

export const dateToMyDate = (date) => {
    var d = date.substr(0,10);  
    var z = new Date().toTimeString().split(' ')[1];
    return new Date(d + 'T00:00:00.000' + z.substr(-5,3)+":"+ z.substr(-2));
}

export const dateToMyTimeAMPM = (date) => {
    var hour = date.slice(11, 13);
    var minute = date.slice(14, 16);
    var newHour = '';
    var t = '';
    if (parseInt(hour) > 12) {
        newHour = (parseInt(hour) - 12).toString();
        t = newHour + ':' + minute + 'PM';
    } else {
        t = hour + ':' + minute + 'AM';
    }
    return t;
}

export const dateToMyTime = (date) => {
    var t = date.slice(11,16); 
    return t;
}

export const stringLimit = (str) => {
    var sub_str = '';
    if(str.length > 32) {
        sub_str = str.substring(0, 32) + '...';
    } else {
        sub_str = str;
    }
    return sub_str;
}

export const convertDateDetailed = (date) => moment(new Date(date)).format('LLLL');

export const convertDateToTime = (date) => {
    const convertedTime = moment(date).format("hh:mm A");
    return convertedTime === 'Invalid date' ? '' : convertedTime;
}

export const createErrorMessage = (errors) => {
    let message = '';
    if (errors !== null) {
        if (typeof errors === 'object') {
            // eslint-disable-next-line no-unused-vars
            for (let [_, value] of Object.entries(errors)) {
                message += value + ' ';
            }
        } else if (typeof errors === 'string') {
            return errors;
        }
    }
    return message;
}

export const selectChangedValues = (initialValues, changedValues) => {
        return changedValues.filter( function( p, idx ) {
            return Object.keys(p).some( function( prop ) {
                return p[prop] !== initialValues[idx][prop];
            })
        })
}

export const removeLineBreaks = (str) => str.replace(/(\r\n|\n|\r)/gm, "");
