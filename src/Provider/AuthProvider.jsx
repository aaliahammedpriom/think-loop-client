import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../../firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [toggle ,setToggle] = useState(false)
    const [announcementsLength, setAnnouncementsLength] = useState(0);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();


    const handleGoogleSignInWithPopup = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const handleSignInWithEmailAndPassword = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)

    }

    const handleCreateUserWithEmailAndPassword = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const handleUpdateProfile = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const handleSignOut = () => {
        setLoading(true)
        return signOut(auth)
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            // console.log(currentUser.email);
            setUser(currentUser);
            if(currentUser){
                // get token and store
                const userInfo ={email: currentUser.email}
                axiosPublic.post('/jwt',userInfo)
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('access_token',res.data.token )
                    }
                })
            }
            else{
                localStorage.removeItem('access_token')
            }
            setLoading(false);
        })
        return () => {
            return unsubscribe();
        }

    }, [axiosPublic])

    const authInfo = {
        user,
        loading,
        toggle,
        setToggle,
        handleGoogleSignInWithPopup,
        handleSignInWithEmailAndPassword,
        handleCreateUserWithEmailAndPassword,
        handleUpdateProfile,
        handleSignOut,
        announcementsLength,
        setAnnouncementsLength
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;