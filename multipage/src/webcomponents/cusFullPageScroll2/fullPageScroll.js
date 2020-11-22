
export default class extends HTMLElement{
    constructor(templateContent){
        super(templateContent);
        if(!templateContent)
            throw new Error('error, arg - templateContent not defined!')
        this.appendChild(templateContent)
        // let aa1 = this.shadowRoot.querySelector('#aa1')
        
        // let btn1= this.shadowRoot.querySelector('#btn1')
        // btn1.addEventListener('click',(e) => {
        //     aa1.innerHTML ='CCCCCCC'
        // })
        
    }
    scrollToElem(querySelector){
        var element = this.querySelector(querySelector);
        element.scrollIntoView();
        // element.scrollIntoView({ 
        //     behavior: 'smooth' 
        // });
    }
}


// export default class extends HTMLElement{
//     constructor(templateContent, events){
//         super();
//         if (templateContent)
//             this.appendTemplate(templateContent);
//         // initial this.events
//         if (events)
//             this.events = events;
//     }
//     appendTemplate(templateContent) {
//         // const shadowRoot = this.attachShadow({mode: 'open'});
//         // shadowRoot.appendChild(templateContent)
//         this.appendChild(templateContent)
//     }
// }