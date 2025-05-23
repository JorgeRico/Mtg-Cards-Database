import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, type Unsubscribe } from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import router from '../router';
import { useToast } from 'vue-toastification';

const firebaseConfig = {
    apiKey            : import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain        : import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId         : import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket     : import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId : import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId             : import.meta.env.VITE_FIREBASE_APP_ID
};

//initialize the firebase app
initializeApp(firebaseConfig)

//initialize firebase auth
const auth = getAuth()
let unwatchAuthState: Unsubscribe = () => {}

const helpers = {
    watchAuthState() {
        unwatchAuthState = onAuthStateChanged(auth, user => {
            if (!user) {
                router.push({name: 'home'})
            }
        })
        // console.log(unwatchAuthState)
    },
    async login(email: string, password: string) {
        var errorMessage = null;
        const toast      = useToast();

        await signInWithEmailAndPassword(auth, email, password).then(() => {
            router.push({name: 'sets'})

        }).catch(function(error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = 'Wrong Email';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'Wrong User';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Wrong password';
                    break;
                default:
                    errorMessage = 'Too many attempts, try in 1 hour';
                    break;
            }

            toast.error(errorMessage);
        })
    },
    async recover(email: string) {    
        const toast = useToast();
          
        return await sendPasswordResetEmail(auth, email).then(() => {
            toast.success("Check your e-mail to proceed to change your password");

            return true;
        }).catch(function() {
            toast.error('Wrong email');
            
            return false;
        })
    },
    async logout(){
        await signOut(auth).then(() => {
            // Sign-out successful.
            router.push({name: 'home'})
        }).catch((error) => {
            console.log(error)
        });
    },
    async signup(email: string, password: string){
        var errorMessage = null;
        const toast      = useToast();

        return await createUserWithEmailAndPassword(auth, email, password).then(() => {
            toast.success('User created correctly');
            
            return true;
        }).catch(function(error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = 'Wrong Email'
                    break;
                case 'auth/email-already-in-use':
                    errorMessage = 'User already exists';
                    break;
                default:
                    errorMessage = 'System error';
                    break;
            }
            toast.error(errorMessage);
            
            return false;
        })
    }
}

export default helpers