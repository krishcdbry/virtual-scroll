/**
 * @name _adjustWindowMeasurments
 * @description Event handler for reset window measurments in case of resize screen or rotate device.
 * @type callback
 * @returns NULL
 */
const adjustWindowMeasurments = () => {
    WINDOW_WIDTH = window.innerWidth;
    WINDOW_WIDTH = window.innerHeight;
};

/**
 * @name _formatTime
 * @description time formatter which convers JS date in form of short string
 * @returns {String}
 */
const formatTime = (date) => {
    const secondsRange = 2592000;
    const daysRange = 86400;
    const hoursRange = 3600;
    const minutesRange = 60;

    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }

    interval = Math.floor(seconds / monthsRange);
    if (interval > 1) {
        return interval + " months ago";
    }

    interval = Math.floor(seconds / daysRange);
    if (interval > 1) {
        return interval + " days ago";
    }

    interval = Math.floor(seconds / hoursRange);
    if (interval > 1) {
        return interval + " hours ago";
    }

    interval = Math.floor(seconds / minutesRange);

    if (interval > 1) {
        return interval + " minutes ago";
    }

    return Math.floor(seconds) + " seconds ago";
};

/**
 * @name _getIndexOfkey
 * @description Which receives array, (key, value) pair and returns the index
 * @argument {array} inputArr  - Input array
 * @argument {object} needleObj, key value pair to find
 * @returns {number} idx
 */
const getIndexOfkey = (inputArr, needleObj) => {

    if (Object.prototype.toString.call(needleObj) !== '[object Object]') {
        return "Not a valid needle(object)"
    }

    if (Object.prototype.toString.call(inputArr) !== '[object Array]') {
        return "Not a valid array";
    }

    var idx = -1;
    var needleKey = Object.keys(needleObj)[0];
    var needleValue = needleObj[needleKey];

    for (var i = 0; i < inputArr.length; i++) {
        var val = inputArr[i];
        if (val[needleKey] == needleValue) {
            idx = i;
            break;
        }
    }

    return idx;
};

export  {
    adjustWindowMeasurments,
    formatTime,
    getIndexOfkey
}

