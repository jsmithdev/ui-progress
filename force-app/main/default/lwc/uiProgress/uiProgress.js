import { api, LightningElement } from 'lwc';

import './progress';

import {
	getOptions,
} from './barOptions.js';

export default class UiProgress extends LightningElement {

	@api text;
	@api type = 'line';
	@api width = '200px';
	@api color = '#1d07e8';
	@api background = '#EEE';
	@api textColor = '#FFF';
	@api textSize = '1rem'
	@api customSvg = '';

	@api
	get progress() {
		return this._progress || 1;
	}
	set progress(value) {

		if (typeof value !== 'number') value = parseInt(value);

		this._progress = Math.floor(value);

		if (this.progressBar) {
			this.progressBar.animate(this._progress / 100);
		}
	}

	get options() {
		return getOptions({
			text: this.text.length > 0,
			type: this.type,
			color: this.color,
			background: this.background,
			text: {
				color: this.textColor,
				size: this.textSize,
			}
		})
	}

	renderedCallback() {

		const el = this.template.querySelector('.container')

		//el.style.width = this.width;

		if (this.type === 'circle') {
			this.progressBar = new ProgressBar.Circle(el, this.options);
			//this.progressBar.text.style.fontFamily = 'Roboto, Helvetica, sans-serif';
			this.progressBar.text.style.fontSize = '2rem';
		}
		else if (this.type === 'semi') {
			this.progressBar = new ProgressBar.SemiCircle(el, this.options);
		}
		else if (this.type === 'custom') {

			el.innerHTML = this.customSvg;

			this.progressBar = new ProgressBar.Path(this.template.querySelector('.progress'), {
				easing: 'easeInOut',
				duration: 1400
			});

			this.progressBar.set(0);
		}
		else if(this.type === 'pill'){
			this.progressBar = new ProgressBar.Line(el, this.options);
		}
		else {
			// line is default
			this.progressBar = new ProgressBar.Line(el, this.options);
		}

		this.progressBar.animate(this.progress / 100);
	}
}