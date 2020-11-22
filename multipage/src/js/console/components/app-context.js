import React from 'react'


export const themes = {
    light: {
        foreground: '#000000',
        background: '#eeeeee',
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
    },
};


class AppContextClass {
    constructor() {
        
        this.theme = themes.dark
    }
    toggleTheme2 = (e) => {
        
    }
    
    // *** Auth API ***
    // doCreateUserWithEmailAndPassword = (email, password) =>
    // this.auth.createUserWithEmailAndPassword(email, password);
}

let newApp_Instance = new AppContextClass();
var AppContext = React.createContext(
    newApp_Instance,
    // {
    // theme: themes.dark,//default value
    // //you can pass a function down through the 
    // //context to allow consumers to update the context:
    // toggleTheme: () => { }, 
    // }
    //theme: themes.dark,//default value
);

// export const ThemeContext = React.createContext({
//     theme: themes.dark,//default value
//     //you can pass a function down through the 
//     //context to allow consumers to update the context:
//     toggleTheme: () => { }, 
// });

export default AppContext;
AppContext.displayName = "AppContext";