import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Html2canvasService } from './services/html2canvas.service';
@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
	title = 'cropyai-task';

	container: HTMLElement = null!;

	constructor(
		private html2canvasService: Html2canvasService,
	) { }

	ngOnInit(): void {
		this.container = document.getElementById('container')!;
	}

	downloadImage() {
		this.html2canvasService.downloadImage(this.container);
	}


}
