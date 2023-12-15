import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Html2canvasService } from './services/html2canvas.service';
import { PicaService } from './services/pica.service';
import { mimeTypes } from './shared/types';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
	@ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
	@ViewChild('container', { static: false }) container!: ElementRef<HTMLElement>;

	constructor(
		private html2canvasService: Html2canvasService,
		private picaService: PicaService,
	) { }

	ngOnInit(): void {
	}

	downloadImage(width?: number, height?: number, xOffSet?: number, yOffSet?: number) {
		this.html2canvasService.downloadImage(this.canvas.nativeElement, 'image', mimeTypes.png, width, height, xOffSet, yOffSet);
	}

	onFileSelected(event: Event) {
		const file = (event.target as HTMLInputElement).files![0] ?? null;
		if (!file) {
			return;
		}

		const reader = new FileReader();
		reader.onload = (e: ProgressEvent<FileReader>) => {
			const img = new Image();
			img.onload = () => this.resizeImage(img, 1000, 1000, 0.9);
			img.src = e.target?.result as string;
		};
		reader.readAsDataURL(file);
	}

	resizeImage(img: HTMLImageElement, reWidth: number, reHeight: number, quality: number) {
		this.picaService.resizeImage(img, this.canvas.nativeElement, mimeTypes.png, reWidth, reHeight, quality);
	}

}
