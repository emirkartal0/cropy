import { Injectable } from '@angular/core';
import { mimeTypes } from '../shared/types';
import Pica from 'pica';

@Injectable({
    providedIn: 'root'
})
export class PicaService {

    pica = Pica();

    constructor() { }

    resizeImage(
        img: HTMLImageElement, 
        canvas: HTMLCanvasElement, 
        mimeType: mimeTypes = mimeTypes.jpg, 
        scaleRatio: number,
        quality: number = 1
    ) {
        canvas.width = img.width * scaleRatio; 
        canvas.height = img.height * scaleRatio; 

        this.pica.resize(img, canvas)
            .then(result => this.pica.toBlob(result, mimeType, quality))
            .catch(error => console.error('image resize error', error));
    }

}
