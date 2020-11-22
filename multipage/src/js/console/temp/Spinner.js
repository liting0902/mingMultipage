export default class Spinner {
    constructor() {
        this._spinner = this.getSpinner();
    }
    static CSS_CLASS = {
        spinContainerRelative: 'spinContainerRelative'
    }
    appendSpinner(targetElement) {
        targetElement.appendChild(this._spinner)
        targetElement.classList.add(Spinner.CSS_CLASS.spinContainerRelative);
    }
    removeSpinner(targetElement) {
        this._spinner.parentElement.removeChild(this._spinner)
    }
    getSpinner() {
        let newTag = document.createElement('div');
        newTag.className = "bars5"

        let newSpan = document.createElement('span');
        newTag.appendChild(newSpan)
        newSpan = document.createElement('span');
        newTag.appendChild(newSpan)
        newSpan = document.createElement('span');
        newTag.appendChild(newSpan)
        newSpan = document.createElement('span');
        newTag.appendChild(newSpan)
        newSpan = document.createElement('span');
        newTag.appendChild(newSpan)
        return newTag
    }
}