import { api, LightningElement } from 'lwc';

import ProgressBar from './progress';


export default class UiProgress extends LightningElement {

    @api text;
    @api type="line";
    @api progress="0.5";
    @api color="#FFEA82";
    @api background="#eee";

    get options () {
        return this.getOptions(this.type);
    }

    renderedCallback() {

        const el = this.template.querySelector('.container')

        console.log(this.text)

        this.progressBar = new ProgressBar.Line(
            el,
            this.options,
        );

        this.progressBar.animate(0.75);
    }

    getOptions(opt) {

        const opts = {}

        if(this.text){
            opts.text = this.textOptions();
        }

        return { ...this.lineOptions(), ...opts }
    }

    textOptions() {
        return {
            style: {
              // Text color.
              // Default: same as stroke color (options.color)
              color: '#999',
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
            svgStyle: {width: '100%', height: '100%'},
            from: {color: this.color},
            to: {color: this.color},
            step: (state, bar) => {
                bar.path.setAttribute('stroke', state.color);
                if(this.text){
                    bar.setText(Math.round(bar.value() * 100) + ' %');
                }
            }
        }
    }
}