
export default class extends HTMLElement{
    /**
     * 
     * @param {string} emailAddress 
     * @param {object} ENUM_switchPage from cusModalLogin.js
     */
    Email_ResendPassword(emailAddress, ENUM_switchPage) {
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
}