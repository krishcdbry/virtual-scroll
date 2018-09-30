import {
    formatTime
} from './utils';

import {
    CLASSNAME_CARD,
    CLASSNAME_STORY,
    CLASSNAME_AUTHOR,
    CLASSNAME_PIC,
    CLASSNAME_USER_DATA,
    CLASSNAME_USERNAME,
    CLASSNAME_TIMESTAMP
} from './constants';

/**
 * @name loadImageAsync
 * @description Loading images in the background for smooth loading
 * @argument {HTMLElement} elem
 * @argument {STRING} src 
 * @returns NULL
 */
const loadImageAsync = (elem, src) => {
    let realImage = new Image();
    realImage.onload = () => {
        elem.style.background = `url(${src})`; 
        elem.style.backgroundSize = 'cover';
        elem.style.backgroundPosition = 'center';
        elem.style.opacity = 1;
    }
    realImage.src = src;
}

/**
 * @name prepareAuthorPicElement
 * @description preparing the author profile pic element
 * @argument {String} url 
 * @returns {HTMLElement} profilepic
 */
const prepareAuthorPicElement = (url) => {
    let profilePic = document.createElement('div');
    profilePic.className = CLASSNAME_PIC;
    if (url) {
        profilePic.style.opacity = 0;
        loadImageAsync(profilePic, url);
    }
    return profilePic;
}

/**
 * @name prepareAuthornameElement
 * @description preparing the author name element
 * @argument {Object} author 
 * @argument {String} time 
 * @returns {HTMLElement} authorElement
 */
const prepareAuthornameElement = (author, time) => {
    let authorElement = document.createElement('div');
    authorElement.className = CLASSNAME_USER_DATA;

    let username = document.createElement('span');
    username.className = CLASSNAME_USERNAME;
    username.innerHTML = author.name;

    let timeStamp = document.createElement('span');
    timeStamp.className = CLASSNAME_TIMESTAMP;
    timeStamp.innerHTML = (time) ? formatTime(new Date(time)) : "";

    authorElement.appendChild(username)
    authorElement.appendChild(timeStamp);

    return authorElement;
}

/**
 * @name prepareAuthorInfoElement
 * @description preparing the author name element
 * @argument {Object} data 
 * @returns {HTMLElement} item
 */
const prepareAuthorInfoElement = (data, API_END) => {
    let item = document.createElement('div');
    item.className = CLASSNAME_AUTHOR;
    let profilePic = prepareAuthorPicElement(API_END+data.author.photoUrl);
    let authorName = prepareAuthornameElement(data.author, data.updated);
    item.appendChild(profilePic)
    item.appendChild(authorName);
    return item;
}

/**
 * @name prepareStoryElement
 * @description preparing the story element
 * @argument {Object} data 
 * @argument {String} page
 * @returns {HTMLElement} storyElement
 */
const prepareStoryElement = (item, page) => {
    let storyElement = document.createElement('div');
    storyElement.className = CLASSNAME_STORY;
    storyElement.innerHTML = item.content;
    return storyElement;
}


 /**
 * @name renderLoaderAnim
 * @description rendering the placeholder cards for better UX
 * @argument {Number} limit 
 */
const renderLoaderAnim = () => {
    let loaderAnim = document.createElement('div'),
        divChild = document.createElement('div'),
        divChild2 = document.createElement('div'),
        divChild3 = document.createElement('div');
    loaderAnim.className = "loader-anim";
    loaderAnim.appendChild(divChild);
    loaderAnim.appendChild(divChild2);
    loaderAnim.appendChild(divChild3);
    return loaderAnim;
}

export {
    prepareStoryElement,
    prepareAuthorInfoElement,
    renderLoaderAnim
}