import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore"
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyAX1G9s018jmltX0MzqOlwmRP8Ni7hBNac",
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

export {auth,db,signup,signin,signout};