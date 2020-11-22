//@ts-check
import baseComponent from '../baseComponent.js'
/**@enum {string} */
const ENUM_switchPage = {
    radioSignin: "radioSignin",
    radioSignup: "radioSignup",
    radioForgetPwd: "radioForgetPwd"
}
export default class cusModalLogin extends HTMLElement {
    /**
     * @param {HTMLElement} templateContent 
     * @param {import('./cusModalLogin').plugins} plugins 
     */
    constructor(templateContent, plugins) {
        super();
        /** {Swal , Email_ResendPassword(...)} */
        this.plugins = plugins;

        //plugins.Email_ResendPassword2
        // assign firebase
        this.firebase = null;
        this.db = null

        if (window.firebase)
            this.setFirebase(window.firebase)

        // this.events = {
        //     onSwitchForgetPassword: function () {

        //     },
        //     onSwitchRegister: function () {

        //     }
        // }
        // initial templateContent
        if (templateContent)
            this.appendTemplate(templateContent);
        // initial this.events
        // if (events)
        //     this.setEvents(events);
        //var template = document.getElementById('loginTemplate');


        this.proxyUI = {
            bindIptSigninEmail: '',
            bindIptSigninPWD: '',
            bindCkboxSigninKeepIn: false,
            bindIptRegisterEmail: '',
            bindIptRegisterPWD1: '',
            bindIptRegisterPWD2: '',
            bindIptResentPwdEmail: '',
            switchPage: ENUM_switchPage.radioSignin
        }
        let self = this;
        this.proxyUI = new Proxy(this.proxyUI, {
            /**@param {string} prop */
            get: function (target, prop) {
                /**@type {HTMLInputElement} */
                let elem = self.querySelector(`[${prop}]`)
                if (prop === "bindCkboxSigninKeepIn")
                    return elem.checked
                else
                    return elem.value;
            },
            /**@param {string} prop */
            set: function (target, prop, value) {
                /**@type {HTMLInputElement} */
                let elem;
                switch (prop) {
                    //================ switchPage
                    case 'switchPage':
                        switch (value) {
                            case ENUM_switchPage.radioSignin:
                                /**@type {HTMLInputElement} */
                                elem = self.querySelector('.modal-header .radioSignin');
                                elem.checked = true;
                                /**@type {HTMLInputElement} */
                                let ckboxSignIn = self.querySelector('.modal-body .ckboxSignIn');
                                ckboxSignIn.checked = true;
                                break;
                            case ENUM_switchPage.radioSignup:
                                /**@type {HTMLInputElement} */
                                elem = self.querySelector('.modal-header .radioSignup');
                                elem.checked = true;
                                /**@type {HTMLInputElement} */
                                let ckboxSignUp = self.querySelector('.modal-body .ckboxSignUp');
                                ckboxSignUp.checked = true;
                                break;
                            case ENUM_switchPage.radioForgetPwd:
                                /**@type {HTMLInputElement} */
                                elem = self.querySelector('.modal-header .radioForgetPwd');
                                elem.checked = true;
                                /**@type {HTMLInputElement} */
                                let ckboxForgetPwdHtm = self.querySelector('.modal-body .ckboxForgetPwdHtm');
                                ckboxForgetPwdHtm.checked = true;
                                break;
                            default:
                                break;
                        }
                        break;
                        //================ other bindXXXXX props
                    default:
                        elem = self.querySelector(`[${prop}]`)
                        if (prop === "bindCkboxSigninKeepIn")
                            elem.checked = value
                        else
                            elem.value = value;
                        break;
                }

                return true
            },
        })

        this.proxyUI.bindIptSigninEmail = 'ice4kimo@yahoo.com.tw'
        this.proxyUI.bindIptSigninPWD = '11111111'
        //this.innerHTML = `<button>Sup?</button>`;

        //this.showModal();

        // const style = document.createElement('style');
        // style.textContent = `
        //     div { padding: 10px; border: 1px solid gray; width: 200px; margin: 10px; }
        //     h2 { margin: 0 0 10px; }
        //     ul { margin: 0; }
        //     p { margin: 10px 0; }
        // `;
        // shadowRoot.appendChild(style);

        //---- also can use 
        //  this.attachShadow({mode: 'open'});
        //  this.shadowRoot.appendChild

        // const shadowRoot = this.attachShadow({
        //     mode: 'open'
        // });
        // shadowRoot.appendChild(templateContent.cloneNode(true));

    }
    appendTemplate(templateContent) {
        this.appendChild(templateContent)
        let self = this;

        //--------- inside functions
        this.btnGoogleSignin = this.querySelector('.signInHtm .btnGoogleSignin')
        this.btnGoogleSignin.addEventListener('click', this.Google_Register_Login.bind(this));
        this.btnEmailSignin = this.querySelector('.signInHtm .btnEmailSignin')
        this.btnEmailSignin.addEventListener('click', (e) => {
            //begin html input check
            // console.log(1111)
        });
        this.btnEmailRegister = this.querySelector('.signUpHtm .btnEmailSignin')
        this.btnEmailRegister.addEventListener('click', this.Email_Register.bind(this));
        // this.btnResentPassword = this.querySelector(".forgetPwdHtm [btnResentPassword]")
        // this.btnResentPassword.addEventListener('click', this.Email_ResendPassword.bind(this));

        let formSignInHtm = this.querySelector('.signInHtm');
        formSignInHtm.addEventListener('submit', (e) => {
            e.preventDefault()
            console.log(1111)
            //already pass form input valid check
            this.Email_Login();
            return false
        })

        let forgetPwdHtm = this.querySelector('.forgetPwdHtm');
        forgetPwdHtm.addEventListener('submit', (e) => {
            e.preventDefault()
            var emailAddress = self.proxyUI.bindIptResentPwdEmail;
            //already pass form input valid check
            // extends from baseComponent.js
            self.Email_ResendPassword(emailAddress);


            //return false
        })


        // $(this).on('shown.bs.modal', function () {
        //     $('#iptEmail').trigger('focus')
        // })
        //--------- outter connect interface
        this.modalLogin_Register = this.querySelector('.signInHtm .divSignupHtm');
        this.modalLogin_forgetPwd = this.querySelector('.signInHtm .divForgetPassword');
        // add click events
        // this.modalLogin_Register.addEventListener('click', (e) => {
        //     this.events.onSwitchRegister();
        // })
        // this.modalLogin_forgetPwd.addEventListener('click', (e) => {
        //     this.events.onSwitchForgetPassword();
        // })

        // let ckboxHideLeftArrow = document.querySelector('.modal-header #ckboxHideLeftArrow');

        let leftArrow = this.querySelector('.modal-header .leftArrow')
        leftArrow.addEventListener('click', (e) => {
            self.proxyUI.switchPage = ENUM_switchPage.radioSignin;
        })
        let divSignupHtm = this.querySelector('.modal-body .divSignupHtm')
        divSignupHtm.addEventListener('click', (e) => {
            self.proxyUI.switchPage = ENUM_switchPage.radioSignup;
        })
        let divForgetPassword = this.querySelector('.modal-body .divForgetPassword')
        divForgetPassword.addEventListener('click', (e) => {
            self.proxyUI.switchPage = ENUM_switchPage.radioForgetPwd;
        })


    }
    appendTestArea(htmlElement) {
        let testArea = this.querySelector('[testArea]');
        testArea.appendChild(htmlElement)
        //console.log(aa)
    }
    // setEvents(events) {
    //     this.events = events;
    // }
    setFirebase(inFirebase) {
        // console.log(inFirebase)
        this.firebase = inFirebase;
        this.db = this.firebase.firestore();
        this.setAuth_getRedirectResult();
    }

    setAuth_getRedirectResult() {
        var self = this
        this.firebase.auth().getRedirectResult().then(function (result) {
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // ...
            }
            // The signed-in user info.
            let user = result.user;
            if (user) {
                //self.checkDB_User(user)
                // hide self element
                self.showModal(false)
            }

        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }
    showModal(isShow) {
        //let modalLogin2 = document.querySelector('#modalLogin2');
        //console.log(modalLogin2)
        //modalLogin2.assign();
        /**@type {HTMLInputElement} */
        let iptEmail = this.querySelector(".modal .signInHtm input[type='email']");
        $('#modalLogin').on('shown.bs.modal', function () {
            iptEmail.focus();
        })
        let options = {
            show: isShow,
            focus: true,
            keyboard: true
        }
        let strShow = null;
        if (isShow == true)
            strShow = 'show';
        else
            strShow = 'hide';

        $('#modalLogin').modal(strShow)

    }
    // extends from baseComponent.js
    /**
     * @param {string} emailAddress 
     */
    Email_ResendPassword(emailAddress) {
        let self = this
        return this.plugins.Email_ResendPassword(
            emailAddress,
            window.firebase,
            self.plugins.Swal,
            () => {
                self.showModal(false)
                self.proxyUI.switchPage = ENUM_switchPage.radioSignin;
            }
        );
    }

    // Email_ResendPassword(emailAddress) {
    //     let self = this
    //     return this.plugins.Email_ResendPassword(
    //         emailAddress,
    //         window.firebase,
    //         self.plugins.Swal,
    //         () => {
    //             self.showModal(false)
    //             self.proxyUI.switchPage = ENUM_switchPage.radioSignin;
    //         }
    //     );
    // }
    Email_Register() {
        let email = this.proxyUI.bindIptRegisterEmail;
        let password = this.proxyUI.bindIptRegisterPWD1;
        let persistence = this.getPersistence(this.proxyUI.bindCkboxSigninKeepIn)
        this.firebase.auth().setPersistence(persistence)
            .then(() => {
                return this.firebase.auth().createUserWithEmailAndPassword(email, password)
            })
            // .then(() => {
            //     let user = this.firebase.auth().currentUser;
            //     if (user)
            //         return this.checkDB_User(user); //newUser = true
            //     else
            //         return false //oldUser = false
            // })
            .then((isNewUser) => {
                // if (isNewUser === false)
                //     return null // no need to send email verification
                let user = this.firebase.auth().currentUser;
                return user.sendEmailVerification()
                //send verification email

            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
    }
    /**
     * this.firebase.auth().setPersistence(persistence)
     * @param {boolean} isCkboxSigninKeepIn proxyUI.bindCkboxSigninKeepIn
     * @returns {string} firebase.auth.Auth.Persistence.LOCAL...etc
     */
    getPersistence(isCkboxSigninKeepIn) {
        let persistence;
        if (isCkboxSigninKeepIn)
            persistence = window.firebase.auth.Auth.Persistence.LOCAL
        else
            persistence = window.firebase.auth.Auth.Persistence.NONE
        return persistence
    }
    Email_Login() {
        let email = this.proxyUI.bindIptSigninEmail;
        let password = this.proxyUI.bindIptSigninPWD;
        let persistence = this.getPersistence(this.proxyUI.bindCkboxSigninKeepIn)
        let self = this
        this.firebase.auth().setPersistence(persistence)
            .then(() => {
                self.showModal(false)
                return this.firebase.auth().signInWithEmailAndPassword(email, password)
            })
            .then(() => {

            })
            .catch(function (error) {
                // Handle Errors here.

                let errZhTw = getErrorMessageZHTW(error.code, error.message)

                self.plugins.Swal.fire({
                    title: '注意',
                    text: `${errZhTw.errCodeZHTW},${errZhTw.errMessageZHTW}`,
                    icon: 'warning',
                    //confirmButtonText: 'Cool'
                })
                // ...
            });

    }
    Google_Register_Login(e) {
        var self = this;
        var provider = new this.firebase.auth.GoogleAuthProvider();
        let persistence = this.getPersistence(this.proxyUI.bindCkboxSigninKeepIn)
        this.firebase.auth().setPersistence(persistence)
            .then(() => {
                return this.firebase.auth().signInWithRedirect(provider);
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('error-->', errorMessage)
                // ...
            });
        return;
        //signInWithRedirect
        //firebase.auth().signInWithPopup(provider).then(function (result) {
        this.firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            let info = self.getUserInfo(user);
            //check if user exists
            // self.getDbUser(info.uid)
            //     .then((dbUser) => {
            //         if (dbUser.exists === false)
            //             self.SetUserData(info)
            //         else
            //     })


            // hide self element
            self.showModal(false)
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(errorMessage)
            // ...
        });
    }


    connectedCallback() {
        //updateStyle(this);
    }

    disconnectedCallback() {}

    adoptedCallback() {}

    attributeChangedCallback(name, oldValue, newValue) {
        //updateStyle(this);
    }


    // assign(){
    // }
}

function getErrorMessageZHTW(errCode, errMessage) {
    console.log("LOG:: cusModalLogin -> getErrorMessageZHTW -> errCode", errCode)
    let errCodeZHTW;
    let errMessageZHTW = errMessage;
    switch (errCode) {
        case 'auth/user-not-found':
            errCodeZHTW = "這個Email帳號不存在"
            errMessageZHTW = "請先註冊帳號或是用google登入"
            break;
        case 'auth/wrong-password':
            errCodeZHTW = '密碼錯誤'
            break;
        default:
            errCodeZHTW = errCode;
            errMessageZHTW = errMessage;
            break;
    }
    return {
        errCodeZHTW,
        errMessageZHTW
    }
    // auth/invalid-phone-number, TOO_SHORT
    // auth/invalid-phone-number, TOO_LONG        
    // auth/invalid-verification-code, The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user.        
    // auth/provider-already-linked, User can only be linked to one identity for the given provider.
    // case 'auth/missing-phone-number':
    // case 'auth/too-many-requests':

    //address bug
}