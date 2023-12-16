import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Html2canvasService } from './services/html2canvas.service';
import { PicaService } from './services/pica.service';
import { mimeTypes } from './shared/types';
import { recommendedResolution, recommendedRatio, aspectRatio } from './shared/types';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, FormsModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
	@ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
	@ViewChild('container', { static: false }) container!: ElementRef<HTMLInputElement>;

	recommendedResolution = recommendedResolution;
	recommendedRatio = recommendedRatio;
	mimeTypes = Object.entries(mimeTypes);

	inputWidth: number = 1280;
	inputHeight: number = 720;
	inputXOffSet: number = 0;
	inputYOffSet: number = 0;
	compressRatio: number = 0;
	scaleRatio: number = 1;
	aspectRatioHeight: number = recommendedRatio[0].height;
	exportType: string = mimeTypes.png;

	get quality(): number {
		return (100 - this.compressRatio) / 100;
	}

	constructor(
		private html2canvasService: Html2canvasService,
		private picaService: PicaService,
	) { }

	ngOnInit(): void {
	}

	setResolution(width: number, height: number) {
		this.inputWidth = width;
		this.inputHeight = height;
	}

	downloadImage() {
		if (this.aspectRatioHeight == 1) {
			this.html2canvasService.downloadImage(this.canvas.nativeElement, 'cropy-image', this.exportType, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
			return;
		}
		let aspectRatio: aspectRatio = recommendedRatio[0];
		let cropMultiplier: number = 1;
		recommendedRatio.map(ratio => {
			if(ratio.height == this.aspectRatioHeight) {
				aspectRatio = ratio;
			}
		});
		cropMultiplier = this.canvas.nativeElement.width / aspectRatio.width;
		this.inputXOffSet = (this.canvas.nativeElement.width - (aspectRatio.width * cropMultiplier)) / 2;
		this.html2canvasService.downloadImage(this.canvas.nativeElement, 'cropy-image', this.exportType, this.canvas.nativeElement.width - (this.inputXOffSet * 2), aspectRatio.height * cropMultiplier, this.inputXOffSet, this.inputYOffSet);
	}

	onFileSelected(event: Event) {
		const file = (event.target as HTMLInputElement).files![0] ?? null;
		if (!file) {
			return;
		}

		const reader = new FileReader();
		reader.onload = (e: ProgressEvent<FileReader>) => {
			const img = new Image();
			img.onload = () => this.resizeImage(img, this.quality);
			img.src = e.target?.result as string;
			this.container.nativeElement.src = img.src;
		};
		reader.readAsDataURL(file);
	}

	resizeImage(img: HTMLImageElement, quality: number) {
		console.log(quality, this.quality);
		this.scaleRatio = Math.min(this.inputWidth / img.width, this.inputHeight / img.height);
		this.picaService.resizeImage(img, this.canvas.nativeElement, mimeTypes.png, this.scaleRatio, quality);
	}

}
