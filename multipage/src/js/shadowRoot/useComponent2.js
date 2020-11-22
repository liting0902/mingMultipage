export class baseCusComponent extends HTMLElement{
    constructor(templateContent,cssContent, events){
        super();
        if (templateContent)
            this.appendTemplate(templateContent,cssContent);
        // initial this.events
        if (events)
            this.events = events;
    }
    appendTemplate(templateContent,cssContent) {
        console.log("LOG:: baseCusComponent -> appendTemplate -> cssContent", cssContent)
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(templateContent)
        if(cssContent){
            let style = document.createElement('style')
            style.innerHTML = cssContent
            this.shadowRoot.appendChild(style)
        }
        //this.appendChild(templateContent)
    }
}
/**
 * 
 * @param {string} componentPath 
 * @param {string} newTagName 
 */
export function useComponent(newTagName, htmlPath, compClass, cssPath) {
    return getFetchResult(htmlPath, cssPath)
        .then((htmlCSS) => {
            // htmlCSS
            // {
            //     "html": "aaaa",
            //     "css": "bbbb"
            // }
            let parser = new DOMParser();
            let doc = parser.parseFromString(htmlCSS.html, 'text/html');

            const template = doc.querySelector('template');
            if(!template)
                throw new Error('error: webcomponent DOM element<template> not found.')
            const templateContent = template.content;
            customElements.define(newTagName, compClass);
            let ctor = customElements.get(newTagName);
            let rtnObject = {
                ctor: ctor,
                templateContent: templateContent
            }
            if(htmlCSS.css)
                rtnObject.cssContent = htmlCSS.css
            return rtnObject
        })
}

function fetchCss(cssPath){
    return fetch(cssPath)
    .then((res) => {
        return res.text()
    })
}
function getFetchResult(htmlPath, cssPath){
    return fetch(htmlPath)
    .then((res) => {
        return res.text()
    })
    .then((text) => {
        let htmlObject = {html:text}
        if(!cssPath)
            return Promise.all([htmlObject]) 
        else
            return Promise.all([htmlObject, fetchCss(cssPath)])
    })
    .then((allResult) => {
        let rtnObject = allResult[0]//htmlObject
        if(allResult.length>1)
            rtnObject.css=allResult[1]//css text
        // {
        //     "html": "aaaa",
        //     "css": "bbbb"
        // }
        return rtnObject
    })
}