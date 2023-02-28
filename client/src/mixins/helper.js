import { auth } from '@/firebase/config'

export default {
    methods: {
        redirectIfIsNotLogged() {
            auth.onAuthStateChanged(function (user) {
                if (!user) { // not logged in
                    window.location.href = "/";
                }
            })
        },
        redirectIfIsLogged() {
            auth.onAuthStateChanged(function (user) {
                if (!user) { // not logged in
                    window.location.href = "/dashboard";
                }
            })
        },
        clearErrorAndSuccess() {
            this.hide('error');
            this.hide('success');
            this.errorMessage = '';
            this.successMessage = '';
        },
        clearError() {
            this.errorMessage = '';
            this.hide('error');
        },
        showError(errorMessage) {
            this.errorMessage = errorMessage;
            this.show('error');
        },
        showSuccess(successMessage) {
            this.successMessage = successMessage;
            this.show('success');
        },
        show(id) {
            var element = document.getElementById(id);
            element.classList.remove("invisible");
            element.classList.add("visible");
        },
        hide(id) {
            var element = document.getElementById(id);
            element.classList.remove("visible");
            element.classList.add("invisible");
        },
        closeModal() {
            this.dialog = false
            // console.log('close')
        },
    },
};