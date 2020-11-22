let date = Date.now()
let lang = 'en-US' // you may use user's computer language: navigator.language || navigator.userLanguage
let d = new Date(date);
//console.log(d)
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:"numeric", timeZone:'short' };
// let sDate = d.toLocaleDateString(lang, options);
// console.log(sDate)

const event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
console.log(event.toLocaleDateString('en-US', options));