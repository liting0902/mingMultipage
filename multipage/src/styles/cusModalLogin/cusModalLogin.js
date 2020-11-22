export default class cusModalLogin extends HTMLElement {
    constructor(templateContent, events) {
        super();
        // assign firebase
        this.firebase = null;
        this.db = null
        if (firebase)
            this.setFirebase(firebase)

        this.events = {
            onSwitchForgetPassword: function () {

            },
            onSwitchRegister: function () {

            }
        }
        // initial templateContent
        if (templateContent)
            this.appendTemplate(templateContent);
        // initial this.events
        if (events)
            this.setEvents(events);
        //var template = document.getElementById('loginTemplate');


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
        //--------- inside functions
        this.btnGoogleLogin = this.querySelector('#btnGoogleLogin')
        this.btnGoogleLogin.addEventListener('click', this.Google_Register_Login.bind(this));
        $(this).on('shown.bs.modal', function () {
            $('#iptEmail').trigger('focus')
            //console.log('AAAA')
        })
        //--------- outter connect interface
        this.modalLogin_Register = this.querySelector('#modalLogin_Register');
        this.modalLogin_forgetPwd = this.querySelector('#modalLogin_forgetPwd');
        // add click events
        this.modalLogin_Register.addEventListener('click', (e) => {
            this.events.onSwitchRegister();
        })
        this.modalLogin_forgetPwd.addEventListener('click', (e) => {
            this.events.onSwitchForgetPassword();
        })


    }
    appendTestArea(htmlElement) {
        let testArea = this.querySelector('[testArea]');
        testArea.appendChild(htmlElement)
        //console.log(aa)
    }
    setEvents(events) {
        this.events = events;
    }
    setFirebase(inFirebase) {
        // console.log('setFirebase')
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
            console.log('setAuth_getRedirectResult--', result)
            // The signed-in user info.
            let user = result.user;
            if (user) {
                console.log('user sign in')
                let info = self.getUserInfo(user);
                //check if user exists
                self.getDbUser(info.uid)
                    .then((dbUser) => {
                        if (dbUser.exists === false) {
                            self.SetUserData(info)
                            console.log('create new user --')
                        } else
                            console.log('user existed before.')
                    })
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

        let options = {
            show: isShow,
            focus: true,
            keyboard: true
        }
        let strShow = null;
        if (isShow == true)
            strShow = 'show';
        else
            strShow = 'hide'
        $('#modalLogin').modal(strShow)
        //console.log($('#modalLogin'))
    }
    Google_Register_Login() {
        var self = this;
        var provider = new this.firebase.auth.GoogleAuthProvider();
        this.firebase.auth().signInWithRedirect(provider);
        return;
        console.log('error!! this line should not be executed.')
        //signInWithRedirect
        //firebase.auth().signInWithPopup(provider).then(function (result) {
        this.firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            //console.log('signInWithPopup')
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            let info = self.getUserInfo(user);
            //check if user exists
            self.getDbUser(info.uid)
                .then((dbUser) => {
                    if (dbUser.exists === false)
                        self.SetUserData(info)
                    else
                        console.log('user existed before.')
                })

            //console.log('info---------', info)

            // hide self element
            self.showModal(false)
            //console.log('user info === ', info)
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
    SetUserData(userInfo) {
        this.db.collection('Users').doc(userInfo.uid).set(userInfo, {
                merge: true
            })
            .then(() => {
                console.log('SetUserData OK:')
            })
            .catch((err) => {
                console.log('SetUserData ERROR:', err)
            });
    }
    getDbUser(uid) {
        return this.db.collection('Users').doc(uid).get()
            .then((querySnapshot) => {
                let user = {
                    exists: querySnapshot.exists,
                    doc: querySnapshot.data()
                }
                return user
            })
    }
    getUserInfo(user) {
        let dispalyName = null;
        if (user.dispalyName === undefined)
            dispalyName = null;
        else
            dispalyName = user.dispalyName;

        let info = {
            dispalyName: dispalyName,
            email: user.email,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            uid: user.uid,
            providerId: user.providerData[0].providerId,
            // providerId:u.user.photoURL,
            // providerId:u.user.photoURL,

        }

        return info
    }
    connectedCallback() {
        //console.log('Custom square element added to page.');
        //updateStyle(this);
    }

    disconnectedCallback() {
        //console.log('Custom square element removed from page.');
    }

    adoptedCallback() {
        //console.log('Custom square element moved to new page.');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        //console.log('Custom square element attributes changed.');
        //updateStyle(this);
    }

    // assign(){
    //     console.log('assign`````')
    // }
}