import { defineStore } from 'pinia'
import { modalSwal } from './Modal.js'
import { Toaster, toast } from 'vue-sonner'
import { cookieData } from '../stores/CookieData.js'
import { jwtDecode } from 'jwt-decode'
import { account } from '../stores/Account.js'

import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

export const connectBackend = defineStore('connectBackend', () => {
  const myCookie = cookieData()
  const myRouter = useRouter()
  const inhours = 1 / 24
  const myAccount = account()
  const refreshToken = async () => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/v1/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: myCookie.getCookie('refreshToken'),
      }),
    })
    const objectJson = await res.json()
    if (res.status === 200) {
      Cookies.set('TokenLightcode', objectJson.token, { httpOnly: false, expires: inhours })
      myAccount.GetUser()
    } else if (res.status == 400 || res.status == 500 || res.status == 401) {
      Cookies.remove('refreshToken')
      Cookies.remove('TokenLightcode')
    }
  }

  const connectBack = async (querys) => {
    if (myCookie.getCookie('TokenLightcode') == '') {
      refreshToken()
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: myCookie.getCookie('TokenLightcode'),
        },
        body: JSON.stringify({
          query: querys.query,
          variables: querys.variables,
        }),
      })

      let data = await res.json()
      if (res.ok) {
        let errortext = ''
        for (let e in data) {
          if (e == 'errors') {
            errortext = errortext + data.errors[0].message
          }
        }
        if (errortext == '') {
          return data
        } else {
          // if(errortext == ''){

          // }

          toast.error(errortext)
          return ''
        }
      } else if (res.status == 400 || res.status == 500 || res.status == 401) {
        toast.error(data['errors'].message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
      return ''
    }
  }

  return { connectBack }
})
