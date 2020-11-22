var admin = require('firebase-admin');
//Firebase 服務帳戶
//firebase-adminsdk-tp6g4@ming1-d8ff5.iam.gserviceaccount.com

//產生金鑰
//https://console.firebase.google.com/u/0/project/ming1-d8ff5/settings/serviceaccounts/adminsdk
//private key
//var serviceAccount = require("path/to/serviceAccountKey.json");
//key json
var serviceAccount = require("../../../adminKeys/serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ming1-d8ff5.firebaseio.com"
});

//var email_KT = 'tristan829@gmail.com';
var email_KT = 'ice4kimo@yahoo.com.tw';
var user_id;
var bb = admin.auth().getUserByEmail(email_KT)
    .then(function (userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        //console.log('Successfully fetched user data:', userRecord.toJSON());
        console.log(`user id = ${userRecord.uid}`);
        //user_id = userRecord.uid;
        //console.log(userRecord.uid);
        DeleteUser(userRecord.uid);

    })
    .catch(function (error) {
        console.log(`Error Code = ${error.code}`);
        process.exit(1);//To exit with a 'failure' code:
        //console.log('Error fetching user data:', error);
    });
//console.log(bb)
//-------------Delete a user
// https://firebase.google.com/docs/auth/admin/manage-users
function DeleteUser(in_uid) {
    admin.auth().deleteUser(in_uid)
        .then(function () {
            console.log('Successfully deleted user');
            process.exit(0);//success and exit
        })
        .catch(function (error) {
            console.log('Error deleting user:', error);
        });
}