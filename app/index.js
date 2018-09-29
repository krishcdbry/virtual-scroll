import InfiniteScroll from './infiniteScroll';

window.addEventListener('load', () => {
    ((window, document) => {
        window.IS = InfiniteScroll(window, document);
        IS.init();
    })(window, document);
   
})

