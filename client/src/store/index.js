import { createStore } from 'vuex'
import router from "@/router";
// Firebase imports
import { auth } from '@/firebase/config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth'

const store = createStore({
    state: {
        // The user state will initially be null. After login, this state will be updated
        user: null
    },
    mutations: {
        // Mutation to update the user state
        // Takes in two arguments, the state and the payload. When we call this mutation, the payload will be user object from firebase auth
        // When the user logs out, we call the mutation and the payload will be null
        setUser(state, payload) {
            state.user = payload
            // Log out the user state
            // console.log(state.user)
        },
        errorMessage(state, payload) {
            state.errorMessage = payload
        },
        successMessage(state, payload) {
            state.successMessage = payload
        }
    },
    actions: {
        async signup(context, { email, password }){
            var errorMessage = null;
            
            await createUserWithEmailAndPassword(auth, email, password)
            .then((response) => {
                context.commit('successMessage', 'User created correctly');
                // console.log('register success')
            }).catch(function(error) {
                switch (error.code) {
                    case 'auth/invalid-email':
                        errorMessage = 'Wrong Email'
                        break
                    case 'auth/email-already-in-use':
                        errorMessage = 'User already exists';
                        break
                    default:
                        errorMessage = 'System error';
                        break
                }

                context.commit('errorMessage', errorMessage)
            })
        },
        async login(context, { email, password }) {
            var errorMessage = null;
            
            await signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                context.commit('setUser', response.user)
                // console.log('login success')
            }).catch(function(error) {
                switch (error.code) {
                    case 'auth/invalid-email':
                        errorMessage = 'Wrong Email';
                        break
                    case 'auth/user-not-found':
                        errorMessage = 'Wrong User';
                        break
                    case 'auth/wrong-password':
                        errorMessage = 'Wrong password';
                        break
                    default:
                        errorMessage = 'Too many attempts, try in 1 hour';
                        break
                }

                context.commit('errorMessage', errorMessage)
            })
        },
        async recover(context, { email }) {
            var errorMessage = null;
            
            await sendPasswordResetEmail(auth, email)
            .then((response) => {
                context.commit('successMessage', 'Recibirás un email con las instrucciones para cambiar tu contraseña');
                // console.log('Send recover password success')
            }).catch(function(error) {
                errorMessage = 'Wrong Email';
                context.commit('errorMessage', errorMessage)
            })
        },
        async logout(context){
            // firebase signout
            await signOut(auth)
            // Destroy user
            context.commit('setUser', null)
            // Redirecto to home
            router.push('/')
        }
    }
})

// export the store
export default store