import { LightningElement } from 'lwc';

export default class UiProgressDemo extends LightningElement {

    progress = 75
    color = '#2B65EC'
    customSvg = this.getCustomSvg()
    quarterWidth = '100px'

    renderedCallback() {
        this.quarterWidth = this.template.querySelector('.container').offsetWidth / 4 + 'px';
    }
    
    randomizeProgress() {
        this.color = this.randomHexColor();
        this.progress = Math.ceil(Math.random()*100, 2);
    }

    randomHexColor() {
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }

    getCustomSvg() {
        return `
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100">
            <path fill-opacity="0" stroke-width="1" stroke="#bbb" d="M81.495,13.923c-11.368-5.261-26.234-0.311-31.489,11.032C44.74,13.612,29.879,8.657,18.511,13.923  C6.402,19.539,0.613,33.883,10.175,50.804c6.792,12.04,18.826,21.111,39.831,37.379c20.993-16.268,33.033-25.344,39.819-37.379  C99.387,33.883,93.598,19.539,81.495,13.923z"></path>
            <path class="progress" fill-opacity="0" stroke-width="3" stroke="#ED6A5A" d="M81.495,13.923c-11.368-5.261-26.234-0.311-31.489,11.032C44.74,13.612,29.879,8.657,18.511,13.923  C6.402,19.539,0.613,33.883,10.175,50.804c6.792,12.04,18.826,21.111,39.831,37.379c20.993-16.268,33.033-25.344,39.819-37.379  C99.387,33.883,93.598,19.539,81.495,13.923z"></path>
        </svg>
        `.trim();
    }
}