import Head from "next/head";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  AuthProvider,
  FirebaseAppProvider,
  FirestoreProvider,
  StorageProvider,
  useFirebaseApp,
} from "reactfire";
import { firebaseConfig } from "../firebase.config";
import { getStorage } from "firebase/storage";

import { CssBaseline } from "@mui/material";

function FirebaseSDKProviders({ children }) {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const storage = getStorage(app);

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <StorageProvider sdk={storage}>{children}</StorageProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Guilds</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="Get working" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <FirebaseSDKProviders>
          <CssBaseline />
          <Component {...pageProps} />
        </FirebaseSDKProviders>
      </FirebaseAppProvider>
    </>
  );
}

export default MyApp;
