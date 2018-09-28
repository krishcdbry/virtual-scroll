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

var API_PATH = "http://message-list.appspot.com";
var API_LIMIT = 100;

// DOM Element references
var ROOT_ELEMENT = document.getElementById('container');
var HEADER_ELEMENT = document.getElementById('header');
var CONTENT_ELEMENT = document.getElementById('content');
var PLACE_HOLDER_ELEMENT = document.getElementById('place-holder');
var LOADER_ELEMENT = document.getElementById('loader');

// Constant limits
var X_AXIS_POSITION_RANGE = 100;
var Y_AXIS_POSITION_RANGE = 50;
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
        if (e.target.classList[0] == MESSAGE_CARD) {
            return e.target;
        } else {
            var elem = e.target;
            while (elem) {
                if (elem.classList && elem.classList[0] == MESSAGE_CARD) {
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
 * @name _adjustWindowMeasurments
 * @description Event handler for reset window measurments in case of resize screen or rotate device.
 * @type callback
 * @returns NULL
 */
var adjustWindowMeasurments = function adjustWindowMeasurments() {
    WINDOW_WIDTH = window.innerWidth;
    WINDOW_WIDTH = window.innerHeight;
};

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

exports.adjustWindowMeasurments = adjustWindowMeasurments;
exports.formatTime = formatTime;
exports.getIndexOfkey = getIndexOfkey;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _infiniteScroll = __webpack_require__(3);

var _infiniteScroll2 = _interopRequireDefault(_infiniteScroll);

__webpack_require__(5);

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
    var lastSectionHeight = 0;
    var currentContentTranslateY = 0;
    var stopProcessing = false;
    var loaderRendered = false;

    // Scroll Props
    var isScrolling = false;
    var currentScrollPosition = 0;
    var previousScrollPosition = 0;
    var lastRenderUpdatePosition = 0;
    var scrollDownRenderLimit = 0;
    var scrollUpRenderLimit = 0;

    var animationFrameProcessing = false;

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
        scrollDownRenderLimit -= elementHeight;
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
     * @name applyTransform
     * @description Applying transformation on every animation frame
     * @param {number} Ypos
     */
    var applyTransform = function applyTransform(YPos) {
        window.requestAnimationFrame(function () {
            _constants.CONTENT_ELEMENT.style.transform = 'translate3d(0,' + YPos + 'px, 0)';
        });
    };

    /**
     * @name removeFirstPage
     * @description Shifting the top most page and adding translateY to the CONTENT_ELEMENT 
     * @param {*} page 
     * @param {*} translateY 
     */
    var removeFirstPage = function removeFirstPage(page, translateY) {
        page.parentNode.removeChild(page);
        currentContentTranslateY = translateY;
        applyTransform(translateY);
        activeViewportPages.shift();
    };

    /**
     * @name removeLastPage
     * @description Popping out the bottom most page and reducing translateY to the CONTENT_ELEMENT
     * @param {*} page 
     * @param {*} translateY 
     */
    var removeLastPage = function removeLastPage(page, translateY) {
        page.parentNode.removeChild(page);
        currentContentTranslateY = translateY;
        applyTransform(translateY);
        activeViewportPages.pop();
    };

    /**
     * @name processRenderEngine
     * @description Handles the process of rendering the top page, bottom page 
     * - According to the input and calc it removes the top item or bottom item and modifies the content translateY accordingly
     * @argument {String} direction 
     */
    var processRenderEngine = function processRenderEngine() {
        var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.LOAD_BOTTOM;

        var sectionElements = document.getElementsByTagName('section');
        var sectionItem = sectionElements[0],
            newtranslateYTop = lastSectionHeight = sectionItem.offsetHeight;

        if (direction == _constants.LOAD_BOTTOM && totalPageCount > 2) {
            if (activeViewportPages[2] < totalPageCount) {
                appendNewPage();
            }

            if (currentContentTranslateY > 0) {
                newtranslateYTop = Number(currentContentTranslateY) + Number(lastSectionHeight);
            }

            contentTransforms.push(lastSectionHeight);

            if (activeViewportPages.length > 2) {
                // Removing page from top
                removeFirstPage(sectionItem, newtranslateYTop);
            }
        } else {
            if (activeViewportPages[0] == 1) {
                return;
            }

            prependNewPage();

            newtranslateYTop = currentContentTranslateY - (contentTransforms.length > 0 ? contentTransforms.pop() : lastSectionHeight);
            if (newtranslateYTop < 0) {
                if (!document.getElementById('p1')) {
                    newtranslateYTop = 0;
                }
            }

            // Removing pages from bottom
            if (activeViewportPages.length > 2) {
                removeLastPage(sectionElements[sectionElements.length - 1], newtranslateYTop);
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
        var listPage = document.createElement('section');
        listPage.id = pageId;
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
        loaderRendered = true;
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
        if (activeViewportPages.length > 2) {
            if (totalPageCount > activeViewportPages[2] + 3) {
                return false;
            }
        }
        return true;
    };

    /**
     * @name isDirectRender
     * @description Checking the need for direct render ater fetching data from API, depends on the user scroll interaction.
     * @returns {Boolean}
     */
    var isDirectRender = function isDirectRender() {
        if (totalPageCount > 3 && activeViewportPages.length >= 3) {
            if (totalPageCount > activeViewportPages[2]) {
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
            if (isDirectRender()) {
                prepareAndRenderListItem(res.messages, totalPageCount);
            }
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
     * It triggers whenever the user scrolls, It maintains 2 keys scrollDownRenderLimit, scrollUpRenderLimit
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

            if (totalPageCount < 3) {
                scrollDownRenderLimit = lastRenderUpdatePosition + lastSectionHeight / 3;
            } else if (totalPageCount == 3) {
                scrollDownRenderLimit = lastRenderUpdatePosition + lastSectionHeight;
            }

            if (scrollBehaviour == _constants.SCROLLING_DOWN && isPreFetchData()) {
                fetchData();
            }

            // If scroll position is greator than UPPER LIMIT and more than one section of messages (lastSectionHeight)
            if (scrollBehaviour == _constants.SCROLLING_DOWN && currentScrollPosition > scrollDownRenderLimit && currentScrollPosition > lastSectionHeight) {
                lastRenderUpdatePosition = currentScrollPosition;

                if (totalPageCount > 2) {
                    scrollDownRenderLimit = scrollDownRenderLimit + lastSectionHeight;
                    scrollUpRenderLimit = lastRenderUpdatePosition;
                }

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
                scrollUpRenderLimit = scrollUpRenderLimit - lastSectionHeight;
                scrollDownRenderLimit = lastRenderUpdatePosition;

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
        if (scrollPosition < currentContentTranslateY || currentContentTranslateY < 0) {
            currentContentTranslateY = scrollPosition;
            if (scrollPosition > lastSectionHeight) {
                currentContentTranslateY = scrollPosition - lastSectionHeight || 1;
            }
            applyTransform(currentContentTranslateY);
            scrollUpRenderLimit = currentContentTranslateY;
            scrollDownRenderLimit = scrollPosition + lastSectionHeight;
        }

        if (scrollUpRenderLimit < 0) {
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
        window.addEventListener('resize', _utils.adjustWindowMeasurments);
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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(6);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(8)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./app.scss", function() {
		var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./app.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "html {\n  overflow: hidden; }\n\nbody {\n  overflow: hidden;\n  background-color: #ededed;\n  font-family: 'Roboto', sans-serif;\n  overflow: hidden;\n  padding: 0;\n  margin: 0;\n  height: 100%;\n  width: 100%;\n  min-height: 100%;\n  min-width: 100%; }\n\nheader {\n  width: 100%;\n  height: 65px;\n  background-color: #6739b7;\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1000;\n  display: flex;\n  align-items: center;\n  color: #fff;\n  font-size: 21px; }\n  header span {\n    transform: rotate(90deg);\n    width: 53px;\n    display: flex;\n    justify-content: center;\n    align-items: center; }\n\n#root {\n  margin-top: 15px;\n  padding-top: 50px;\n  overflow-x: hidden;\n  width: 100%;\n  position: absolute;\n  height: auto;\n  width: 100%;\n  height: 100%;\n  overflow-y: scroll;\n  -webkit-overflow-scrolling: touch;\n  display: flex;\n  justify-content: center;\n  overflow-x: hidden !important; }\n\n#container {\n  position: relative;\n  height: auto;\n  overflow-y: scroll;\n  overflow-x: hidden;\n  width: 95%;\n  padding-top: 10px; }\n  #container::-webkit-scrollbar {\n    width: 0 !important;\n    -ms-overflow-style: none;\n    overflow: -moz-scrollbars-none; }\n\n#place-holder {\n  position: fixed;\n  width: 95%;\n  left: 50%;\n  z-index: -1;\n  display: block;\n  top: 68px;\n  transform: translate(-50%, 0%); }\n\n#content {\n  padding-top: 0px;\n  transform: translate3d(0, 0, 0);\n  width: 100%;\n  touch-action: pan-x;\n  will-change: transform;\n  overflow-x: hidden !important; }\n\nsection {\n  overflow-x: hidden !important;\n  background: #f0f0f0; }\n  section .card:first-child {\n    margin-top: 0px; }\n  section:before {\n    content: '...';\n    position: absolute;\n    top: -300px;\n    width: 100%;\n    background: #f0f0f0;\n    height: 300px;\n    color: #f0f0f0;\n    z-index: 1; }\n\n.card {\n  box-shadow: 0px 3px 2px #ccc;\n  width: 100%;\n  height: auto;\n  margin: 10px 0px;\n  padding: 10px 17px;\n  box-sizing: border-box;\n  border-radius: 2px;\n  background-color: #ffffff;\n  will-change: transform height;\n  transition: transform 0.2s, height 0.2s ease-in;\n  overflow: auto; }\n  .card.remove {\n    height: 0px !important;\n    padding: 0;\n    margin: 0;\n    margin-top: -10px; }\n\n.author-section {\n  display: flex;\n  align-items: center; }\n  .author-section .author-pic {\n    width: 40px;\n    height: 40px;\n    border-radius: 20px;\n    background: #ddd;\n    transition: opacity 0.7s ease-in-out; }\n  .author-section .name-section {\n    display: flex;\n    flex-direction: column;\n    margin-left: 13px; }\n    .author-section .name-section .username {\n      font-size: 14px;\n      color: black;\n      font-family: \"Roboto\";\n      line-height: 20px;\n      font-weight: bold; }\n    .author-section .name-section .timestamp {\n      font-size: 12px;\n      font-family: \"Roboto\";\n      color: #777; }\n\n.story {\n  font-size: 14px;\n  line-height: 20px;\n  color: black;\n  padding: 12px 0px; }\n\n.dummy .card {\n  height: 250px; }\n  .dummy .card .username {\n    background: #f0f0f0;\n    color: #f0f0f0;\n    width: 100px; }\n  .dummy .card .timestamp {\n    background: #f0f0f0;\n    color: #f0f0f0;\n    margin-top: 5px;\n    width: 44px;\n    height: 10px; }\n  .dummy .card .story {\n    background: #f0f0f0;\n    height: 115px;\n    margin-top: 15px;\n    color: #f0f0f0; }\n\n#loader.dummy .card {\n  height: 245px;\n  margin-top: 0px; }\n\n*::-webkit-scrollbar {\n  width: 0 !important;\n  -ms-overflow-style: none;\n  overflow: -moz-scrollbars-none; }\n", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(9);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {
		return null;
	}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);