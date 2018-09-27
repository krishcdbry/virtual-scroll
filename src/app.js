 try {  
    window.virtualList = (function(window, document){

        // STRING CONSTANTS
        const LOAD_BOTTOM = "LOAD_BOTTOM";
        const LOAD_TOP = "LOAD_TOP";
        const SCROLLING_DOWN = "SCROLLING_DOWN";
        const SCROLLING_TOP = "SCROLLING_TOP";

        // DOM Element references
        const ROOT_ELEMENT = document.getElementById('container');
        const HEADER_ELEMENT = document.getElementById('header');
        const CONTENT_ELEMENT = document.getElementById('content');
        const PLACE_HOLDER_ELEMENT = document.getElementById('place-holder');
        const LOADER_ELEMENT = document.getElementById('loader');

        // Dummy card object
        const PLACE_HOLDER_OBJ = {
            author : {name:  "name", photoUrl: null},
            content : null,
            id : null,
            updated : null
        }

        // Constant limits
        const SAFE_ASYNC_TIMEOUT = 100;
        const SMOOTH_ASYNC_TIMEOUT = 300;
        const RETRY_API_FETCH_TIMEOUT = 15000;

        // Window measurments 
        let WINDOW_WIDTH = window.innerWidth;
        let WINDOW_HEIGHT = window.innerHeight;

        let DEBOUNCE_TIMER = null;

        // Swipe props
        let CURRENT_SWIPE_ELEMENT = null;
        let TOUCH_START_POSITION = {x:0,y:0,time : 0};
        let TOUCH_LAST_POSITION = {x:0,y:0,time : 0};
        let Y_AXIS_POSITION_RANGE = 50;
        let SWIPE_THRESHOLD_LIMIT = 150;
        let SWIPE_RANGE_MIN_DISTANCE = 30;
        let SWIPE_RANGE_MAX_DISTANCE = 100;

        // API 
        let API_END = "http://message-list.appspot.com";
        let API_PAGE_TOKEN = null;
        let API_PAGE_LIMIT = 100;
        let API_FETCH_IN_PROGRESS = false;
        let TOTAL_PAGE_COUNT = 0;

        // RenderEngine Properties
        let ACTIVE_VIEWPORT_PAGES = [];
        let LOCAL_MESSAGE_STORE = {};
        let TOTAL_MESSAGE_ITEMS = 0;
        let CONTENT_PADDINGS = [];
        let LAST_SECTION_HEIGHT = 0;
        let CURRENT_CONTENT_PADDING = 0;
        let STOP_PROCESSING = false;
        let LOADER_RENDERED = false;

        // Scroll Props
        let CURRENT_SCROLL_POSITION = 0;
        let PREVIOUS_SCROLL_POSITION = 0;
        let LAST_RENDER_UPDATE_POSITION = 0;
        let SCROLL_UPPER_LIMIT = 0;
        let SCROLL_LOWER_LIMIT = 0;

        const UTILS = {
             /**
             * @name _adjustWindowMeasurments
             * @description Event handler for reset window measurments in case of resize screen or rotate device.
             * @type callback
             * @returns NULL
             */
            _adjustWindowMeasurments : () => {
                WINDOW_WIDTH = window.innerWidth;
                WINDOW_WIDTH = window.innerHeight;
            },

            /**
             * @name _formatTime
             * @description time formatter which convers JS date in form of short string
             * @returns {String}
             */
            _formatTime : (date) => {
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
            },

            /**
             * @name _getIndexOfkey
             * @description Which receives array, (key, value) pair and returns the index
             * @argument {array} inputArr  - Input array
             * @argument {object} needleObj, key value pair to find
             * @returns {number} idx
             */
            _getIndexOfkey : (inputArr, needleObj) => {

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
            }
        }

        /**
         * @name swipeTimeTaken
         * @description Which calculates the time taken from start to end of a swipe (touch event)
         * @returns {Number}
         */
        const swipeTimeTaken = () => {
            return TOUCH_LAST_POSITION.time-TOUCH_START_POSITION.time;
        }

        /**
         * @name isYAxisInRange
         * @description Which calculates Y range for swiping off a card
         * - Checking the Y-axis swipe of a user is in Y_AXIS_POSITION_RANGE
         * @param {Number} y
         * @returns {Boolean}
         */
        const isYAxisInRange = (y) => {
            let range = Math.abs(y-TOUCH_START_POSITION.y);
            return range < Y_AXIS_POSITION_RANGE;
        }

        /**
         * @name isXAxisInRange
         * @description Which calculates X range for swiping off a card
         * 1.Long range swipe  - Checking the X-axis swipe time more than SWIPE_THRESHOLD_LIMIT , towards end of X-axis, Max distance travel
         * 2. Qucik swipe  - Checking the X-axis swipe time less than SWIPE_THRESHOLD_LIMIT, distance is in SWIPE_RANGE_MIN_DISTANCE
         * @param {Number} y
         * @returns {Boolean}
         */
        const isXAxisInRange = (x) => {
            let minSpaceCorner = WINDOW_WIDTH-65;
            let distance = x-TOUCH_START_POSITION.x;
            let time = swipeTimeTaken();
            return (time > SWIPE_THRESHOLD_LIMIT && x > minSpaceCorner && distance > SWIPE_RANGE_MAX_DISTANCE) 
                    || (time < SWIPE_THRESHOLD_LIMIT && distance > SWIPE_RANGE_MIN_DISTANCE);
        }

        /**
         * @name spliceItem
         * @description Which splices the swiped item from the LOCAL_MESSAGE_STORE
         * @argument {Object} parent  - Section Info
         * @argument {Object} item - Item info
         * @returns NULL
         */
        const spliceItem = (parentId, itemId) => {
            if (LOCAL_MESSAGE_STORE[parentId]) {
                let pageItems = LOCAL_MESSAGE_STORE[parentId];
                let itemIdx = UTILS._getIndexOfkey(pageItems, {"id" : itemId});
                if (itemIdx > -1) {
                    pageItems.splice(itemIdx, 1);
                }
                LOCAL_MESSAGE_STORE[parentId] = pageItems;
            }
        }

        /**
         * @name removeSwipedOffNode
         * @description Which removes the DOM node after swiping off
         * @param {HTMLElement} element
         * @returns NULL
         */
        const removeSwipedOffNode = (e, element) => {
            let elem = e.target;
            let parent = e.target.parentNode;
            elem.remove();
            spliceItem(parent.id, elem.id);
            let elementHeight = elem.offsetHeight;
            SCROLL_UPPER_LIMIT -= elementHeight;
            SCROLL_LOWER_LIMIT -= elementHeight;
            CURRENT_SWIPE_ELEMENT = null;
        }

         /**
         * @name getElement
         * @description Which returns the card element checking the swipe off target
         * @param {HTMLElement} element
         * @returns NULL
         */
        const getElement = (e) => {
            if (e.target.classList[0] == "message-card") {
                return e.target;
            }
            else {
                let elem = e.target;
                while(elem) {
                    if (elem.classList[0] == "message-card") {
                        return elem;
                    }
                    elem = elem.parentNode;
                }
            }
            return null;
        }

        /**
         * @name touchStart
         * @description Event handler for when user initiates swiping (touchstart)
         * @argument {object} event
         * @type callback
         * @returns NULL
         */
        const touchStart = (event, elem) => {
            CURRENT_SWIPE_ELEMENT = elem;
            TOUCH_START_POSITION = {
                x:event.touches[0].pageX,
                y:event.touches[0].pageY,
                time: new Date().getTime()
            }
        }

        /**
         * @name touchMove
         * @description Event handler for when user is swiping (touchmove)
         * @argument {object} event
         * @type callback
         * @returns NULL
         */
        const touchMove = (event) => {
            let x = event.touches[0].pageX;
            let y = event.touches[0].pageY;

            TOUCH_LAST_POSITION = {
                x,
                x,
                time: new Date().getTime()
            }

            // Checking the X,Y range to discard the item
            if (isXAxisInRange(x) && isYAxisInRange(y)) {
                if (CURRENT_SWIPE_ELEMENT && CURRENT_SWIPE_ELEMENT.parentNode) {
                    CURRENT_SWIPE_ELEMENT.classList.add('slide-off');
                    CURRENT_SWIPE_ELEMENT.style.opacity = '0.2';
                }
            }
        }

        /**
         * @name touchEnd
         * @description Event handler for when user stops swiping (touchend) - It resets the start, end positions
         * @returns NULL
         */
        const touchEnd = () => {
            TOUCH_START_POSITION = {y:0,y:0,time:0};
            TOUCH_LAST_POSITION = {x:0,y:0,time:0};
        }

        /**
         * @name appendNewPage
         * @description adding page to bottom
         */
        const appendNewPage = () => {
            let lastActivePageIdx = ACTIVE_VIEWPORT_PAGES[ACTIVE_VIEWPORT_PAGES.length-1];
            let lastActivePageElem = document.getElementById("p"+lastActivePageIdx);
            let pageId = "p"+(lastActivePageIdx+1);

            // Appending page to bottom
            let documentFragment = prepareListItem(LOCAL_MESSAGE_STORE[pageId], pageId)
            CONTENT_ELEMENT.appendChild(documentFragment);
            ACTIVE_VIEWPORT_PAGES.push(lastActivePageIdx+1);
        }


        /**
         * @name prependNewPage
         * @description adding page to top
         */
        const prependNewPage = () => {
            let firstActivePageIdx = ACTIVE_VIEWPORT_PAGES[0];
            let firstActivePageElem = document.getElementById("p"+firstActivePageIdx);
            let pageId = "p"+(firstActivePageIdx-1);
            
            // Appending page to top
            if (firstActivePageElem) {
                let documentFragment = prepareListItem(LOCAL_MESSAGE_STORE[pageId], pageId);
                firstActivePageElem.parentNode.insertBefore(documentFragment, firstActivePageElem);
                ACTIVE_VIEWPORT_PAGES.unshift(firstActivePageIdx-1);
            }
        }


        /**
         * @name removeFirstPage
         * @description Shifting the top most page and adding padding to the CONTENT_ELEMENT 
         * @param {*} page 
         * @param {*} padding 
         */
        const removeFirstPage = (page, padding) => {
            page.parentNode.removeChild(page);
            CURRENT_CONTENT_PADDING = padding;
            CONTENT_ELEMENT.style.paddingTop = padding+"px";
            ACTIVE_VIEWPORT_PAGES.shift();
        }

        /**
         * @name removeLastPage
         * @description Popping out the bottom most page and reducing padding to the CONTENT_ELEMENT
         * @param {*} page 
         * @param {*} padding 
         */
        const removeLastPage = (page, padding) => {
            page.parentNode.removeChild(page);
            CURRENT_CONTENT_PADDING = padding;
            CONTENT_ELEMENT.style.paddingTop = padding+"px";    
            ACTIVE_VIEWPORT_PAGES.pop();
        }

        /**
         * @name processRenderEngine
         * @description Handles the process of rendering the top page, bottom page 
         * - According to the input and calc it removes the top item or bottom item and modifies the content padding accordingly
         * @argument {String} direction 
         */
        const processRenderEngine = (direction = LOAD_BOTTOM) => {
            let sectionElements = document.getElementsByTagName('section');
            let sectionItem = sectionElements[0],
            newPaddingTop = LAST_SECTION_HEIGHT = sectionItem.offsetHeight;

            if (direction == LOAD_BOTTOM && TOTAL_PAGE_COUNT > 2) {
                if (ACTIVE_VIEWPORT_PAGES[2] < TOTAL_PAGE_COUNT) {
                    appendNewPage();
                }

                if(CURRENT_CONTENT_PADDING > 0) {
                    newPaddingTop = Number(CURRENT_CONTENT_PADDING)+Number(LAST_SECTION_HEIGHT);
                }

                CONTENT_PADDINGS.push(LAST_SECTION_HEIGHT);

                if (ACTIVE_VIEWPORT_PAGES.length > 2) {
                    // Removing page from top
                    removeFirstPage(sectionItem, newPaddingTop);
                }
            }
            else {
                if (ACTIVE_VIEWPORT_PAGES[0] == 1) {
                    return;
                }

                prependNewPage();

                newPaddingTop = CURRENT_CONTENT_PADDING - ((CONTENT_PADDINGS.length > 0) 
                                                            ? CONTENT_PADDINGS.pop() 
                                                            : LAST_SECTION_HEIGHT);
                if (newPaddingTop < 0) {
                    if (!document.getElementById('p1')) {
                        newPaddingTop = 0;
                    }
                }

                // Removing pages from bottom
                if (ACTIVE_VIEWPORT_PAGES.length > 2) {
                removeLastPage(sectionElements[sectionElements.length-1], newPaddingTop);
                }
            }
        }


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
            profilePic.className = "author-pic";
            if (url) {
                profilePic.style.opacity = 0;
                loadImageAsync(profilePic, API_END+url);
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
            authorElement.className = "name-section";

            let username = document.createElement('span');
            username.className = "username";
            username.innerHTML = author.name;

            let timeStamp = document.createElement('span');
            timeStamp.className = "timestamp";
            timeStamp.innerHTML = (time) ? UTILS._formatTime(new Date(time)) : "";

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
        const prepareAuthorInfoElement = (data) => {
            let item = document.createElement('div');
            item.className = "author-section";
            let profilePic = prepareAuthorPicElement(data.author.photoUrl);
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
            storyElement.className = "story";
            storyElement.innerHTML = item.content;
            return storyElement;
        }

        /**
         * @name prepareListItem
         * @description prepare the list items (DOM)
         * @argument {Array} list 
         * @argument {String} pageId
         * @returns {HTMLFrameElement} documentFragment
         */
        const prepareListItem = (list, pageId) => {
            let documentFragment = document.createDocumentFragment();
            let listPage = document.createElement('section');
            listPage.id = pageId
            let pageItems = [];

            for (let item of list) {
                let listElem = document.createElement('div');
                let authorElem = prepareAuthorInfoElement(item);
                let storyElement = prepareStoryElement(item, pageId);

                listElem.className = "message-card";
                listElem.id = item.id;
                listElem.appendChild(authorElem);
                listElem.appendChild(storyElement);

                // Appending list element to list page
                listPage.appendChild(listElem);
            }

            documentFragment.appendChild(listPage);
            return documentFragment;
        }

        /**
         * @name prepareAndRenderListItem
         * @description prepare and render on demand
         * @argument {page} number 
         * @argument {Array} list
         */
        const prepareAndRenderListItem = (list, page) => {
            let pageId = "p"+page;
            let documentFragment = prepareListItem(list, pageId);
            CONTENT_ELEMENT.appendChild(documentFragment);
            ACTIVE_VIEWPORT_PAGES.push(TOTAL_PAGE_COUNT);
        }

        /**
         * @name renderPlaceHolder
         * @description rendering the placeholder cards for better UX
         * @argument {Number} limit 
         */
        const renderPlaceHolder = (limit) => {
            let documentFragment = document.createDocumentFragment();
            let idx = 0;
            while (idx < limit) {
                let item = PLACE_HOLDER_OBJ;
                let listElem = document.createElement('div');
                let authorElem = prepareAuthorInfoElement(item);
                let storyElement = prepareStoryElement(item, "p");

                listElem.className = "message-card";
                listElem.id = "fake-"+idx;
                listElem.appendChild(authorElem);
                listElem.appendChild(storyElement);
                documentFragment.appendChild(listElem);
                idx++;
            }
            PLACE_HOLDER_ELEMENT.appendChild(documentFragment);
        }

        /**
         * @name renderLoader
         * @description rendering the loader card for better UX
         */
        const renderLoader = () => {
            let documentFragment = document.createDocumentFragment();
            let idx = 0;
            while (idx < 1) {
                let item = PLACE_HOLDER_OBJ;
                let listElem = document.createElement('div');
                let authorElem = prepareAuthorInfoElement(item);
                let storyElement = prepareStoryElement(item, "p");

                listElem.className = "message-card";
                listElem.id = "loader-"+idx;
                listElem.appendChild(authorElem);
                listElem.appendChild(storyElement);
                documentFragment.appendChild(listElem);
                idx++;
            }
            LOADER_ELEMENT.appendChild(documentFragment);
            LOADER_RENDERED = true;
        }

        /**
         * @name preCacheList
         * @description saving messages in local store - LOCAL_MESSAGE_STORE order by pages
         * @argument {Number} page
         * @argument {Array} list 
         */
        const preCacheList = (page, list) => {
            LOCAL_MESSAGE_STORE["p"+page] = list;  
        }

        /**
         * @name loadMorePages
         * @description Checking the need to load more pages as per user interaction with page and cache data
         * @returns {Boolean}
         */
        const loadMorePages = () => {
            if (ACTIVE_VIEWPORT_PAGES.length > 2) {
                if (TOTAL_PAGE_COUNT > ACTIVE_VIEWPORT_PAGES[2]+3) {
                    return false;
                }
            }
            return true;
        }

        /**
         * @name isDirectRender
         * @description Checking the need for direct render ater fetching data from API, depends on the user scroll interaction.
         * @returns {Boolean}
         */
        const isDirectRender = () => {
            if(TOTAL_PAGE_COUNT > 3 && ACTIVE_VIEWPORT_PAGES.length >= 3) {
                if (TOTAL_PAGE_COUNT > ACTIVE_VIEWPORT_PAGES[2]) {
                    return false;
                }
            }
            return true;
        }


        /**
         * @name fetchData
         * @description API fetching using the JS Fetch
         * @returns {Boolean}
         */
        const fetchData = () => {
            if (API_FETCH_IN_PROGRESS) {
                return;
            }
            API_FETCH_IN_PROGRESS = true;
            url = API_END+'/messages?limit='+API_PAGE_LIMIT;
            if (API_PAGE_TOKEN) {
                url += '&pageToken='+API_PAGE_TOKEN
            }
            API_PAGE_TOKEN = null;
            fetch(url)
            .then(res => res.json())
            .then(res => {
                if (!res.messages) {
                    STOP_PROCESSING = true;
                    return
                }
                API_FETCH_IN_PROGRESS = false;
                TOTAL_PAGE_COUNT++;
                API_PAGE_TOKEN = res.pageToken; 
                TOTAL_MESSAGE_ITEMS += res.messages.length;
                preCacheList(TOTAL_PAGE_COUNT, res.messages);
                if(isDirectRender()) {
                    prepareAndRenderListItem(res.messages, TOTAL_PAGE_COUNT);
                }
                if (!LOADER_RENDERED) {
                    renderLoader();
                }
            })
            .catch(err => {
                STOP_PROCESSING = true;
                API_FETCH_IN_PROGRESS = false;
                setTimeout(() => {
                    fetchData()
                }, RETRY_API_FETCH_TIMEOUT)
            })
        }


        /**
         * @name isPreFetchData
         * @description Checking the need for prefetching data in case of minimal page length
         * @returns {Boolean}
         */
        const isPreFetchData = () => {
            return TOTAL_PAGE_COUNT < 3 || TOTAL_MESSAGE_ITEMS < 100;
        }

        /**
         * @name rapidScrollForceTop
         * @description Handler which takes the user scroll to top of the page, Depends on the seed to the scroll, 
         * - This is one of the error tolerance method
         */
        let rapidScrollForceTop = () => {
            if (TOTAL_PAGE_COUNT > 4 
                && ACTIVE_VIEWPORT_PAGES.length > 1 
                && ACTIVE_VIEWPORT_PAGES[0] == 1 
                && ACTIVE_VIEWPORT_PAGES[1] == 2
                && CURRENT_SCROLL_POSITION > LAST_SECTION_HEIGHT*7
            ) {
                setTimeout(() => {
                    CURRENT_CONTENT_PADDING = 0;
                    CONTENT_ELEMENT.style.paddingTop = CURRENT_CONTENT_PADDING+"px";
                    ROOT_ELEMENT.scrollTop = 0;
                    SCROLL_UPPER_LIMIT = LAST_SECTION_HEIGHT;
                    SCROLL_LOWER_LIMIT = 0;
                }, SAFE_ASYNC_TIMEOUT);
            }
        }
        
        /**
         * @name handleRapidScrolling
         * @description Once the scroll speed crosses the normal momentum, It automatically manages and moves the
         * CONTENT_ELEMENT padding with the CURRENT_SCROLL_POSITION
         * @param {Boolean} TOP 
         */
        let handleRapidScrolling = (TOP = false) => {
            if (TOTAL_PAGE_COUNT > 3) {
                let rapidLimit = (TOP) ? LAST_SECTION_HEIGHT*5 : LAST_SECTION_HEIGHT*1.5;
                if (CURRENT_SCROLL_POSITION > LAST_SECTION_HEIGHT*5 
                    && (CURRENT_SCROLL_POSITION-CURRENT_CONTENT_PADDING) > rapidLimit) {
                    setTimeout(() => {
                        CURRENT_CONTENT_PADDING = (CURRENT_SCROLL_POSITION-LAST_SECTION_HEIGHT)
                        CONTENT_ELEMENT.style.paddingTop = CURRENT_CONTENT_PADDING+"px";
                    }, SAFE_ASYNC_TIMEOUT); 
                    
                }
            }  
            if (TOP) {
                rapidScrollForceTop();  
            }
        }


        /**
         * @name rootScrollHandler
         * @description Scroll event handler 
         * It triggers whenever the user scrolls, It maintains 2 keys SCROLL_UPPER_LIMIT, SCROLL_LOWER_LIMIT
         * Depends on these it decides wether to process upper section, bottom section and also triggers fetching more data
         * @param {Boolean} TOP 
         */
        let rootScrollHandler = (e) => {
            CURRENT_SCROLL_POSITION = e.target.scrollTop;
            
            let scrollBehaviour = SCROLLING_TOP;

            if (CURRENT_SCROLL_POSITION > PREVIOUS_SCROLL_POSITION) {
                scrollBehaviour = SCROLLING_DOWN;
            }

            PREVIOUS_SCROLL_POSITION = CURRENT_SCROLL_POSITION;

            if (!LAST_RENDER_UPDATE_POSITION) {
                LAST_RENDER_UPDATE_POSITION = CURRENT_SCROLL_POSITION;
            }
            else {

                if (TOTAL_PAGE_COUNT < 3) {
                    SCROLL_UPPER_LIMIT = LAST_RENDER_UPDATE_POSITION+(LAST_SECTION_HEIGHT/3);
                }
                else if (TOTAL_PAGE_COUNT == 3) {
                    SCROLL_UPPER_LIMIT = LAST_RENDER_UPDATE_POSITION+LAST_SECTION_HEIGHT;
                }

                if (scrollBehaviour == SCROLLING_DOWN && isPreFetchData()) {
                    fetchData(); 
                }

                // If scroll position is greator than UPPER LIMIT and more than one section of messages (LAST_SECTION_HEIGHT)
                if (scrollBehaviour == SCROLLING_DOWN && CURRENT_SCROLL_POSITION > SCROLL_UPPER_LIMIT && CURRENT_SCROLL_POSITION > LAST_SECTION_HEIGHT) {
                    LAST_RENDER_UPDATE_POSITION = CURRENT_SCROLL_POSITION;
                    
                    if (TOTAL_PAGE_COUNT > 2) { 
                        SCROLL_UPPER_LIMIT = SCROLL_UPPER_LIMIT+LAST_SECTION_HEIGHT;
                        SCROLL_LOWER_LIMIT = LAST_RENDER_UPDATE_POSITION;
                    }

                    if (loadMorePages()) {
                        fetchData();   // Fetches more pages
                    }
                
                    if(STOP_PROCESSING) {   // Once the data from API ends
                        return;
                    }

                    processRenderEngine();   // Processing DOM
                }
                else if (scrollBehaviour == SCROLLING_TOP && CURRENT_SCROLL_POSITION < SCROLL_LOWER_LIMIT){

                    LAST_RENDER_UPDATE_POSITION = CURRENT_SCROLL_POSITION;
                    SCROLL_LOWER_LIMIT = SCROLL_LOWER_LIMIT-LAST_SECTION_HEIGHT;
                    SCROLL_UPPER_LIMIT = LAST_RENDER_UPDATE_POSITION;

                    processRenderEngine(LOAD_TOP);   // Processing DOM
                }

                if (scrollBehaviour == SCROLLING_TOP) {
                    handleRapidScrolling(LOAD_TOP);  // Rapid scroll handler 
                }
                else {
                    if(STOP_PROCESSING) {   // Once the data from API ends
                        return;
                    }
                    handleRapidScrolling();
                }
            }
        };

        /**
         * @name addEventListeners
         * @description Adding event scroll, resize event listeners for window, root object respectively
         * @returns NULL
         */
        const addEventListeners = () => {
            ROOT_ELEMENT.addEventListener('scroll', rootScrollHandler);
            CONTENT_ELEMENT.addEventListener('touchstart', function(e) {
                let elem = getElement(e);
                if (elem) {
                    touchStart(e, elem);
                }
            })
            CONTENT_ELEMENT.addEventListener('touchmove', touchMove);
            CONTENT_ELEMENT.addEventListener('touchend', touchEnd);
            CONTENT_ELEMENT.addEventListener('animationend', function(e) {
                let elem = getElement(e);
                if (elem) {
                    removeSwipedOffNode(e, elem);
                }
            })
            window.addEventListener('resize', UTILS._adjustWindowMeasurments);
        }

        /**
         * @name addEventListeners
         * @description user can extend the config - For now only API, LIMIT can be extended
         * @returns NULL
         */
        const extendConfig = (obj) => {
            if (obj.api) {
                API_END = obj.api
            }
            if (obj.limit) {
                API_PAGE_LIMIT = (obj.limit >= 10) ? obj.limit : 10
            }
        }

        /**
         * @name _init
         * @description triggering the virtual list plugin
         */
        const _init = (configObj = {}) => {
            extendConfig(configObj);
            renderPlaceHolder(3);
            addEventListeners();
            fetchData();
        }

        // Setting init function to the protype of virtualList object (These methods are available  to user)
        return {
            init : _init
        }

    })(window, document);
 } catch (e) {
     console.error("Error loading plugin", e);
 }
 
virtualList.init();