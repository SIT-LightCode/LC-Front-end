import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed, ref } from 'vue'
import { modalSwal } from './Modal.js'
import { connectBackend } from './ConnectBackend.js'
import { Toaster, toast } from 'vue-sonner'
import * as gql from 'gql-query-builder'
import { useRouter } from 'vue-router'
import { cookieData } from '../stores/CookieData.js'
import { account } from '../stores/Account.js'
import Cookies from 'js-cookie'
import { validateInput } from './ValidateInput.js'
export const loginCon = defineStore('loginCon', () => {
  const mymodal = modalSwal()
  const myCookie = cookieData()
  const myconnectBackend = connectBackend()
  const myRouter = useRouter()
  const myAccount = account()
  const myVaildate = validateInput()
  const parseJwt = (token) => {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join(''),
    )
    return JSON.parse(jsonPayload)
  }

  const SignIn = async (email, password) => {
    // let errorValidate = myVaildate.validateEmail(email) + myVaildate.validatePassword(password)
    // if (errorValidate != '') {
    //   toast.error(errorValidate)
    // } else {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/v1/auth/login`, {
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
        Cookies.set('refreshToken', objectJson.refreshToken, { httpOnly: false, expires: 7 })
        ////
        Cookies.set('TokenLightcode', objectJson.token, { httpOnly: false, expires: 7 })

        // let jsonFromToken = parseJwt(myCookie.getCookie("token"))
        // myAccount.user.name = setCookie("name", jsonFromToken.name, 7)
        // myAccount.setCookie("role", jsonFromToken.role, 7)

        myAccount.GetUserByEmail()
        toast.success('Login Completed')
        myRouter.push({ name: 'lightcode' })
      } else if (res.status == 400 ) {
        const objectJson = await res.json()
        toast.error(objectJson.errors[0].message)
      } else if (res.status == 401 || res.status ==500) {
        toast.error('Invalid password')
      }
    } catch (err) {
      console.log(err)
      toast.error(err)
    }
    //}
  }
  const logout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/v1/auth/logout`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          token: Cookies.get('TokenLightcode'),
          refreshToken: Cookies.get('refreshToken'),
        }),
      })
      if (res.status === 200) {
        Cookies.remove('refreshToken', { path: '/' })
        Cookies.remove('TokenLightcode', { path: '/' })

        myRouter.push({ name: 'home' })

        toast.success('Logout Completed')
      }
    } catch (err) {
      console.log(err)
      toast.success('Error')
    }
  }

  return { SignIn, parseJwt, logout }
})
