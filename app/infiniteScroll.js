import {
    LOAD_BOTTOM,
    LOAD_TOP,
    SCROLLING_DOWN,
    SCROLLING_TOP,

    CLASSNAME_CARD,

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
} from './constants';


import {
    getIndexOfkey
} from './utils';


import {
    prepareStoryElement,
    prepareAuthorInfoElement
} from './domUtils';


/**
 * @name InfiniteScroll
 * @param {*} window 
 * @param {*} document 
 */
const InfiniteScroll = (window, document) => {

    // Window measurments 
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    // Swipe props
    let currentSwipeElement = null;
    let touchStartPosition = INTERACTION_OBJ;
    let touchLastPosition = INTERACTION_OBJ;

    // API 
    let apiEnd = API_PATH;
    let apiPageToken = null;
    let apiPageLimit = API_LIMIT;
    let apiFetchInProgress = false;
    let totalPageCount = 0;

    // RenderEngine Properties
    let activeViewportPages = [];
    let localMessageStore = {};
    let totalMessageItems = 0;
    let contentTransforms = [];
    let lastPageHeight = 0;
    let currentContentPaddingTop = 0;
    let stopProcessing = false;
    let loaderRendered = false;
    let processRendering = false;

    // Scroll Props
    let isScrolling = false;
    let currentScrollPosition = 0;
    let previousScrollPosition = 0;
    let lastRenderUpdatePosition = 0;
    let scrollUpRenderLimit = 0;
    
    let animationFrameProcessing = false;

    /**
     * @name adjustWindowMeasurments
     * @description Event handler for reset window measurments in case of resize screen or rotate device.
     * @type callback
     * @returns NULL
     */
    const adjustWindowMeasurments = () => {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    };

    /**
     * @name swipeTimeTaken
     * @description Which calculates the time taken from start to end of a swipe (touch event)
     * @returns {Number}
     */
    const swipeTimeTaken = () => {
        return touchLastPosition.time-touchStartPosition.time;
    }

    /**
     * @name isYAxisInRange
     * @description Which calculates Y range for swiping off a card
     * - Checking the Y-axis swipe of a user is in Y_AXIS_POSITION_RANGE
     * @param {Number} y
     * @returns {Boolean}
     */
    const isYAxisInRange = (y) => {
        let range = Math.abs(y-touchStartPosition.y);
        return range < Y_AXIS_POSITION_RANGE;
    }

    /**
     * @name isXAxisInRange
     * @description Which calculates X range for swiping off a card
     * @param {Number} y
     * @returns {Boolean}
     */
    const isXAxisInRange = (xPos) => {
        let {x} = touchStartPosition; 
        let minSpaceCorner = windowWidth-65;
        let distance = (xPos > x) ? xPos-x : x-xPos;
        let time = swipeTimeTaken();
        return distance > X_AXIS_POSITION_RANGE;
    }

    /**
     * @name spliceItem
     * @description Which splices the swiped item from the localMessageStore
     * @argument {Object} parent  - Section Info
     * @argument {Object} item - Item info
     * @returns NULL
     */
    const spliceItem = (parentId, itemId) => {
        if (localMessageStore[parentId]) {
            let pageItems = localMessageStore[parentId];
            let itemIdx = getIndexOfkey(pageItems, {"id" : itemId});
            if (itemIdx > -1) {
                pageItems.splice(itemIdx, 1);
            }
            localMessageStore[parentId] = pageItems;
        }
    }

    /**
     * @name removeSwipedOffNode
     * @description Which removes the DOM node after swiping off
     * @param {HTMLElement} element
     * @returns NULL
     */
    const removeSwipedOffNode = (element) => {
        if (!element) {
            return;
        }
        let parent = element.parentNode;
        spliceItem(parent.id, element.id);
        let elementHeight = element.offsetHeight;
        scrollUpRenderLimit -= elementHeight;
        currentSwipeElement = null;
        element.remove();
    }

    /**
     * @name animationFrame
     * @description Which maintaind the sync to run the animation on calling RAF, Which leads to a smooth animation
     * @param NULL
     * @returns NULL
     */
    const animationFrame = () => {
        if (!animationFrameProcessing || !touchStartPosition.x || !touchLastPosition.x || !currentSwipeElement) {
            return;
        }

        let {x,y} = touchLastPosition;

        let XPos = x-touchStartPosition.x;
        let transform = 'translate3d('+(XPos)+'px, 0, 0)';
        
        // Checking the X,Y range to discard the item
        if (isXAxisInRange(x) && isYAxisInRange(y)) {
            currentSwipeElement.style.transform = transform;
            currentSwipeElement.style.webkitTransform = transform;
            currentSwipeElement.style.MozTransform = transform;
            currentSwipeElement.style.opacity = '0.4';
        }
        animationFrameProcessing = false;
    }

     
    /**
     * @name resetElementPosition
     * @description Rest the swiped element to the normal position
     * @param NULL
     * @returns NULL
     */
    const resetElementPosition = () => {
        let transform = 'translate(0,0)';
        currentSwipeElement.style.transform = transform;
        currentSwipeElement.style.webkitTransform = transform;
        currentSwipeElement.style.MozTransform = transform;   
        currentSwipeElement.style.opacity = '1';
    }


    /**
     * @name transitionEnd
     * @description Applying smooth swipe off feel once after the transiion end
     * @param NULL
     * @returns NULL
     */
    const transitionEnd = () => {
        if(!currentSwipeElement) {
            return;
        }
        currentSwipeElement.classList.add('remove');
        currentSwipeElement.innerHTML = "";
        setTimeout(() => {
            removeSwipedOffNode(currentSwipeElement);
        }, SMOOTH_ASYNC_TIMEOUT)
    }

    /**
     * @name touchStart
     * @description Event handler for when user initiates swiping (touchstart)
     * @argument {object} event
     * @type callback
     * @returns NULL
     */
    const touchStart = (event, elem) => {
        currentSwipeElement = elem;
        if (event.touches && event.touches.length > 1) {
            return;
        }
        touchStartPosition = GET_INTERACTION_POINT(event);
    }

    /**
     * @name touchMove
     * @description Event handler for when user is swiping (touchmove)
     * @argument {object} event
     * @type callback
     * @returns NULL
     */
    const touchMove = (event) => {
        
        if (!touchStartPosition.x) {
            return;
        }
        
        touchLastPosition = GET_INTERACTION_POINT(event);

        if (animationFrameProcessing) {
            return;
        }

        animationFrameProcessing = true;
        window.requestAnimationFrame(animationFrame);
    }

    /**
     * @name touchEnd
     * @description Event handler for when user stops swiping (touchend) - It resets the start, end positions
     * @returns NULL
     */
    const touchEnd = (event) => {
        
        let {x,y} = touchLastPosition;

        // Checking the X,Y range to discard the item
        if (isXAxisInRange(x) && isYAxisInRange(y)) {
            if (currentSwipeElement && currentSwipeElement.parentNode) {
                let xPos = windowWidth+100;
                if (x < touchStartPosition.x) {
                    xPos = ~xPos;
                }
                currentSwipeElement.style.opacity = '0.2';
                currentSwipeElement.style.transform = `translate3d(${xPos}px, 0, 0)`;
                currentSwipeElement.style.height = currentSwipeElement.offsetHeight+"px";
                currentSwipeElement.addEventListener('transitionend', transitionEnd);
            }
        }
        else {
            resetElementPosition();
        }

        touchStartPosition = INTERACTION_OBJ;
        touchLastPosition = INTERACTION_OBJ;
        animationFrameProcessing = false;
    }

    /**
     * @name appendNewPage
     * @description adding page to bottom
     */
    const appendNewPage = () => {
        let lastActivePageIdx = activeViewportPages[activeViewportPages.length-1];
        let lastActivePageElem = document.getElementById("page"+lastActivePageIdx);
        let pageId = "page"+(lastActivePageIdx+1);

        // Appending page to bottom
        let documentFragment = prepareListItem(localMessageStore[pageId], pageId)
        CONTENT_ELEMENT.appendChild(documentFragment);
        activeViewportPages.push(lastActivePageIdx+1);
    }


    /**
     * @name prependNewPage
     * @description adding page to top
     */
    const prependNewPage = () => {
        let firstActivePageIdx = activeViewportPages[0];
        let firstActivePageElem = document.getElementById("page"+firstActivePageIdx);
        let pageId = "page"+(firstActivePageIdx-1);
    
        // Appending page to top
        if (firstActivePageElem) {
            let documentFragment = prepareListItem(localMessageStore[pageId], pageId);
            firstActivePageElem.parentNode.insertBefore(documentFragment, firstActivePageElem);
            activeViewportPages.unshift(firstActivePageIdx-1);
        }
    }


    /**
     * @name applyPadding
     * @description Applying transformation on every animation frame
     * @param {number} Ypos
     */
    const applyPadding = (YPos) => {
        if (YPos < 200) {
            YPos = 0;
        }
        window.requestAnimationFrame(() => {
            CONTENT_ELEMENT.style.paddingTop = YPos+"px";
        })
    }

    /**
     * @name removeFirstPage
     * @description Shifting the top most page and adding translateY to the CONTENT_ELEMENT 
     * @param {*} page 
     * @param {*} translateY 
     */
    const removeFirstPage = (page, translateY) => {
        console.log("Removing Page", page, translateY);
        page.parentNode.removeChild(page);
        currentContentPaddingTop = translateY;
        applyPadding(translateY);
        activeViewportPages.shift();
        setTimeout(() => {
            processRendering = false;
        }, 100);
    }

    /**
     * @name removeLastPage
     * @description Popping out the bottom most page and reducing translateY to the CONTENT_ELEMENT
     * @param {*} page 
     * @param {*} translateY 
     */
    const removeLastPage = (page, translateY) => {
        page.parentNode.removeChild(page);
        currentContentPaddingTop = translateY;
        applyPadding(translateY);
        activeViewportPages.pop();
        setTimeout(() => {
            processRendering = false;
        }, 100);
    }

    /**
     * @name processRenderEngine
     * @description Handles the process of rendering the top page, bottom page 
     * - According to the input and calc it removes the top item or bottom item and modifies the content translateY accordingly
     * @argument {String} direction 
     */
    const processRenderEngine = (direction = LOAD_BOTTOM) => {
        if (processRendering) {
            return;
        }
    
        let sectionElements = document.getElementsByClassName('page');
        let sectionItem = sectionElements[0],
        newPaddingTop = lastPageHeight = sectionItem.offsetHeight;

        if (direction == LOAD_BOTTOM && totalPageCount > 2) {
            processRendering = true;
            if (activeViewportPages[2] < totalPageCount) {
                appendNewPage();
            }

            if(currentContentPaddingTop > 0) {
                newPaddingTop = Number(currentContentPaddingTop)+Number(lastPageHeight);
            }

            if (activeViewportPages.length > 2) {
                // Removing page from top
                removeFirstPage(sectionItem, newPaddingTop);
            }
        }
        else {
           
            if (activeViewportPages[0] == 1) {
                return;
            }
            processRendering = true;

            prependNewPage();

            newPaddingTop = currentContentPaddingTop - ((contentTransforms.length > 0) 
                                                        ? contentTransforms.pop() 
                                                        : lastPageHeight);
            // Removing pages from bottom
            if (activeViewportPages.length > 2) {
                removeLastPage(sectionElements[sectionElements.length-1], newPaddingTop);
            }
        }
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
        let listPage = document.createElement('div');
        listPage.id = pageId
        listPage.className = "page";
        let pageItems = [];

        for (let item of list) {
            let listElem = document.createElement('div');
            let authorElem = prepareAuthorInfoElement(item, apiEnd);
            let storyElement = prepareStoryElement(item, pageId);

            listElem.className = CLASSNAME_CARD;
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
        let pageId = "page"+page;
        let documentFragment = prepareListItem(list, pageId);
        CONTENT_ELEMENT.appendChild(documentFragment);
        activeViewportPages.push(totalPageCount);
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
            let storyElement = prepareStoryElement(item, "page");

            listElem.className = CLASSNAME_CARD;
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
            let storyElement = prepareStoryElement(item, "page");

            listElem.className = CLASSNAME_CARD;
            listElem.id = "loader-"+idx;
            listElem.appendChild(authorElem);
            listElem.appendChild(storyElement);
            documentFragment.appendChild(listElem);
            idx++;
        }
        LOADER_ELEMENT.appendChild(documentFragment);
        LOADER_ELEMENT.style.opacity = 1;
        loaderRendered = true;
        PLACE_HOLDER_ELEMENT.remove();
    }

    /**
     * @name preCacheList
     * @description saving messages in local store - localMessageStore order by pages
     * @argument {Number} page
     * @argument {Array} list 
     */
    const preCacheList = (page, list) => {
        localMessageStore["page"+page] = list;  
    }

    /**
     * @name loadMorePages
     * @description Checking the need to load more pages as per user interaction with page and cache data
     * @returns {Boolean}
     */
    const loadMorePages = () => {
        console.log(activeViewportPages, totalPageCount);
        if (totalPageCount > 2 && activeViewportPages.length > 2) {
            if (activeViewportPages[2] != totalPageCount) {
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
        if (apiFetchInProgress) {
            return;
        }
        apiFetchInProgress = true;
        let url = `${apiEnd}/messages?limit=${apiPageLimit}`;
        if (apiPageToken) {
            url += `&pageToken=${apiPageToken}`;
        }
        apiPageToken = null;
        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (!res.messages) {
                    stopProcessing = true;
                    return
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
            })
            .catch(err => {
                stopProcessing = true;
                apiFetchInProgress = false;
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
        return totalPageCount < 3 || totalMessageItems < 100;
    }

    /**
     * @name rootScrollHandler
     * @description Scroll event handler 
     * It triggers whenever the user scrolls, It maintains 2 keys  scrollUpRenderLimit
     * Depends on these it decides wether to process upper section, bottom section and also triggers fetching more data
     * @param {Boolean} TOP 
     */
    let rootScrollHandler = (e) => {
        e.preventDefault();
        currentScrollPosition = e.target.scrollTop;
        
        let scrollBehaviour = SCROLLING_TOP;

        if (currentScrollPosition > previousScrollPosition) {
            scrollBehaviour = SCROLLING_DOWN;
        }

        previousScrollPosition = currentScrollPosition;

        if (!lastRenderUpdatePosition) {
            lastRenderUpdatePosition = currentScrollPosition;
        }
        else {

            if (scrollBehaviour == SCROLLING_DOWN && currentScrollPosition > ROOT_ELEMENT.scrollHeight - ROOT_ELEMENT.clientHeight - 100) {
                lastRenderUpdatePosition = currentScrollPosition;
                scrollUpRenderLimit = lastRenderUpdatePosition-lastPageHeight;
               
                if (loadMorePages()) {
                    fetchData();   // Fetches more pages
                }
            
                if(stopProcessing) {   // Once the data from API ends
                    return;
                }

                processRenderEngine();   // Processing DOM
            }
            else if (scrollBehaviour == SCROLLING_TOP && currentScrollPosition < scrollUpRenderLimit){
                lastRenderUpdatePosition = currentScrollPosition;
                scrollUpRenderLimit = scrollUpRenderLimit-lastPageHeight;
                processRenderEngine(LOAD_TOP);   // Processing DOM
            }
        }

        
    };

    /**
     * @name handleScrollEnd
     * @description Handle rapid scroll cases once the scroll Ended
     * @returns NULL
     */
    const handleScrollEnd = (e) => {
        let scrollPosition = e.target.scrollTop;
        if (scrollPosition < currentContentPaddingTop || currentContentPaddingTop < 0) {
            currentContentPaddingTop = scrollPosition
            if (scrollPosition  > lastPageHeight) {
                currentContentPaddingTop = scrollPosition-lastPageHeight || 1;
            }
            applyPadding(currentContentPaddingTop);
            scrollUpRenderLimit = currentContentPaddingTop;                  
        }
    }

    /**
     * @name addEventListeners
     * @description Adding event scroll, resize event listeners for window, root object respectively
     * @returns NULL
     */
    const addEventListeners = () => {
        ROOT_ELEMENT.addEventListener('scroll', (e) => {
            rootScrollHandler(e);
            window.clearTimeout( isScrolling );
            isScrolling = setTimeout(() => {
                    handleScrollEnd(e);
            }, SAFE_ASYNC_TIMEOUT);
        }, false);
        
        CONTENT_ELEMENT.addEventListener('touchstart', function(e) {
            let element = GET_INTERACTED_ELEMENT(e);
            if (element) {
                touchStart(e, element);
            }
        })
        CONTENT_ELEMENT.addEventListener('touchmove', touchMove);
        CONTENT_ELEMENT.addEventListener('touchend', touchEnd);
        window.addEventListener('resize', adjustWindowMeasurments);
    }

    /**
     * @name addEventListeners
     * @description user can extend the config - For now only API, LIMIT can be extended
     * @returns NULL
     */
    const extendConfig = (obj) => {
        if (obj.api) {
            apiEnd = obj.api
        }
        if (obj.limit) {
            apiPageLimit = (obj.limit >= 10) ? obj.limit : 10
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

  
    return {
        init : _init
    }

}


export default InfiniteScroll;