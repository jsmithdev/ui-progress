import { api, LightningElement } from 'lwc';

import {Progress} from './progress';


export default class UiProgress extends LightningElement {

	isCustom = false;

	@api text;
	@api type = 'line';
	@api width = '200px';
	@api color = '#1d07e8';
	@api background = '#EEE';
	@api customSvg = '';

	@api
	get progress() {
		return this._progress || 1;
	}
	set progress(value) {

		if (typeof value !== 'number') value = parseInt(value);

		this._progress = Math.floor(value);

		if (this.progressBar) {
			this.progressBar.animate(value / 100);
		}
	}

	get options() {
		return this.getOptions(this.type);
	}

	connectedCallback() {
		if (this.type === 'custom') this.isCustom = true;
	}

	renderedCallback() {

		const el = this.template.querySelector('.container')

		el.style.width = this.width;

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
		else {
			this.progressBar = new ProgressBar.Line(el, this.options);
		}

		this.progressBar.animate(this.progress / 100);
	}

	getOptions(opt) {

		if (opt === 'circle') {
			return this.circleOptions()
		}

		if (this.type === 'semi') {
			return this.semiOptions();
		}
		
		const opts = {}

		if (this.text) {
			opts.text = this.textOptions();
		}

		return { ...this.lineOptions(), ...opts }
	}

	textOptions() {
		return {
			style: {
				// Text color.
				// Default: same as stroke color (options.color)
				//color: '#999',
				position: 'absolute',
				right: '0',
				top: '30px',
				padding: 0,
				margin: 0,
				transform: null
			},
			autoStyleContainer: false
		}
	}

	lineOptions() {
		return {
			strokeWidth: 4,
			easing: 'easeInOut',
			duration: 1400,
			color: this.color,
			trailColor: this.background,
			trailWidth: 1,
			svgStyle: { width: '100%', height: '100%' },
			from: { color: this.color },
			to: { color: this.color },
			step: (state, bar) => {
				bar.path.setAttribute('stroke', state.color);
				if (this.text) {
					bar.setText(Math.round(bar.value() * 100) + ' %');
				}
			}
		}
	}

	circleOptions() {
		return {
			color: this.color,
			// This has to be the same size as the maximum width to
			// prevent clipping
			strokeWidth: 4,
			trailWidth: 1,
			easing: 'easeInOut',
			duration: 1400,
			text: {
				autoStyleContainer: false,
			},
			from: { color: this.color, width: 1 },
			to: { color: this.color, width: 4 },
			// Set default step function for all animate calls
			step: function (state, circle) {

				circle.path.setAttribute('stroke', state.color);
				circle.path.setAttribute('stroke-width', state.width);

				const value = Math.round(circle.value() * 100);

				if (value === 0) {
					circle.setText('');
				}
				else {
					circle.setText(value);
				}
			}
		}
	}

	semiOptions() {
		return {
			strokeWidth: 6,
			color: this.color,
			trailColor: this.background,
			trailWidth: 1,
			easing: 'easeInOut',
			duration: 1400,
			svgStyle: null,
			text: {
				value: '',
				alignToBottom: false
			},
			from: { color: this.color },
			to: { color: this.color },
			// Set default step function for all animate calls
			step: (state, bar) => {
				bar.path.setAttribute('stroke', state.color);
				const value = Math.round(bar.value() * 100);
				if (value === 0) {
					bar.setText('');
				} else {
					bar.setText(value);
				}

				bar.text.style.color = state.color;
			}
		}
	}
}