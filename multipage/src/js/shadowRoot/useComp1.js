import {useComponent} from './useComponent2.js'
import Comp1 from './Comp1.js'
useComponent('aa-aa', './Comp1.htm', Comp1,'./Comp1.css')
.then((compUI) => {
console.log("LOG:: compUI", compUI)

    //console.log(res)
    let newComponent = new compUI.ctor(compUI.templateContent, compUI.cssContent);
    document.body.appendChild(newComponent)
    
})