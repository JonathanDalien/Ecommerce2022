import * as firebaseAdmin from 'firebase-admin';
if(!firebaseAdmin.apps.length){
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
          privateKey: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY
          ? process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/gm, "\n")
          : undefined,
          clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
          projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        }),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      });
    }

    export { firebaseAdmin };