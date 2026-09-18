import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore"
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
  authDomain: "netflix-clone-1644e.firebaseapp.com",
  projectId: "netflix-clone-1644e",
  storageBucket: "netflix-clone-1644e.firebasestorage.app",
  messagingSenderId: "11247060451",
  appId: "1:11247060451:web:67ae51a2da0825c8bc8cd6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const signup = async (name,email,password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider : "local",
            email,
        })
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const signin = async(email,password) => {
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const signout = () => {
    signOut(auth);
}

const resetPassword = async(email) => {
    try{
        await sendPasswordResetEmail(auth,email);
        toast.success("Password reset link sent to your email");
        return true;
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
        return false;
    }
}   
export {auth,db,signup,signin,signout,resetPassword};