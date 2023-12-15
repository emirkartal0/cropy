import { Injectable } from '@angular/core';
import Pica from 'pica';
import { Html2canvasService } from './html2canvas.service';
import { mimeTypes } from '../shared/types';
@Injectable({
    providedIn: 'root'
})
export class PicaService {

    pica = Pica();

    constructor(
        private html2canvasService: Html2canvasService,
    ) { }

    resizeImage(
        img: HTMLImageElement, 
        canvas: HTMLCanvasElement, 
        mimeType: mimeTypes = mimeTypes.jpg, 
        reWidth: number, 
        reHeight: number, 
        quality: number = 0.9
    ) {
        const canvasEl = canvas;
        canvasEl.width = reWidth; 
        canvasEl.height = reHeight; 

        this.pica.resize(img, canvasEl)
            .then(result => this.pica.toBlob(result, mimeType, quality))
            .then(blob => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'resized-image.jpg';
                link.click();
            })
            .catch(error => console.error('error', error));
    }

}
