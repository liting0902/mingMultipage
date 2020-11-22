//@ts-check
import smoothscroll from 'smoothscroll-polyfill';
import 'jquery'
import 'bootstrap'
//import 'popper.js'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
//import indexEsm from './index.esm.js'
import {
    //syncEmailVerified_ToDB,
    Email_ResendPassword
} from '../../js/firebase/Firebase.js'

//import fontawesome from "@fortawesome/fontawesome";
// import {
//     faUser,
//     faShoppingCart
// } from "@fortawesome/fontawesome-free-solid";
// import index_css from './index.css'
import {
    UserProfile,
    UserData
} from '../../js/dataDefine/index.js'
import {
    useComponent
} from '../../js/others/useComponent3.js'
// import {
//     useComponent as useComponent2
// } from '../../js/others/useComponent2.js'
import cusModalLogin from '../../webcomponents/cusModalLogin3/cusModalLogin.js'
import cusModalUserProfile from '../../webcomponents/cusModalUserProfile3/cusModalUserProfile.js'
import cusFullPageScroll from '../../webcomponents/cusFullPageScroll/fullPageScroll.js'

import '../../webcomponents/cusModalUserProfile3/cusModalUserProfile.css'
import '../../webcomponents/cusModalLogin3/cusModalLogin.css'
import Firebase from '../../js/firebase/Firebase';
//let aa = require('./bg1.png')
// import * as firebase from 'firebase/app'
// import 'firebase/firestore'
// import 'firebase/storage'
// import 'firebase/auth'
//console.log(faUser)

const Swal = require('sweetalert2')
//import Swal from 'sweetalert2'
//fontawesome.library.add([faUser,faShoppingCart]);

//require("html-loader!./webpack_html/img_html.html");
window.Swal = Swal;
window.$ = $
// kick off the polyfill!
smoothscroll.polyfill();

// let aa = document.querySelector('#aa')
// let bb = $('#aa')
// bb.text('bbbb');

// let body = document.querySelector('body')
// body.classList.add('GeneralSetting');

//aa.innerHTML = 'aaaa'
let firebase = require('firebase/app');
require('firebase/firestore')
require('firebase/functions')
require('firebase/storage')
require('firebase/auth')
let firebaseConfig = {
    apiKey: "AIzaSyD4H_AArvgvLf7HEmFBdHS6iUQcG3CTUOM",
    authDomain: "ming1-d8ff5.firebaseapp.com",
    databaseURL: "https://ming1-d8ff5.firebaseio.com",
    projectId: "ming1-d8ff5",
    storageBucket: "ming1-d8ff5.appspot.com",
    messagingSenderId: "504139528822",
    appId: "1:504139528822:web:078db71d75c01af93bfd57",
    measurementId: "G-ENYG95C00T"
};
firebase.initializeApp(firebaseConfig);
// To apply the default browser preference instead of explicitly setting it.
firebase.auth().useDeviceLanguage();

let liLogin = document.querySelector('#liLogin');
let liUserDropdown = document.querySelector('#liUserDropdown');
let aMyOrder = document.querySelector('#aMyOrder');
let aMyProfile = document.querySelector('#aMyProfile');
let aLogout = document.querySelector('#aLogout');
let spanDisplayEmail = document.querySelector('#spanDisplayEmail');
let aOpenModalShopcart = document.querySelector('#aOpenModalShopcart');

//that's not adding a prop to the type Window itself but instead creating a new type that inherits from it, 
//then casting the reference to window to this type
//https://www.reddit.com/r/javascript/comments/a4nf0l/jsdoc_how_to_declare_property_on_window/
// GlobalFlag / ExtendedWindow is self-named variable
// /**  
//  * @typedef {{__forceFlag__: [boolean]}} GlobalFlag  
//  * @typedef {Window & GlobalFlag} ExtendedWindow
//  */
/**
//  * @typedef {Object} GlobalFlag
//  * @prop {boolean} [__myFlag__]
//  * @prop {firebase} [firebase]
//  * @prop {object} [app]
//  * @typedef {Window & GlobalFlag} ExtendedWindow
//  */
let window2 = /** @type {import('./dataDefine/index.js').ExtendedWindow} */ (window);
window2.firebase = firebase
window2.__myFlag__ = false

//window.firebase = firebase

var proxyMainPageUI;
/**
 * @callback pushUrlFunc
 * @param {string} url - ...
 */
window2.app = {
    /**@property {pushUrlFunc} */
    pushUrl: (url) => {
        /* history.push(?) */
    },
    /**@function
     * @returns {('xl'|'lg'|'md'|'sm'|'xs')}
     */
    viewSize: function () {
        return $('#sizer').find('div:visible').data('size');
    },
    /**@function set Main NavBar proxyMainPageUI.shopItemCount 
     * @param {number} itemCount
     */
    setShopItemCount: function (itemCount) {
        proxyMainPageUI.shopItemCount = itemCount;
    },
    /**@property {HTMLElement} */
    navbar1: document.querySelector('#navbar1'),
    /**@function - open modal shopcart */
    openModalShopCart: null,
    /**
     * @property {object} - userData from firestore(get by onAuthChange)
     */
    userData: null,
}
//-------------Proxy
//---pure data
var proxyUserMenuDropdown = {
    isLogin: false,
    loginName: "",
}
//mvvm observeble pattern
proxyUserMenuDropdown = new Proxy(proxyUserMenuDropdown, {
    get: function (target, prop) {
        return target[prop];
    },
    set: function (target, prop, value) {
        switch (prop) {
            case "isLogin":
                if (value == true) {
                    //remove class displayNone
                    liLogin.classList.add('displayNone')
                    liUserDropdown.classList.remove('displayNone')
                } else {
                    //add class displayNone
                    liLogin.classList.remove('displayNone')
                    liUserDropdown.classList.add('displayNone')
                }
                break;
            case "loginName":
                spanDisplayEmail.textContent = value;
                break;
            default:
                break;
        }
        target[prop] = value;
        return true;
    }
})
//test mvvm data binding
let aTestLogin = document.querySelector('#aTestLogin');
let aTestLogout = document.querySelector('#aTestLogout');
aTestLogin.addEventListener('click', (e) => {
    proxyUserMenuDropdown.isLogin = true;
    proxyUserMenuDropdown.loginName = "John"
})
aTestLogout.addEventListener('click', (e) => {
    proxyUserMenuDropdown.isLogin = false;
})

let aTemp = document.querySelector('#aTemp');
aTemp.addEventListener('click', (e) => {
    window.clickda.push();
});


/**
 * @param {firebase.User} authUser 
 * @returns {Promise} newUser = true/ oldUser = false
 */
function checkDBUser_SaveIfNotExist(authUser) {
    function getUserInfo(authUser) {
        let dispalyName = null;
        if (authUser.dispalyName === undefined)
            dispalyName = null;
        else
            dispalyName = authUser.dispalyName;

        let arrayFindGoogleProvider = authUser.providerData.filter((item) => {
            return item.providerId!=='phone' //'google.com':'password'
        })
        let info = {
            dispalyName: dispalyName,
            email: authUser.email,
            emailVerified: authUser.emailVerified,
            phoneNumber: authUser.phoneNumber,
            photoURL: authUser.photoURL,
            uid: authUser.uid,
            providerId: arrayFindGoogleProvider[0].providerId,//authUser.providerData[0].providerId,
            // providerId:u.user.photoURL,
            // providerId:u.user.photoURL,

        }

        return info
    }

    function getDbUser(uid) {
        return this.db.collection('Users').doc(uid).get()
            .then((querySnapshot) => {
                let user = {
                    exists: querySnapshot.exists,
                    doc: querySnapshot.data()
                }
                return user
            })
    }
    let self = this;
    let userInfo = getUserInfo(authUser);
    //check if user exists
    return getDbUser(userInfo.uid)
        .then((dbUser) => {
            if (dbUser.exists === false) {
                self.SetUserData(userInfo)
                return true //new user
            } else {
                return false //old user
            }
        })
}

//------------firebase onAuthChanged
// tset case 1: no authUser (not signin)
// tset case 2: has authUser -- UI display name change
// tset case 3: (has authUser, has window.app.userData) -- sync emailVerified_auth
// tset case 4: (has authUser, no window.app.userData) -- getDbUser
// tset case 5: (has authUser, no window.app.userData, has DbUser) -- window.app.userData = dbUser; + sync emailVerified_auth;
// tset case 6: (has authUser, no window.app.userData, no DbUser) -- userInfo = authUser; + window.app.userData = userInfo(已同時 sync emailVerified_auth);
firebase.auth().onAuthStateChanged(function (authUser) {
    let db = firebase.firestore();
    //functions....
    function SetUserData(userInfo) {
        return db.collection('Users').doc(userInfo.uid).set(userInfo, {
                merge: true
            })
    }
    function syncEmailVerified_ToDB(emailVerified_FromAuth, uid) {
        let userInfo = {
            uid:uid,
            emailVerified:emailVerified_FromAuth
        }
        // new UserData();
        // userInfo.uid = uid;
        // userInfo.emailVerified = emailVerified_FromAuth;
        return SetUserData(userInfo)
        // return firestore.collection('Users').doc(uid).set({
        //     emailVerified: emailVerified_FromAuth
        // }, {
        //     merge: true
        // })
    }
    if (authUser) {
        proxyUserMenuDropdown.isLogin = true;
        proxyUserMenuDropdown.loginName = authUser.email

        let {
            uid,
            emailVerified: emailVerified_auth
        } = authUser
        console.log("LOG:: user", authUser)
        console.log("LOG:: uid", uid)
        console.log("LOG:: emailVerified_auth", emailVerified_auth)

        // User is signed in.
        //providerData.providerId
        
        //----window.app.userData exist
        if (window.app.userData) {
            let {
                emailVerified: emailVerified_db
            } = window.app.userData
            //sync auth emailVerified to DB
            if (emailVerified_auth != emailVerified_db)
                syncEmailVerified_ToDB(emailVerified_auth, uid)
        }
        //----window.app.userData not exist!
        if (!window.app.userData) {
            console.log('load user data from firestore...')
            function getDbUser(uid) {
                return db.collection('Users').doc(uid).get()
                    .then((querySnapshot) => {
                        let dbUser = {
                            exists: querySnapshot.exists,
                            doc: querySnapshot.data()
                        }
                        return dbUser
                    })
            }
            function getUserInfo(authUser) {
                let dispalyName = null;
                if (authUser.dispalyName === undefined)
                    dispalyName = null;
                else
                    dispalyName = authUser.dispalyName;
        
                let userInfo = {
                    dispalyName: dispalyName,
                    email: authUser.email,
                    emailVerified: authUser.emailVerified,
                    phoneNumber: authUser.phoneNumber,
                    photoURL: authUser.photoURL,
                    uid: authUser.uid,
                    providerId: authUser.providerData[0].providerId,
                    // providerId:u.user.photoURL,
                    // providerId:u.user.photoURL,
        
                }
        
                return userInfo
            }
            // start load db user info --> ready to set window.app.userData
            getDbUser(uid)
            .then((dbUser) => {
                // db user exist
                if(dbUser.exists === true){
                    window.app.userData = dbUser;
                    let emailVerified_db = dbUser.doc.emailVerified
                    //sync auth emailVerified to DB
                    if (emailVerified_auth != emailVerified_db)
                        syncEmailVerified_ToDB(emailVerified_auth, uid)
                }//not exist
                else{
                    //get info from authUser
                    let userInfo = getUserInfo(authUser);
                    window.app.userData = userInfo;
                    //save info to db (First time)
                    SetUserData(userInfo);
                    // return true //new user
                } 
                
            })
            .catch((err) => {
                console.error('onAuthStateChanged, get userData failed. ', err.code,err.message)
            })
            
        }

    } else {
        // No user is signed in.
        proxyUserMenuDropdown.isLogin = false;
        proxyUserMenuDropdown.loginName = null
        console.log('No user is signed in...')
    }
});


//firebase.analytics();
// console.log(firebase)

// let db = firebase.firestore();

// db.collection("Products")//.where("autoNum", "==", 7)
//     .get()
//     .then(function (querySnapshot) {
//     })
//     .catch((err) => {

//     })
// console.log(__dirname)
/**@enum {string} */
const ENUM_static_scroll_href_Id = {
    history: 'history',
    news: 'news',
    qanda: 'qanda',
    contactus: 'contactus',
    //page-react
}
/**@enum {string} */
const ENUM_reactSwitchPage = {
    ProductListSearch: 'ProductListSearch',
    ViewOrders: 'ViewOrders',
}
//---pure data
proxyMainPageUI = {
    /**@type {boolean} */
    isReactPage: false,
    //.history|'news'|'qanda'|'contactus
    /**@type {ENUM_static_scroll_href_Id} */
    scrollToHrefId: ENUM_static_scroll_href_Id.history,
    /**@type {ENUM_reactSwitchPage} */
    reactSwitchPage: ENUM_reactSwitchPage.ProductListSearch,
    /**@type {number} */
    shopItemCount: 0,
    cusFullPageScroll: null,
    cusModalLogin: null,
    cusModalUserProfile: null,
}

//mvvm observeble pattern

let pageStatic = $('#page-static')
let pageReact = $('#page-react')
let navbar1 = document.querySelector('#navbar1');
let navbar_height = navbar1.offsetHeight + 5
proxyMainPageUI = new Proxy(proxyMainPageUI, {
    get: function (target, prop) {
        return target[prop];
    },
    set: function (target, prop, value) {
        switch (prop) {
            case "isReactPage":
                if (value == true) {
                    pageStatic.hide()
                    pageReact.fadeIn(500)
                } else {
                    pageStatic.fadeIn(500)
                    pageReact.hide()
                }
                break;
            case "scrollToHrefId":
                // target.cusModalLogin.scrollToElem('#history')
                //console.log(target.cusFullPageScroll)
                target.cusFullPageScroll.scrollToElem('#' + value)
                // function scrollToId(divId) {
                //     $('html, body').animate({
                //         scrollTop: $(`#${divId}`).offset().top - navbar_height
                //     }, 500);
                // }
                // /**@type {ENUM_static_scroll_href_Id} */
                // let targetDivId = value;
                // scrollToId(targetDivId);
                break;
            case "shopItemCount":
                //$('.fa-shopping-cart').attr("data-count", value)
                let numberBadges = document.querySelectorAll('.numberBadge')
                numberBadges.forEach((element) => {
                    element.textContent = value
                })
                break;
            case "reactSwitchPage":
                switch (value) {
                    case ENUM_reactSwitchPage.ProductListSearch:
                        window2.app.pushUrl('/ProductListSearch'); //ProductListSearch
                        setTimeout(() => {
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: 'instant' //'smooth'
                            });
                        }, 10); //0的話有可能無法滑到最頂端，看運氣

                        break;
                    case ENUM_reactSwitchPage.ViewOrders:
                        window2.app.pushUrl('/ViewOrders'); //ProductListSearch
                        setTimeout(() => {
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: 'instant' //'smooth'
                            });
                        }, 10); //0的話有可能無法滑到最頂端，看運氣
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
        target[prop] = value;
        return true;
    }
})

// navbar menu click fade in-out effect


//let path = require('path');
// let path1 = path.join(__dirname,'../../assets/cusFullPageScroll/bg1.png')
// console.log(__dirname)

let newTagName = "cus-full-page-scroll";
let pathHtml_fullPageScroll = '../../webcomponents/cusFullPageScroll/fullPageScroll.htm';
if (!proxyMainPageUI.cusFullPageScroll)
    useComponent(newTagName, pathHtml_fullPageScroll, cusFullPageScroll)
    .then((htmlFile) => {
        let newComponent = new htmlFile.ctor(htmlFile.templateContent);
        proxyMainPageUI.cusFullPageScroll = newComponent

        // console.log("LOG:: compUI.cssContent", compUI.cssContent)
        // console.log("LOG:: compUI.templateContent", compUI.templateContent)
        pageStatic.append(newComponent)
        //newComponent.scrollTo('#news')
    })
//---------------------Constructor()-> setFirebase(firebase) - > Auth().getRedirectResult()
newTagName = "cus-modal-login";
//let login_Element = document.querySelector(newTagName);
if (!proxyMainPageUI.cusModalLogin) {
    useComponent(newTagName, '../../webcomponents/cusModalLogin3/cusModalLogin.htm', cusModalLogin)
        .then((htmlFile) => {
            let plugins = {
                Swal,
                Email_ResendPassword
            }
            //class-instance APPEAR!!  you can set template now~~~
            let newComponent = new htmlFile.ctor(htmlFile.templateContent, plugins);
            proxyMainPageUI.cusModalLogin = newComponent
            // newComponent.setEvents({
            //     onSwitchForgetPassword: function () {},
            //     onSwitchRegister: function () {}
            // })
            document.body.appendChild(newComponent)

            // newComponent.showModal(true)
            // newComponent.proxyUI.bindIptSigninEmail = 'ice4kimo@yahoo.com.tw'
            // newComponent.proxyUI.bindIptSigninPWD = 'qwer1111'


            // let href = '../../webcomponents/cusModalLogin3/cusModalLogin.css'
            // let style = document.createElement('link')
            // style.setAttribute('rel', 'stylesheet')
            // style.setAttribute('href', '../../webcomponents/cusModalLogin3/cusModalLogin.css')
            // document.body.appendChild(style)

            //newComponent.setAuth_getRedirectResult();
            // newComponent.setDataDefine({
            //     UserProfile: UserProfile
            // });
            // let uid = testData.userId;

            //======= tsetArea =======
            //newComponent.appendTestArea(testArea)

            // this.btnTEST = document.querySelector('#btnTEST');
            // btnTEST.addEventListener('click', (e) => {
            //     // newComponent.proxyUI.bindIptSigninEmail = 'AAAAA'
            //     // console.log(newComponent.proxyUI.bindIptSigninEmail)

            //     // //newComponent.proxyUI.bindCkboxSigninKeepIn = true
            //     // console.log(newComponent.proxyUI.bindCkboxSigninKeepIn)


            // })

            // let btnLogout = document.querySelector('#btnLogout');
            // btnLogout.addEventListener('click',(e) => {
            //     firebase.auth().signOut().then(function () {
            //         // Sign-out successful.
            //     }).catch(function (error) {
            //         // An error happened.
            //     });
            // });



        })


}



//------------------- aMyProfile
let pathHtml_userProfile = '../../webcomponents/cusModalUserProfile3/cusModalUserProfile.htm';
aMyProfile.addEventListener('click', (e) => {
    e.preventDefault();
    let newTagName = "cus-modal-user-profile";
    //let login_Element = document.querySelector(newTagName);
    if (proxyMainPageUI.cusModalUserProfile)
        proxyMainPageUI.cusModalUserProfile.showModal(true)
    else {
        useComponent(newTagName, pathHtml_userProfile, cusModalUserProfile)
            .then((compUI) => {
                let plugins = {
                    Swal,
                    Email_ResendPassword
                }

                let newComponent = new compUI.ctor(compUI.templateContent, plugins);
                proxyMainPageUI.cusModalUserProfile = newComponent
                newComponent.setDataDefine({
                    UserData: UserData
                });
                document.body.appendChild(newComponent)

                let uid = firebase.auth().currentUser.uid
                newComponent.loadDbProfile(uid);
                //newComponent.showModal(true)
                newComponent.showModal(true)
                //UI control
                newComponent.proxyUI.isEmailVerified = firebase.auth().currentUser.emailVerified;

                // console.log("LOG:: compUI.cssContent", compUI.cssContent)
                // console.log("LOG:: compUI.templateContent", compUI.templateContent)
                // pageStatic.append(newComponent)
                //newComponent.scrollTo('#news')
            })

            .catch((err) => {
                console.log(err)
            });
    }
});


// function navbar_menu_click() {
//     let href = this.getAttribute('href')
//     if (href === "#page-react") {
//         pageStatic.hide()
//         pageReact.fadeIn(500)
//     } else {
//         pageStatic.fadeIn(500)
//         pageReact.hide()
//     }

//     //scroll to top mt-5
//     //divId = $(this).attr('href');
//     //let history_Top = $('#history').offset().top + 10
//     let divId = href // content id
//     // add smooth scroll to contents
//     $('html, body').animate({
//         scrollTop: $(divId).offset().top - navbar_height
//     }, 500);
// }

// get 5 navbar items
let all_MenuHref = document.querySelectorAll('a[href]')
// ----------- add button click event
//     <a href="#history" class="nav-link">老店歷史</a>
//     <a href="#news" class="nav-link">最新消息</a>
//     <a href="#page-react" class="nav-link" id="aOrderProducts">產品訂購</a>
//     <a href="#qanda" class="nav-link">常見問題(購物)</a>
//     <a href="#contactus" class="nav-link">聯絡我們</a>
let array_MenuHrefs = [...all_MenuHref].filter((item) => {
    let href = item.getAttribute('href')
    return href !== "#" // 總共有5個
})
// add nav item click event
array_MenuHrefs.forEach(function (element) {
    let href = element.getAttribute('href')
    switch (href) {
        case '#page-react':
            element.addEventListener('click', () => {
                proxyMainPageUI.isReactPage = true;
                proxyMainPageUI.reactSwitchPage = ENUM_reactSwitchPage.ProductListSearch;
            });
            break;
        case '#history':
            element.addEventListener('click', () => {
                proxyMainPageUI.isReactPage = false;
                proxyMainPageUI.scrollToHrefId = ENUM_static_scroll_href_Id.history
            });
            break;
        case '#news':
            element.addEventListener('click', () => {
                proxyMainPageUI.isReactPage = false;
                proxyMainPageUI.scrollToHrefId = ENUM_static_scroll_href_Id.news
            });
            break;
        case '#qanda':
            element.addEventListener('click', () => {
                proxyMainPageUI.isReactPage = false;
                proxyMainPageUI.scrollToHrefId = ENUM_static_scroll_href_Id.qanda
            });
            break;
        case '#contactus':
            element.addEventListener('click', () => {
                proxyMainPageUI.isReactPage = false;
                proxyMainPageUI.scrollToHrefId = ENUM_static_scroll_href_Id.contactus
            });
            break;
        default:
            break;
    }
    //if(href==="")
    //console.log(item)
    //element.addEventListener('click', navbar_menu_click);
});

//------------------- liLogin
liLogin.addEventListener('click', (e) => {
    e.preventDefault()
    let login_Element = document.querySelector('cus-modal-login');
    login_Element.showModal(true)
    // if (login_Element)
    //     login_Element.showModal(true)
    // else {
    //     useComponent('./webcomponents/cusModalLogin/cusModalLogin.htm', 'cus-modal-login')
    //         .then((htmlFile) => {
    //             //class-instance APPEAR!!  you can set template now~~~
    //             let newComponent = new htmlFile.ctor(htmlFile.templateContent);
    //             newComponent.setEvents({
    //                 onSwitchForgetPassword: function () {},
    //                 onSwitchRegister: function () {}
    //             })
    //             //newComponent.setFirebase(firebase)
    //             //newComponent.appendChild(htmlFile.templateContent);
    //             //newComponent.setTemplate(htmlFile.templateContent)
    //             document.body.appendChild(newComponent)
    //             //newComponent.showModal(true)
    //             newComponent.showModal(true)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         });
    // }
});
//------------------- aLogout
aLogout.addEventListener('click', (e) => {
    e.preventDefault()
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
})
//------------------- aMyOrder
aMyOrder.addEventListener('click', (e) => {
    e.preventDefault()
    proxyMainPageUI.isReactPage = true
    proxyMainPageUI.reactSwitchPage = ENUM_reactSwitchPage.ViewOrders
    //window.app.pushUrl('/ViewOrders'); //ProductListSearch
});




//---------------- Web Components
// var _cls_ = {}; // serves as a cache, speed up later lookups
// function getClass(name) {
//     if (!_cls_[name]) {
//         // cache is not ready, fill it up
//         if (name.match(/^[a-zA-Z0-9_]+$/)) {
//             // proceed only if the name is a single word string
//             _cls_[name] = eval(name);
//         } else {
//             // arbitrary code is detected 
//             throw new Error("Who let the dogs out?");
//         }
//     }
//     return _cls_[name];
// }


// /**
//  * get class name from text content
//  * @function
//  * @param {string} htmlString - from other webcomponent
//  */
// function getClassName(htmlString) {
//     let reg = /class\s(?<X>cus[a-zA-Z0-9]+)/im; // Global Case-insensitive Multi-line
//     let str = ` class cusModalUserProfile extends HTMLElement {
//                         ffff
//                         rrrr`
//     str = htmlString;
//     // let a = reg.exec(str)
//     // console.log(a)
//     let groups = str.match(reg).groups;
//     //console.log(groups.X)
//     return groups.X
// }

// /**
//  * 
//  * @param {string} componentPath 
//  * @param {string} newTagName 
//  */
// function useComponent(componentPath, newTagName) {
//     return fetch(componentPath).then((response) => {
//             //console.log(response);
//             return response.text();
//         })
//         .then((htmlString) => {
//             let parser = new DOMParser();
//             let doc = parser.parseFromString(htmlString, 'text/html');

//             const template = doc.querySelector('template');
//             const templateContent = template.content;
//             //this.appendChild(templateContent)//class-instance not appear yet

//             //console.log(templateContent)
//             //console.log(doc)
//             var script1 = doc.querySelector('#componentScript');
//             script1 = document.createRange().createContextualFragment(script1.outerHTML)
//             //document.currentScript.insertAdjacentHTML() 
//             document.body.appendChild(script1);
//             let newClassName = getClassName(htmlString);
//             //let newClass = getClass('cusModalLogin')
//             let newClass = getClass(newClassName)
//             customElements.define(newTagName, newClass);
//             //customElements.define(newTagName, cusModalLogin);
//             let ctor = customElements.get(newTagName);

//             return {
//                 ctor: ctor,
//                 templateContent: templateContent
//             }
//             //console.log(ctor)
//             // let aa = new ctor();
//             // aa.setTemplate(templateContent)
//             // document.body.appendChild(aa)
//             // aa.showModal()

//             //var aa = new cus-modal-login()
//         })
// }

//---------------------test scroll
let btnstatic = document.querySelector('#btnstatic');
let btnreact = document.querySelector('#btnreact');
let btn1 = document.querySelector('#btn1');
let btn2 = document.querySelector('#btn2');
let btn3 = document.querySelector('#btn3');
let btn4 = document.querySelector('#btn4');
btnstatic.addEventListener('click', () => {
    proxyMainPageUI.isReactPage = false;
});
btnreact.addEventListener('click', () => {
    proxyMainPageUI.isReactPage = true;
});
// btn1.addEventListener('click', () => {
//     proxyMainPageUI.scrollToHrefId = ENUM_static_scroll_href_Id.history;
// });
// btn2.addEventListener('click', () => {
//     proxyMainPageUI.scrollToHrefId = ENUM_static_scroll_href_Id.news;
// });
// btn3.addEventListener('click', () => {
//     proxyMainPageUI.scrollToHrefId = ENUM_static_scroll_href_Id.qanda;
// });
// btn4.addEventListener('click', () => {
//     proxyMainPageUI.scrollToHrefId = ENUM_static_scroll_href_Id.contactus;
// });
aOpenModalShopcart.addEventListener('click', () => {
    proxyMainPageUI.isReactPage = true
    proxyMainPageUI.reactSwitchPage = ENUM_reactSwitchPage.ProductListSearch;
    setTimeout(() => {
        if (window2.app.openModalShopCart)
            window2.app.openModalShopCart();
    }, 100);
})
//-------------
$(document).ready(function () {
    //pageStatic.hide();
    //pageReact.hide();
    proxyMainPageUI.isReactPage = false;
})

//test pageReact
setTimeout(() => {
    // let aOrderProducts = document.querySelector('#aOrderProducts');
    // aOrderProducts.click();
    // proxyMainPageUI.isReactPage = true;
    // proxyMainPageUI.reactSwitchPage = ENUM_reactSwitchPage.ViewOrders
}, 500);
// let style1 = document.createElement('style');
// style1.innerHTML = `.fa-shopping-cart[data-count]:after {
//     position: relative;
//     right: 6px;
//     top: -12px;
//     content: attr(data-count);
//     font-size: 50%;
//     padding: .5em;
//     border-radius: 50%;
//     line-height: .75em;
//     color: white;
//     background: rgba(255, 0, 0, .85);
//     text-align: center;
//     display: inline-block;
//     min-width: 2em;
//     min-height: 2em;
//     font-weight: bold;
// }`
// setTimeout(() => {
//     document.body.appendChild(style1);
// }, 2000);