import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp, collection, getDocs } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAsSXSTuYU_ozC6vkJWbywzzPtfN3qe2ic",
    authDomain: "facebook-clone-f2ee2.firebaseapp.com",
    projectId: "facebook-clone-f2ee2",
    storageBucket: "facebook-clone-f2ee2.appspot.com",
    messagingSenderId: "761530286452",
    appId: "1:761530286452:web:f5ad035066b453a6d02c21",
    measurementId: "G-XSWKKJ2SWN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();

const RegisterUser = async (auth, email, password, phone) => {
    let userCredential = await createUserWithEmailAndPassword(auth, email, password);
    let user = userCredential.user;
    await setDoc(doc(db, 'users', user.uid), { email, phone, time: serverTimestamp() });
    return user;

};


const GetAllDocs = async (collectionName) => {
    let res = []
    const collecRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collecRef);
    querySnapshot.forEach((doc) => {
        res.push(doc.data())
    });
    return res;
}

const LoginUser = async (auth, email, password) => {
    let userCredential = await signInWithEmailAndPassword(auth, email, password);
    let user = userCredential.user;
    return user;
};

function UploadFile(file) {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                reject(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );

    })
}

const LogOutUser = async (auth) => {
    await signOut(auth)
    return { message: 'User Logged Out' }
};



export { RegisterUser, LoginUser, LogOutUser, auth, GetAllDocs  , UploadFile};