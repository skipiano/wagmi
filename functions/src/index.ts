import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const createUserDocument = functions.auth.user().onCreate(async (user) => {
    if (user.email) {
        admin.firestore().collection("users").doc(user.uid).set(
            {
                displayName: user.email.split("@")[0],
                darkMode: false,
                isPremium: false,
                karma: 0,
                karmaContent: [],
                isWeb3: false,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                claimedWAG: 0,
                totalWAG: 0,
                wallets: [],
                nameService: ""
            }
        );
    }
});