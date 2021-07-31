function createVideoItem(data) {
    let videoItem = `
    <div class="yandex-zen-row__item yandex-zen-item _size-big">
        <div class="yandex-zen-item__title yandex-zen-title">
            <a class="yandex-zen-title__channel-info yandex-channel-info yandex-link" href="#" target="_blank">
                <div class="yandex-channel-info__logo"></div>
                <div class="yandex-channel-info__content yandex-channel-content">
                    <span class="yandex-channel-content__title">${data.title}</span>
                    <span class="yandex-channel-content__subtitle">${data.fans}</span>
                </div>
            </a>
        </div>
        <div class="yandex-zen-item__content yandex-zen-content">
            <iframe class="yandex-zen-content__video" width="534" height="301" src="https://www.youtube.com/embed/8_OcvEYDtTE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <div class="yandex-zen-content__title yandex-zen-content-title">
                <span class="yandex-zen-content-title__title">${data.description}</span>
                <span class="yandex-zen-content-title__date">${data.date}</span>
            </div>
        </div>
    </div>`;
    return videoItem;
}

function appendItems(results) {
    results.forEach(result => {
        let newRow = document.createElement('div');
        newRow.innerHTML += createVideoItem(result);
        zen.append(newRow);
    });
}

const SCROLL_DIFFERENCE = 100; // Разница прокрутки
const SCROLL_BY_Y = -30; // На сколько возвращаемся перед появлением нового элемента в дзене

// Получение высоты всего документа
function getDocumentHeight() {
    return Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
}

//  Получение высоты прокрученной снизу части
function getDifference() {
    return getDocumentHeight() - window.pageYOffset - document.documentElement.clientHeight;
}

// Debounce
function debounce(f, t) {
    return function (args) {
        let previousCall = this.lastCall;
        this.lastCall = Date.now();
        if (previousCall && ((this.lastCall - previousCall) <= t)) {
            clearTimeout(this.lastCallTimer);
        }
        this.lastCallTimer = setTimeout(() => f(args), t);
    }
}

async function callFunction(event) {    
    if (getDifference() > SCROLL_DIFFERENCE) return;
    
    let controller = new AbortController();
    try {
        let responce = await fetch('./yandex-zen-data.json', {signal: controller.signal});
        let result = await responce.json();

        window.scrollBy(0, SCROLL_BY_Y);
        appendItems(result);
    
    } catch(err) {
        if (err.name === 'AbortError') {
            console.log(err);
        } else {
            throw err;
        }
    }
};

const debouncedFunction = debounce(callFunction, 500);
const zen = document.querySelector('.yandex-zen');

window.addEventListener('scroll', debouncedFunction);

debouncedFunction();