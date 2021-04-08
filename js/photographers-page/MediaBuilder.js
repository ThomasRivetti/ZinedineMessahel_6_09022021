'use strict';
/////////////////////////////////////////

import ApiFishEye from '../data/ApiFishEye.js';
import GalleryFactory from '../Factory/GalleryFactory.js';

export default class MediaBuilder {

    async photographersMedias() {
        let data = await (new ApiFishEye()).getDataFishEye();
        let media = data.media;

        let gallery = new GalleryFactory().builder(media);
        this.boxLikesAndPrice(gallery.totalLike, data.photographers);
    }

    boxLikesAndPrice(totalLike, photographers) {
        const id = window.location.search.split('id=')[1];

        photographers.forEach(element => {
            if (id == element.id) {
                let box = document.getElementById('box');
                let boxTemplate = `
                <span id="total-likes">${totalLike}</span>
                <i class="fas fa-heart" aria-label='likes'></i>
                <span>${element.price} €/ jour</span>
                `
                box.innerHTML = boxTemplate;
            }
        })
    }
}
