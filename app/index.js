import InfiniteScroll from './infiniteScroll';

import './app.scss';

window.addEventListener('load', () => {
    ((window, document) => {
        window.IS = InfiniteScroll(window, document);
        IS.init();
    })(window, document);
   
})

