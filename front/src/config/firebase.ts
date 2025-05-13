import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
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

const helpers = {
    async login(email: string, password: string) {
        var errorMessage = null;
        const toast      = useToast();

        await signInWithEmailAndPassword(auth, email, password).then((response) => {
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
            console.log('error')
            toast.error(errorMessage);
        })
    },
    async recover(email: string) {    
        const toast = useToast();
          
        await sendPasswordResetEmail(auth, email).then((response) => {
            // context.commit('successMessage', 'Recibirás un email con las instrucciones para cambiar tu contraseña');
            console.log('Send recover password success')
            toast.success("Check your e-mail to proceed to change your password");
        }).catch(function(error) {
            toast.error('Wrong email');
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

        await createUserWithEmailAndPassword(auth, email, password).then((response) => {
            // context.commit('successMessage', 'User created correctly');
            toast.success('User created correctly');
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
        })
    }
}

export default helpers