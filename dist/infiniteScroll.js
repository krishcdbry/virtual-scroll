/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// STRING CONSTANTS
var LOAD_BOTTOM = "LOAD_BOTTOM";
var LOAD_TOP = "LOAD_TOP";
var SCROLLING_DOWN = "SCROLLING_DOWN";
var SCROLLING_TOP = "SCROLLING_TOP";

var CLASSNAME_CARD = "card"; // Message card class
var CLASSNAME_STORY = "story";
var CLASSNAME_AUTHOR = "author-section";
var CLASSNAME_PIC = "author-pic";
var CLASSNAME_USER_DATA = "name-section";
var CLASSNAME_USERNAME = "username";
var CLASSNAME_TIMESTAMP = "timestamp";

var API_PATH = window.location.protocol + "//message-list.appspot.com";
var API_LIMIT = 50;

// DOM Element references
var ROOT_ELEMENT = document.getElementById('container');
var HEADER_ELEMENT = document.getElementById('header');
var CONTENT_ELEMENT = document.getElementById('content');
var PLACE_HOLDER_ELEMENT = document.getElementById('place-holder');
var LOADER_ELEMENT = document.getElementById('loader');

// Constant limits
var X_AXIS_POSITION_RANGE = 100;
var Y_AXIS_POSITION_RANGE = 50;
var SAFE_SCROLL_LIMIT = 250;
var SAFE_ASYNC_TIMEOUT = 100;
var SMOOTH_ASYNC_TIMEOUT = 200;
var RETRY_API_FETCH_TIMEOUT = 15000;

// Dummy card object
var PLACE_HOLDER_OBJ = {
    author: { name: "name", photoUrl: null },
    content: null,
    id: null,
    updated: null

    // Interaction Point 
};var INTERACTION_OBJ = {
    x: 0,
    y: 0

    /**
     * @name getElement
     * @description Which returns the card element checking the swipe off target
     * @param {HTMLElement} element
     * @returns NULL
     */
};var GET_INTERACTED_ELEMENT = function GET_INTERACTED_ELEMENT(e) {
    try {
        if (e.target.classList[0] == CLASSNAME_CARD) {
            return e.target;
        } else {
            var elem = e.target;
            while (elem) {
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
};

/**
 * @name GET_INTERACTION_POINT
 * @description Which returns touch point
 * @param {event} e
 * @returns Object
 */
var GET_INTERACTION_POINT = function GET_INTERACTION_POINT(e) {
    var target = e;
    if (e.targetTouches) {
        target = e.targetTouches[0];
    }
    return {
        x: target.clientX,
        y: target.clientY
    };
};

exports.LOAD_BOTTOM = LOAD_BOTTOM;
exports.LOAD_TOP = LOAD_TOP;
exports.SCROLLING_DOWN = SCROLLING_DOWN;
exports.SCROLLING_TOP = SCROLLING_TOP;
exports.CLASSNAME_CARD = CLASSNAME_CARD;
exports.CLASSNAME_STORY = CLASSNAME_STORY;
exports.CLASSNAME_AUTHOR = CLASSNAME_AUTHOR;
exports.CLASSNAME_PIC = CLASSNAME_PIC;
exports.CLASSNAME_USER_DATA = CLASSNAME_USER_DATA;
exports.CLASSNAME_USERNAME = CLASSNAME_USERNAME;
exports.CLASSNAME_TIMESTAMP = CLASSNAME_TIMESTAMP;
exports.API_PATH = API_PATH;
exports.API_LIMIT = API_LIMIT;
exports.ROOT_ELEMENT = ROOT_ELEMENT;
exports.HEADER_ELEMENT = HEADER_ELEMENT;
exports.CONTENT_ELEMENT = CONTENT_ELEMENT;
exports.PLACE_HOLDER_ELEMENT = PLACE_HOLDER_ELEMENT;
exports.LOADER_ELEMENT = LOADER_ELEMENT;
exports.X_AXIS_POSITION_RANGE = X_AXIS_POSITION_RANGE;
exports.Y_AXIS_POSITION_RANGE = Y_AXIS_POSITION_RANGE;
exports.SAFE_SCROLL_LIMIT = SAFE_SCROLL_LIMIT;
exports.SAFE_ASYNC_TIMEOUT = SAFE_ASYNC_TIMEOUT;
exports.SMOOTH_ASYNC_TIMEOUT = SMOOTH_ASYNC_TIMEOUT;
exports.RETRY_API_FETCH_TIMEOUT = RETRY_API_FETCH_TIMEOUT;
exports.PLACE_HOLDER_OBJ = PLACE_HOLDER_OBJ;
exports.INTERACTION_OBJ = INTERACTION_OBJ;
exports.GET_INTERACTION_POINT = GET_INTERACTION_POINT;
exports.GET_INTERACTED_ELEMENT = GET_INTERACTED_ELEMENT;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * @name _formatTime
 * @description time formatter which convers JS date in form of short string
 * @returns {String}
 */
var formatTime = function formatTime(date) {
    var secondsRange = 2592000;
    var daysRange = 86400;
    var hoursRange = 3600;
    var minutesRange = 60;

    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);

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
var getIndexOfkey = function getIndexOfkey(inputArr, needleObj) {

    if (Object.prototype.toString.call(needleObj) !== '[object Object]') {
        return "Not a valid needle(object)";
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

exports.formatTime = formatTime;
exports.getIndexOfkey = getIndexOfkey;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _infiniteScroll = __webpack_require__(3);

var _infiniteScroll2 = _interopRequireDefault(_infiniteScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('load', function () {
    (function (window, document) {
        window.IS = (0, _infiniteScroll2.default)(window, document);
        IS.init();
    })(window, document);
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(0);

var _utils = __webpack_require__(1);

var _domUtils = __webpack_require__(4);

/**
 * @name InfiniteScroll
 * @param {*} window 
 * @param {*} document 
 */
var InfiniteScroll = function InfiniteScroll(window, document) {

    // Window measurments 
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    // Swipe props
    var currentSwipeElement = null;
    var touchStartPosition = _constants.INTERACTION_OBJ;
    var touchLastPosition = _constants.INTERACTION_OBJ;

    // API 
    var apiEnd = _constants.API_PATH;
    var apiPageToken = null;
    var apiPageLimit = _constants.API_LIMIT;
    var apiFetchInProgress = false;
    var totalPageCount = 0;

    // RenderEngine Properties
    var activeViewportPages = [];
    var localMessageStore = {};
    var totalMessageItems = 0;
    var contentTransforms = [];
    var lastPageHeight = 0;
    var currentContentPaddingTop = 0;
    var stopProcessing = false;
    var loaderRendered = false;
    var processRendering = false;

    // Scroll Props
    var isScrolling = false;
    var currentScrollPosition = 0;
    var previousScrollPosition = 0;
    var lastRenderUpdatePosition = 0;
    var scrollUpRenderLimit = 0;

    var animationFrameProcessing = false;

    /**
     * @name adjustWindowMeasurments
     * @description Event handler for reset window measurments in case of resize screen or rotate device.
     * @type callback
     * @returns NULL
     */
    var adjustWindowMeasurments = function adjustWindowMeasurments() {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    };

    /**
     * @name swipeTimeTaken
     * @description Which calculates the time taken from start to end of a swipe (touch event)
     * @returns {Number}
     */
    var swipeTimeTaken = function swipeTimeTaken() {
        return touchLastPosition.time - touchStartPosition.time;
    };

    /**
     * @name isYAxisInRange
     * @description Which calculates Y range for swiping off a card
     * - Checking the Y-axis swipe of a user is in Y_AXIS_POSITION_RANGE
     * @param {Number} y
     * @returns {Boolean}
     */
    var isYAxisInRange = function isYAxisInRange(y) {
        var range = Math.abs(y - touchStartPosition.y);
        return range < _constants.Y_AXIS_POSITION_RANGE;
    };

    /**
     * @name isXAxisInRange
     * @description Which calculates X range for swiping off a card
     * @param {Number} y
     * @returns {Boolean}
     */
    var isXAxisInRange = function isXAxisInRange(xPos) {
        var _touchStartPosition = touchStartPosition,
            x = _touchStartPosition.x;

        var minSpaceCorner = windowWidth - 65;
        var distance = xPos > x ? xPos - x : x - xPos;
        var time = swipeTimeTaken();
        return distance > _constants.X_AXIS_POSITION_RANGE;
    };

    /**
     * @name spliceItem
     * @description Which splices the swiped item from the localMessageStore
     * @argument {Object} parent  - Section Info
     * @argument {Object} item - Item info
     * @returns NULL
     */
    var spliceItem = function spliceItem(parentId, itemId) {
        if (localMessageStore[parentId]) {
            var pageItems = localMessageStore[parentId];
            var itemIdx = (0, _utils.getIndexOfkey)(pageItems, { "id": itemId });
            if (itemIdx > -1) {
                pageItems.splice(itemIdx, 1);
            }
            localMessageStore[parentId] = pageItems;
        }
    };

    /**
     * @name removeSwipedOffNode
     * @description Which removes the DOM node after swiping off
     * @param {HTMLElement} element
     * @returns NULL
     */
    var removeSwipedOffNode = function removeSwipedOffNode(element) {
        if (!element) {
            return;
        }
        var parent = element.parentNode;
        spliceItem(parent.id, element.id);
        var elementHeight = element.offsetHeight;
        scrollUpRenderLimit -= elementHeight;
        currentSwipeElement = null;
        element.remove();
    };

    /**
     * @name animationFrame
     * @description Which maintaind the sync to run the animation on calling RAF, Which leads to a smooth animation
     * @param NULL
     * @returns NULL
     */
    var animationFrame = function animationFrame() {
        if (!animationFrameProcessing || !touchStartPosition.x || !touchLastPosition.x || !currentSwipeElement) {
            return;
        }

        var _touchLastPosition = touchLastPosition,
            x = _touchLastPosition.x,
            y = _touchLastPosition.y;


        var XPos = x - touchStartPosition.x;
        var transform = 'translate3d(' + XPos + 'px, 0, 0)';

        // Checking the X,Y range to discard the item
        if (isXAxisInRange(x) && isYAxisInRange(y)) {
            currentSwipeElement.style.transform = transform;
            currentSwipeElement.style.webkitTransform = transform;
            currentSwipeElement.style.MozTransform = transform;
            currentSwipeElement.style.opacity = '0.4';
        }
        animationFrameProcessing = false;
    };

    /**
     * @name resetElementPosition
     * @description Rest the swiped element to the normal position
     * @param NULL
     * @returns NULL
     */
    var resetElementPosition = function resetElementPosition() {
        var transform = 'translate(0,0)';
        currentSwipeElement.style.transform = transform;
        currentSwipeElement.style.webkitTransform = transform;
        currentSwipeElement.style.MozTransform = transform;
        currentSwipeElement.style.opacity = '1';
    };

    /**
     * @name transitionEnd
     * @description Applying smooth swipe off feel once after the transiion end
     * @param NULL
     * @returns NULL
     */
    var transitionEnd = function transitionEnd() {
        if (!currentSwipeElement) {
            return;
        }
        currentSwipeElement.classList.add('remove');
        currentSwipeElement.innerHTML = "";
        setTimeout(function () {
            removeSwipedOffNode(currentSwipeElement);
        }, _constants.SMOOTH_ASYNC_TIMEOUT);
    };

    /**
     * @name touchStart
     * @description Event handler for when user initiates swiping (touchstart)
     * @argument {object} event
     * @type callback
     * @returns NULL
     */
    var touchStart = function touchStart(event, elem) {
        currentSwipeElement = elem;
        if (event.touches && event.touches.length > 1) {
            return;
        }
        touchStartPosition = (0, _constants.GET_INTERACTION_POINT)(event);
    };

    /**
     * @name touchMove
     * @description Event handler for when user is swiping (touchmove)
     * @argument {object} event
     * @type callback
     * @returns NULL
     */
    var touchMove = function touchMove(event) {

        if (!touchStartPosition.x) {
            return;
        }

        touchLastPosition = (0, _constants.GET_INTERACTION_POINT)(event);

        if (animationFrameProcessing) {
            return;
        }

        animationFrameProcessing = true;
        window.requestAnimationFrame(animationFrame);
    };

    /**
     * @name touchEnd
     * @description Event handler for when user stops swiping (touchend) - It resets the start, end positions
     * @returns NULL
     */
    var touchEnd = function touchEnd(event) {
        var _touchLastPosition2 = touchLastPosition,
            x = _touchLastPosition2.x,
            y = _touchLastPosition2.y;

        // Checking the X,Y range to discard the item

        if (isXAxisInRange(x) && isYAxisInRange(y)) {
            if (currentSwipeElement && currentSwipeElement.parentNode) {
                var xPos = windowWidth + 100;
                if (x < touchStartPosition.x) {
                    xPos = ~xPos;
                }
                currentSwipeElement.style.opacity = '0.2';
                currentSwipeElement.style.transform = 'translate3d(' + xPos + 'px, 0, 0)';
                currentSwipeElement.style.height = currentSwipeElement.offsetHeight + "px";
                currentSwipeElement.addEventListener('transitionend', transitionEnd);
            }
        } else {
            resetElementPosition();
        }

        touchStartPosition = _constants.INTERACTION_OBJ;
        touchLastPosition = _constants.INTERACTION_OBJ;
        animationFrameProcessing = false;
    };

    /**
     * @name appendNewPage
     * @description adding page to bottom
     */
    var appendNewPage = function appendNewPage() {
        var lastActivePageIdx = activeViewportPages[activeViewportPages.length - 1];
        var lastActivePageElem = document.getElementById("page" + lastActivePageIdx);
        var pageId = "page" + (lastActivePageIdx + 1);

        // Appending page to bottom
        var documentFragment = prepareListItem(localMessageStore[pageId], pageId);
        _constants.CONTENT_ELEMENT.appendChild(documentFragment);
        activeViewportPages.push(lastActivePageIdx + 1);
    };

    /**
     * @name prependNewPage
     * @description adding page to top
     */
    var prependNewPage = function prependNewPage() {
        var firstActivePageIdx = activeViewportPages[0];
        var firstActivePageElem = document.getElementById("page" + firstActivePageIdx);
        var pageId = "page" + (firstActivePageIdx - 1);

        // Appending page to top
        if (firstActivePageElem) {
            var documentFragment = prepareListItem(localMessageStore[pageId], pageId);
            firstActivePageElem.parentNode.insertBefore(documentFragment, firstActivePageElem);
            activeViewportPages.unshift(firstActivePageIdx - 1);
        }
    };

    /**
     * @name applyPadding
     * @description Applying transformation on every animation frame
     * @param {number} Ypos
     */
    var applyPadding = function applyPadding(YPos) {
        if (YPos < 200) {
            YPos = 0;
        }
        window.requestAnimationFrame(function () {
            _constants.CONTENT_ELEMENT.style.paddingTop = YPos + "px";
        });
    };

    /**
     * @name removeFirstPage
     * @description Shifting the top most page and adding translateY to the CONTENT_ELEMENT 
     * @param {*} page 
     * @param {*} translateY 
     */
    var removeFirstPage = function removeFirstPage(page, translateY) {
        console.log("Removing Page", page, translateY);
        page.parentNode.removeChild(page);
        currentContentPaddingTop = translateY;
        applyPadding(translateY);
        activeViewportPages.shift();
        setTimeout(function () {
            processRendering = false;
        }, 100);
    };

    /**
     * @name removeLastPage
     * @description Popping out the bottom most page and reducing translateY to the CONTENT_ELEMENT
     * @param {*} page 
     * @param {*} translateY 
     */
    var removeLastPage = function removeLastPage(page, translateY) {
        page.parentNode.removeChild(page);
        currentContentPaddingTop = translateY;
        applyPadding(translateY);
        activeViewportPages.pop();
        setTimeout(function () {
            processRendering = false;
        }, 100);
    };

    /**
     * @name processRenderEngine
     * @description Handles the process of rendering the top page, bottom page 
     * - According to the input and calc it removes the top item or bottom item and modifies the content translateY accordingly
     * @argument {String} direction 
     */
    var processRenderEngine = function processRenderEngine() {
        var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.LOAD_BOTTOM;

        if (processRendering) {
            return;
        }

        var sectionElements = document.getElementsByClassName('page');
        var sectionItem = sectionElements[0],
            newPaddingTop = lastPageHeight = sectionItem.offsetHeight;

        if (direction == _constants.LOAD_BOTTOM && totalPageCount > 2) {
            processRendering = true;
            if (activeViewportPages[2] < totalPageCount) {
                appendNewPage();
            }

            if (currentContentPaddingTop > 0) {
                newPaddingTop = Number(currentContentPaddingTop) + Number(lastPageHeight);
            }

            if (activeViewportPages.length > 2) {
                // Removing page from top
                removeFirstPage(sectionItem, newPaddingTop);
            }
        } else {

            if (activeViewportPages[0] == 1) {
                return;
            }
            processRendering = true;

            prependNewPage();

            newPaddingTop = currentContentPaddingTop - (contentTransforms.length > 0 ? contentTransforms.pop() : lastPageHeight);
            // Removing pages from bottom
            if (activeViewportPages.length > 2) {
                removeLastPage(sectionElements[sectionElements.length - 1], newPaddingTop);
            }
        }
    };

    /**
     * @name prepareListItem
     * @description prepare the list items (DOM)
     * @argument {Array} list 
     * @argument {String} pageId
     * @returns {HTMLFrameElement} documentFragment
     */
    var prepareListItem = function prepareListItem(list, pageId) {
        var documentFragment = document.createDocumentFragment();
        var listPage = document.createElement('div');
        listPage.id = pageId;
        listPage.className = "page";
        var pageItems = [];

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                var listElem = document.createElement('div');
                var authorElem = (0, _domUtils.prepareAuthorInfoElement)(item, apiEnd);
                var storyElement = (0, _domUtils.prepareStoryElement)(item, pageId);

                listElem.className = _constants.CLASSNAME_CARD;
                listElem.id = item.id;
                listElem.appendChild(authorElem);
                listElem.appendChild(storyElement);

                // Appending list element to list page
                listPage.appendChild(listElem);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        documentFragment.appendChild(listPage);
        return documentFragment;
    };

    /**
     * @name prepareAndRenderListItem
     * @description prepare and render on demand
     * @argument {page} number 
     * @argument {Array} list
     */
    var prepareAndRenderListItem = function prepareAndRenderListItem(list, page) {
        var pageId = "page" + page;
        var documentFragment = prepareListItem(list, pageId);
        _constants.CONTENT_ELEMENT.appendChild(documentFragment);
        activeViewportPages.push(totalPageCount);
    };

    /**
     * @name renderPlaceHolder
     * @description rendering the placeholder cards for better UX
     * @argument {Number} limit 
     */
    var renderPlaceHolder = function renderPlaceHolder(limit) {
        var documentFragment = document.createDocumentFragment();
        var idx = 0;
        while (idx < limit) {
            var item = _constants.PLACE_HOLDER_OBJ;
            var listElem = document.createElement('div');
            var authorElem = (0, _domUtils.prepareAuthorInfoElement)(item);
            var storyElement = (0, _domUtils.prepareStoryElement)(item, "page");

            listElem.className = _constants.CLASSNAME_CARD;
            listElem.id = "fake-" + idx;
            listElem.appendChild(authorElem);
            listElem.appendChild(storyElement);
            documentFragment.appendChild(listElem);
            idx++;
        }
        _constants.PLACE_HOLDER_ELEMENT.appendChild(documentFragment);
    };

    /**
     * @name renderLoader
     * @description rendering the loader card for better UX
     */
    var renderLoader = function renderLoader() {
        var documentFragment = document.createDocumentFragment();
        var idx = 0;
        while (idx < 1) {
            var item = _constants.PLACE_HOLDER_OBJ;
            var listElem = document.createElement('div');
            var authorElem = (0, _domUtils.prepareAuthorInfoElement)(item);
            var storyElement = (0, _domUtils.prepareStoryElement)(item, "page");

            listElem.className = _constants.CLASSNAME_CARD;
            listElem.id = "loader-" + idx;
            listElem.appendChild(authorElem);
            listElem.appendChild(storyElement);
            documentFragment.appendChild(listElem);
            idx++;
        }
        _constants.LOADER_ELEMENT.appendChild(documentFragment);
        _constants.LOADER_ELEMENT.style.opacity = 1;
        loaderRendered = true;
        _constants.PLACE_HOLDER_ELEMENT.remove();
    };

    /**
     * @name preCacheList
     * @description saving messages in local store - localMessageStore order by pages
     * @argument {Number} page
     * @argument {Array} list 
     */
    var preCacheList = function preCacheList(page, list) {
        localMessageStore["page" + page] = list;
    };

    /**
     * @name loadMorePages
     * @description Checking the need to load more pages as per user interaction with page and cache data
     * @returns {Boolean}
     */
    var loadMorePages = function loadMorePages() {
        console.log(activeViewportPages, totalPageCount);
        if (totalPageCount > 2 && activeViewportPages.length > 2) {
            if (activeViewportPages[2] != totalPageCount) {
                return false;
            }
        }
        return true;
    };

    /**
     * @name fetchData
     * @description API fetching using the JS Fetch
     * @returns {Boolean}
     */
    var fetchData = function fetchData() {
        if (apiFetchInProgress) {
            return;
        }
        apiFetchInProgress = true;
        var url = apiEnd + '/messages?limit=' + apiPageLimit;
        if (apiPageToken) {
            url += '&pageToken=' + apiPageToken;
        }
        apiPageToken = null;
        fetch(url).then(function (res) {
            return res.json();
        }).then(function (res) {
            if (!res.messages) {
                stopProcessing = true;
                return;
            }
            apiFetchInProgress = false;
            totalPageCount++;
            apiPageToken = res.pageToken;
            totalMessageItems += res.messages.length;
            preCacheList(totalPageCount, res.messages);
            prepareAndRenderListItem(res.messages, totalPageCount);
            if (!loaderRendered) {
                renderLoader();
            }
        }).catch(function (err) {
            stopProcessing = true;
            apiFetchInProgress = false;
            setTimeout(function () {
                fetchData();
            }, _constants.RETRY_API_FETCH_TIMEOUT);
        });
    };

    /**
     * @name isPreFetchData
     * @description Checking the need for prefetching data in case of minimal page length
     * @returns {Boolean}
     */
    var isPreFetchData = function isPreFetchData() {
        return totalPageCount < 3 || totalMessageItems < 100;
    };

    /**
     * @name rootScrollHandler
     * @description Scroll event handler 
     * It triggers whenever the user scrolls, It maintains 2 keys  scrollUpRenderLimit
     * Depends on these it decides wether to process upper section, bottom section and also triggers fetching more data
     * @param {Boolean} TOP 
     */
    var rootScrollHandler = function rootScrollHandler(e) {
        e.preventDefault();
        currentScrollPosition = e.target.scrollTop;

        var scrollBehaviour = _constants.SCROLLING_TOP;

        if (currentScrollPosition > previousScrollPosition) {
            scrollBehaviour = _constants.SCROLLING_DOWN;
        }

        previousScrollPosition = currentScrollPosition;

        if (!lastRenderUpdatePosition) {
            lastRenderUpdatePosition = currentScrollPosition;
        } else {
            var scrollLimit = _constants.ROOT_ELEMENT.scrollHeight - _constants.ROOT_ELEMENT.clientHeight - _constants.SAFE_SCROLL_LIMIT;
            if (scrollBehaviour == _constants.SCROLLING_DOWN && currentScrollPosition > scrollLimit) {
                lastRenderUpdatePosition = currentScrollPosition;
                scrollUpRenderLimit = lastRenderUpdatePosition - lastPageHeight;

                if (loadMorePages()) {
                    fetchData(); // Fetches more pages
                }

                if (stopProcessing) {
                    // Once the data from API ends
                    return;
                }

                processRenderEngine(); // Processing DOM
            } else if (scrollBehaviour == _constants.SCROLLING_TOP && currentScrollPosition < scrollUpRenderLimit) {
                lastRenderUpdatePosition = currentScrollPosition;
                scrollUpRenderLimit = scrollUpRenderLimit - lastPageHeight;
                processRenderEngine(_constants.LOAD_TOP); // Processing DOM
            }
        }
    };

    /**
     * @name handleScrollEnd
     * @description Handle rapid scroll cases once the scroll Ended
     * @returns NULL
     */
    var handleScrollEnd = function handleScrollEnd(e) {
        var scrollPosition = e.target.scrollTop;
        if (scrollPosition < currentContentPaddingTop || currentContentPaddingTop < 0) {
            currentContentPaddingTop = scrollPosition;
            if (scrollPosition > lastPageHeight) {
                currentContentPaddingTop = scrollPosition - lastPageHeight || 1;
            }
            applyPadding(currentContentPaddingTop);
            scrollUpRenderLimit = currentContentPaddingTop;
        }

        if (scrollUpRenderLimit < 0 || scrollPosition == 0) {
            scrollUpRenderLimit = 1;
            if (activeViewportPages[0] != 1) {
                prependNewPage();
            }
        }
    };

    /**
     * @name addEventListeners
     * @description Adding event scroll, resize event listeners for window, root object respectively
     * @returns NULL
     */
    var addEventListeners = function addEventListeners() {
        _constants.ROOT_ELEMENT.addEventListener('scroll', function (e) {
            rootScrollHandler(e);
            window.clearTimeout(isScrolling);
            isScrolling = setTimeout(function () {
                handleScrollEnd(e);
            }, _constants.SAFE_ASYNC_TIMEOUT);
        }, false);

        _constants.CONTENT_ELEMENT.addEventListener('touchstart', function (e) {
            var element = (0, _constants.GET_INTERACTED_ELEMENT)(e);
            if (element) {
                touchStart(e, element);
            }
        });
        _constants.CONTENT_ELEMENT.addEventListener('touchmove', touchMove);
        _constants.CONTENT_ELEMENT.addEventListener('touchend', touchEnd);
        window.addEventListener('resize', adjustWindowMeasurments);
    };

    /**
     * @name addEventListeners
     * @description user can extend the config - For now only API, LIMIT can be extended
     * @returns NULL
     */
    var extendConfig = function extendConfig(obj) {
        if (obj.api) {
            apiEnd = obj.api;
        }
        if (obj.limit) {
            apiPageLimit = obj.limit >= 10 ? obj.limit : 10;
        }
    };

    /**
     * @name _init
     * @description triggering the virtual list plugin
     */
    var _init = function _init() {
        var configObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        extendConfig(configObj);
        renderPlaceHolder(3);
        addEventListeners();
        fetchData();
    };

    return {
        init: _init
    };
};

exports.default = InfiniteScroll;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.prepareAuthorInfoElement = exports.prepareStoryElement = undefined;

var _utils = __webpack_require__(1);

var _constants = __webpack_require__(0);

/**
 * @name loadImageAsync
 * @description Loading images in the background for smooth loading
 * @argument {HTMLElement} elem
 * @argument {STRING} src 
 * @returns NULL
 */
var loadImageAsync = function loadImageAsync(elem, src) {
    var realImage = new Image();
    realImage.onload = function () {
        elem.style.background = 'url(' + src + ')';
        elem.style.backgroundSize = 'cover';
        elem.style.backgroundPosition = 'center';
        elem.style.opacity = 1;
    };
    realImage.src = src;
};

/**
 * @name prepareAuthorPicElement
 * @description preparing the author profile pic element
 * @argument {String} url 
 * @returns {HTMLElement} profilepic
 */
var prepareAuthorPicElement = function prepareAuthorPicElement(url) {
    var profilePic = document.createElement('div');
    profilePic.className = _constants.CLASSNAME_PIC;
    if (url) {
        profilePic.style.opacity = 0;
        loadImageAsync(profilePic, url);
    }
    return profilePic;
};

/**
 * @name prepareAuthornameElement
 * @description preparing the author name element
 * @argument {Object} author 
 * @argument {String} time 
 * @returns {HTMLElement} authorElement
 */
var prepareAuthornameElement = function prepareAuthornameElement(author, time) {
    var authorElement = document.createElement('div');
    authorElement.className = _constants.CLASSNAME_USER_DATA;

    var username = document.createElement('span');
    username.className = _constants.CLASSNAME_USERNAME;
    username.innerHTML = author.name;

    var timeStamp = document.createElement('span');
    timeStamp.className = _constants.CLASSNAME_TIMESTAMP;
    timeStamp.innerHTML = time ? (0, _utils.formatTime)(new Date(time)) : "";

    authorElement.appendChild(username);
    authorElement.appendChild(timeStamp);

    return authorElement;
};

/**
 * @name prepareAuthorInfoElement
 * @description preparing the author name element
 * @argument {Object} data 
 * @returns {HTMLElement} item
 */
var prepareAuthorInfoElement = function prepareAuthorInfoElement(data, API_END) {
    var item = document.createElement('div');
    item.className = _constants.CLASSNAME_AUTHOR;
    var profilePic = prepareAuthorPicElement(API_END + data.author.photoUrl);
    var authorName = prepareAuthornameElement(data.author, data.updated);
    item.appendChild(profilePic);
    item.appendChild(authorName);
    return item;
};

/**
 * @name prepareStoryElement
 * @description preparing the story element
 * @argument {Object} data 
 * @argument {String} page
 * @returns {HTMLElement} storyElement
 */
var prepareStoryElement = function prepareStoryElement(item, page) {
    var storyElement = document.createElement('div');
    storyElement.className = _constants.CLASSNAME_STORY;
    storyElement.innerHTML = item.content;
    return storyElement;
};

exports.prepareStoryElement = prepareStoryElement;
exports.prepareAuthorInfoElement = prepareAuthorInfoElement;

/***/ })
/******/ ]);