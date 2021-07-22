function getDocumentHeight() {
    return Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
}

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

function createImageItem(data) {

}

function callFunction() {    
    if(getDocumentHeight() - window.pageYOffset - document.documentElement.clientWidth <= 100) {
        let controller = new AbortController();

        fetch('./data.json', {signal: controller.signal})
            .then(resp => resp.json())
            .then(function(data) {
                let newRow = document.createElement('div');
                newRow.innerHTML += createVideoItem(data);
                zen.append(newRow);
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}

let zen = document.querySelector('.yandex-zen');
callFunction();

window.addEventListener('scroll', callFunction);