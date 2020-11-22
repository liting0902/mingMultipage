import {baseCusComponent} from './useComponent2.js'
export default class extends baseCusComponent{
    constructor(templateContent,cssContent, events){
        super(templateContent,cssContent, events);
        let aa1 = this.shadowRoot.querySelector('#aa1')
        
        let btn1= this.shadowRoot.querySelector('#btn1')
        btn1.addEventListener('click',(e) => {
            aa1.innerHTML ='CCCCCCC'
        })
        let style = document.createElement('style')
        style.innerHTML = cssContent
        
        this.shadowRoot.appendChild(style)
    }
    
}