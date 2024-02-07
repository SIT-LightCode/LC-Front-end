import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed, ref } from 'vue'
import { modalSwal } from './Modal.js'
import { connectBackend } from './ConnectBackend.js'
import { Toaster, toast } from 'vue-sonner'
import * as gql from 'gql-query-builder' 
import { useRouter } from 'vue-router'
import { cookieData } from '../stores/CookieData.js'
import { account } from '../stores/Account.js'


export const loginCon = defineStore('loginCon', () => {
  const mymodal = modalSwal()
  const myCookie = cookieData()
  const myconnectBackend = connectBackend()
  const myRouter = useRouter()
  const myAccount = account()
  
  const parseJwt = (token) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  }


  const SignIn = async (email, password) => {
    try {
      const res = await fetch(`http://lightcodedev.sit.kmutt.ac.th:8080/api/v1/auth`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
      if (res.status === 200) {
        const objectJson = await res.json()
        ////
        for (let i in Object.keys(objectJson)) {
          myCookie.setCookie('TokenLightcode', Object.values(objectJson)[i], 7)
        }
        // let jsonFromToken = parseJwt(myCookie.getCookie("token"))
				// myAccount.user.name = setCookie("name", jsonFromToken.name, 7)
				// myAccount.setCookie("role", jsonFromToken.role, 7)
				myAccount.GetUserByEmail()
        toast.success('Login Completed')
        myRouter.push({ name: 'lightcode' })
      } 
    } catch (err) {
      console.log(err)
      toast.success('Error')
    }
  }


  return {  SignIn , parseJwt }
})
