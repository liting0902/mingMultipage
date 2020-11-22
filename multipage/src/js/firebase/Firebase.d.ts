//@ts-check
import Swal from 'sweetalert2'
import firebase from 'firebase/app';
import firestore from 'firebase/firestore'

//declare const aa:typeof firebase;

//import Firebase from './Firebase'
export declare function Email_ResendPassword(
    emailAddress: string,
    inFirebase: typeof firebase,
    swal: typeof Swal,
    funcCloseModal: Function);


// /**
//  * @function sync auth.currentUser.emailVerified to firestore.Users.emailVerified
//  * @param emailVerified_FromAuth
//  * @param uid
//  * @param firestore firebase.firestore()
//  */
//export declare function syncEmailVerified_ToDB(emailVerified_FromAuth: boolean, uid: string, firestore: any):void;