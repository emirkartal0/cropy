import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import { mimeTypes } from '../shared/types';

@Injectable({
    providedIn: 'root'
})
export class Html2canvasService {

    constructor() { }

    downloadImage(element: HTMLElement, filename: string = 'image', mimeType: mimeTypes = mimeTypes.png ) {
        html2canvas(element).then(canvas => {
            const link = document.createElement('a');
            link.download = filename + mimeType;
            link.href = canvas.toDataURL();
            link.click();
        });
    }

}
