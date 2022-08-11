import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const createUserDocument = functions.auth.user().onCreate(async (user) => {
    if (user.email) {
        admin.firestore().collection("users").doc(user.uid).set(
            {
                displayName: user.email.split("@")[0],
                displayNameShort: user.email.split("@")[0].slice(0, 8) + "...",
                darkMode: false,
                isPremium: false,
                karma: 0,
                karmaContent: [],
                isWeb3: false,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            }
        );
    } else {
        admin.firestore().collection("users").doc(user.uid).set(
            {
                displayName: user.uid,
                displayNameShort: `${user.uid.slice(0, 4)}...${user.uid.slice(user.uid.length-4)}`,
                darkMode: false,
                isPremium: false,
                karma: 0,
                karmaContent: [],
                isWeb3: true,
                claimedWAG: 0,
                totalWAG: 0,
                wallets: [user.uid],
                nameService: "",
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            }
        )
    }
});