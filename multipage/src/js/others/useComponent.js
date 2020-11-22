/**
 * 
 * @param {string} componentPath 
 * @param {string} newTagName 
 */
export function useComponent(newTagName, componentPath, compClass, cssPath) {
    return fetch(componentPath)
        .then((response) => {
            return response.text();
        })
        .then((htmlString) => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(htmlString, 'text/html');

            const template = doc.querySelector('template');
            if(!template)
                throw new Error('error: webcomponent DOM element<template> not found.')
            const templateContent = template.content;
            customElements.define(newTagName, compClass);
            let ctor = customElements.get(newTagName);
            return {
                ctor: ctor,
                templateContent: templateContent
            }
            //console.log(ctor)
            // let aa = new ctor();
            // aa.setTemplate(templateContent)
            // document.body.appendChild(aa)
            // aa.showModal()

            //var aa = new cus-modal-login()
        })
}