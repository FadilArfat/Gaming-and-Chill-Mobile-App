import {initializeApp, getApps, getApp} from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  doc,
  getFirestore,
  initializeFirestore,
  setDoc,
} from 'firebase/firestore';

const firebaseConfig = {}; //ADD YOUR OWN FIREBASE CONFIG

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

const mapAuthCodeToMessage = authCode => {
  switch (authCode) {
    case 'auth/invalid-password':
      return alert('Password provided is not corrected');

    case 'auth/invalid-email':
      return alert('Email provided is invalid');

    case 'auth/weak-password':
      return alert('Password should be at least 6 characters');

    case 'auth/email-already-exists':
      return alert('Email already exist');

    case 'auth/internal-error':
      return alert('Server error, please try again');

    case 'auth/user-not-found':
      return alert('User not found');

    case 'auth/wrong-password':
      return alert('Wrong password');

    case 'auth/email-already-in-use':
      return alert('Email already in use!');

    default:
      return '';
  }
};

const registerDenganEmailDanPassword = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
    console.log('Error code auth', err.code);
    console.log('Error msg auth', err.message);
    mapAuthCodeToMessage(err.code);
  }
};

const loginDenganEmailDanPassword = async (email, password) => {
  try {
    const userYangLogin = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    console.log('user yang login adalah', userYangLogin.user);
  } catch (err) {
    console.log(err);
    console.log('Error code auth', err.code);
    console.log('Error msg auth', err.message);
    mapAuthCodeToMessage(err.code);
  }
};
const resetPassword = async email => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert(`Email send to ${email}, Check your spam folder!`);
  } catch (err) {
    console.log(err);
    console.log('Error code auth', err.code);
    console.log('Error msg auth', err.message);
    mapAuthCodeToMessage(err.code);
  }
};

const keluarDariAplikasi = async () => {
  try {
    await signOut(auth);
    console.log('user logout');
  } catch (err) {
    console.log(err);
    console.log('Error code auth', err.code);
    console.log('Error msg auth', err.message);
  }
};

export {
  auth,
  db,
  app,
  registerDenganEmailDanPassword,
  loginDenganEmailDanPassword,
  resetPassword,
  keluarDariAplikasi,
};
