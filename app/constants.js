// STRING CONSTANTS
const LOAD_BOTTOM = "LOAD_BOTTOM";
const LOAD_TOP = "LOAD_TOP";
const SCROLLING_DOWN = "SCROLLING_DOWN";
const SCROLLING_TOP = "SCROLLING_TOP";

const CLASSNAME_CARD = "card";  // Message card class
const CLASSNAME_STORY = "story";
const CLASSNAME_AUTHOR = "author-section";
const CLASSNAME_PIC = "author-pic";
const CLASSNAME_USER_DATA = "name-section";
const CLASSNAME_USERNAME = "username";
const CLASSNAME_TIMESTAMP = "timestamp";

const API_PATH = `${window.location.protocol}//message-list.appspot.com`;
const API_LIMIT = 50;

// DOM Element references
const ROOT_ELEMENT = document.getElementById('container');
const HEADER_ELEMENT = document.getElementById('header');
const CONTENT_ELEMENT = document.getElementById('content');
const PLACE_HOLDER_ELEMENT = document.getElementById('place-holder');
const LOADER_ELEMENT = document.getElementById('loader');

// Constant limits
const X_AXIS_POSITION_RANGE = 100;
const Y_AXIS_POSITION_RANGE = 50;
const SAFE_ASYNC_TIMEOUT = 100;
const SMOOTH_ASYNC_TIMEOUT = 200;
const RETRY_API_FETCH_TIMEOUT = 15000;

// Dummy card object
const PLACE_HOLDER_OBJ = {
    author : {name:  "name", photoUrl: null},
    content : null,
    id : null,
    updated : null
}

// Interaction Point 
const INTERACTION_OBJ = {
    x:0,
    y:0
}

/**
 * @name getElement
 * @description Which returns the card element checking the swipe off target
 * @param {HTMLElement} element
 * @returns NULL
 */
const GET_INTERACTED_ELEMENT = (e) => {
    try {
        if (e.target.classList[0] == CLASSNAME_CARD) {
            return e.target;
        }
        else {
            let elem = e.target;
            while(elem) {
                if (elem.classList && elem.classList[0] == CLASSNAME_CARD) {
                    return elem;
                }
                elem = elem.parentNode;
            }
        }
    } catch (e) {
        // Error
    }
    return null;
}

/**
 * @name GET_INTERACTION_POINT
 * @description Which returns touch point
 * @param {event} e
 * @returns Object
 */
const GET_INTERACTION_POINT = (e) => {
    let target = e;
    if (e.targetTouches) {
        target = e.targetTouches[0];
    }
    return {
            x: target.clientX,
            y: target.clientY
    };
}

export {
    LOAD_BOTTOM,
    LOAD_TOP,
    SCROLLING_DOWN,
    SCROLLING_TOP,

    CLASSNAME_CARD,
    CLASSNAME_STORY,
    CLASSNAME_AUTHOR,
    CLASSNAME_PIC,
    CLASSNAME_USER_DATA,
    CLASSNAME_USERNAME,
    CLASSNAME_TIMESTAMP,

    API_PATH,
    API_LIMIT,

    ROOT_ELEMENT,
    HEADER_ELEMENT,
    CONTENT_ELEMENT,
    PLACE_HOLDER_ELEMENT,
    LOADER_ELEMENT,

    X_AXIS_POSITION_RANGE,
    Y_AXIS_POSITION_RANGE,
    SAFE_ASYNC_TIMEOUT,
    SMOOTH_ASYNC_TIMEOUT,
    RETRY_API_FETCH_TIMEOUT,

    PLACE_HOLDER_OBJ,
    INTERACTION_OBJ,

    GET_INTERACTION_POINT,
    GET_INTERACTED_ELEMENT
}