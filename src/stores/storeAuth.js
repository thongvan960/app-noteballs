import { defineStore } from 'pinia'
import { auth } from '@/js/firebase'
import { 
    createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
    onAuthStateChanged 
} from 'firebase/auth';

import { useStoreNotes } from '@/stores/storeNotes'


export const useStoreAuth = defineStore('storeAuth', {
    // State
    state: () => {
        return {
            user: {},
        }
    },
    // End state

    // Action
    actions: {
        // Get the currently signed-in user
        init() {
            const storeNotes = useStoreNotes()

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.user.id = user.uid
                    this.user.email = user.email
                    this.router.push('/')
                    storeNotes.init()
                } else {
                    this.user = {}
                    this.router.replace('/auth')
                    storeNotes.clearNotes()               
                }
            });
        },

        // Register
        registerUser(credentials) {
           
            createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                alert('Congratulations, you have successfully registered an account')
            })
            .catch((error) => {
                const errorMessage = error.message;
            });
        },

        // Login User
        loginUser(credentials) {
            signInWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                const user = userCredential.user;

            })
            .catch((error) => {
                const errorMessage = error.message;
            });
        },

        // Logout User
        logoutUser() {
            signOut(auth).then(() => {
                //console.log('Sign-out successful.');
              }).catch((error) => {
                //console.log(error.message);
              });
        }
    }
})