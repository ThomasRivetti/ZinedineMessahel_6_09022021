'use strict';
/////////////////////////////////////////

import MediaFactory from './MediaFactory.js';
import Lightbox from '../photographers-page/LightBox.js';

export default class GalleryFactory {
    builder(media, currentMedia, currentMediaName, currentLightboxIndex, totalLike) {
        const id = window.location.search.split('id=')[1];
        let mediaFactory = new MediaFactory();

        media.forEach(element => {
            if (id == element.photographerId) {
                let sectionPhWorks = document.getElementById('ph-works');
                let articlePhWork = document.createElement("article");
                let mediaHTML = mediaFactory.renderMedia(element);
                let workTemplate = `
                ${mediaHTML.outerHTML}
                <div class="ph-work-elt-text">
                    <h2 class="ph-work-title">${element.photoName}</h2>
                    <span class="ph-work-price">${element.price} €</span>
                    <div class='ph-elt-like'>
                    <span class="ph-work-like">
                        <a class="like-counter">${element.likes}</a>
                    </span>
                    <i class="fas fa-heart heart-btn" aria-label='likes' role="button" data-value="${element.likes}"></i>
                    </div>
                </div>
                `
                articlePhWork.innerHTML = workTemplate;
                sectionPhWorks.appendChild(articlePhWork);
                articlePhWork.classList.add("ph-work-elt");
                totalLike += parseInt(element.likes);
                currentMedia.push(mediaHTML.outerHTML);
                currentMediaName.push(element.photoName);
                (new Lightbox()).launchLightBox(currentMedia, currentMediaName, currentLightboxIndex);
                (new Lightbox()).switchPhWorks(currentMedia, currentMediaName, currentLightboxIndex);
                (new Lightbox()).closeLightBox();
                (new Lightbox()).lightboxKeyboard(currentMedia, currentMediaName, currentLightboxIndex);
            }
        })
    }
}