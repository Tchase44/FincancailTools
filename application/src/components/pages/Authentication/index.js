import Axios from 'axios'
import router from '@/router'
// save target url
const BudgetManagerAPI = `http://${window.location.hostname}:3001`;
/* eslint-diable */
export default {
    user: {authenticated: false},
// context = Vue Component
// credentials = username/password
// redirect = router path
    authenticate(context, credentials, redirect) {
        Axios.post(`${BudgetManagerAPI}/api/v1/auth`, credentials)
            .then(({ data }) => {
                context.$cookie.set('token', data.token, '1D')
                context.$cookie.set('user_id', data.user._id, '1D')
                context.validLogin = true

                this.user.authenticated = true

                if (redirect) router.push(redirect)
            }).catch(({ response: { data } }) => {
                context.snackbar = true
                context.message = data.message
            })
    },
    signup(context, credentials, redirect) {
        Axios.post(`${BudgetManagerAPI}/api/v1/signup`, credentials)
            .then(() => {
                context.validSignUp = true
                this.authenticate(context, credentials, redirect)
                
            }).catch(({ response: { data } }) => {
                context.snackbar = true
                context.message = data.message
            })
    },
    signout(context, redirect) {
        context.$cookie.delete('token')
        context.$cookie.delete('user_id')
        this.user.authenticated = false

        if (redirect) router.push(redirect)
    },
    checkAuthentication(){
        const token = document.cookie
        this.user.authenticated = !!token
        // if(token) this.user.authenticated = true
        // else this.user.authenticated = false
    },
    getAuthenticationHeader(context){
        return `Bearer ${context.$cookie.get('token')}`
    }
}
