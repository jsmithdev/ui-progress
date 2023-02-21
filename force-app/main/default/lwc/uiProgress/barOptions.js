

export const getOptions = input => {

	switch(input.type) {
		case 'circle':
			return circleOptions(input)
		case 'semi':
			return semiOptions(input)
		case 'pill':
			return pillOptions(input)
		default: {
			const opts = {}

			if (input.text) {
				opts.text = textOptions();
			}

			return { ...lineOptions(input), ...opts }
		}
	}
}

function textOptions () {
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

function lineOptions (input) {
	return {
		strokeWidth: 4,
		easing: 'easeInOut',
		duration: 1400,
		color: input.color,
		trailColor: input.background,
		trailWidth: 1,
		svgStyle: { width: '100%', height: '100%' },
		from: { color: input.color },
		to: { color: input.color },
		step: (state, bar) => {
			bar.path.setAttribute('stroke', state.color);
			if (input.text) {
				bar.setText(Math.round(bar.value() * 100) + ' %');
			}
		}
	}
}

function pillOptions (input) {
	return {
		strokeWidth: 15,
		easing: 'easeInOut',
		duration: 1400,
		color: input.color,
		trailColor: input.background,
		trailWidth: 15,
		svgStyle: { 
			width: '100%',
			height: '100%',
			borderRadius: '10px',
		},
		from: { color: input.color },
		to: { color: input.color },
		step: (state, bar) => {
			bar.path.setAttribute('stroke', state.color);
			if (input.text) {
				bar.setText(Math.round(bar.value() * 100) + ' %');
			}
		},
		text: {
			// Initial value for text.
			// Default: null
			//value: 'Text',
	
			// Class name for text element.
			// Default: 'progressbar-text'
			//className: 'progressbar-text',
	
			// Inline CSS styles for the text element.
			// If you want to modify all CSS your self, set null to disable
			// all default styles.
			// If the style option contains values, container is automatically
			// set to position: relative. You can disable behavior this with
			// autoStyleContainer: false
			// If you specify anything in this object, none of the default styles
			// apply
			// Default: object speficied below
			style: {
				// Text color.
				// Default: same as stroke color (options.color)
				color: input.text.color,
				//position: 'relative',
				left: '0%',
				top: '7%',
				padding: 0,
				position: 'absolute',
				
				'margin-left': '5px',
				'font-size': input.text.size,
				// You can specify styles which will be browser prefixed
				//transform: {
				//	prefix: true,
				//	value: 'translate(-50%, -50%)'
				//}
			},
		},
	}
}

function circleOptions (input) {
	return {
		color: input.color,
		trailColor: input.background,
		// This has to be the same size as the maximum width to
		// prevent clipping
		strokeWidth: 4,
		trailWidth: 1,
		easing: 'easeInOut',
		duration: 1400,
		text: {
			autoStyleContainer: false,
		},
		from: { color: input.color, width: 1 },
		to: { color: input.color, width: 4 },
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

function semiOptions (input) {
	return {
		strokeWidth: 6,
		color: input.color,
		trailColor: input.background,
		trailWidth: 1,
		easing: 'easeInOut',
		duration: 1400,
		svgStyle: null,
		text: {
			value: '',
			alignToBottom: false
		},
		from: { color: input.color },
		to: { color: input.color },
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