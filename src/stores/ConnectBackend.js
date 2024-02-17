import { defineStore } from 'pinia'
import { modalSwal } from './Modal.js'
import { Toaster, toast } from 'vue-sonner'
import { cookieData } from '../stores/CookieData.js'
import { jwtDecode } from 'jwt-decode'

import { useRouter } from 'vue-router'
import Cookies from 'js-cookie';

export const connectBackend = defineStore('connectBackend', () => {
  const myCookie = cookieData()
  const myRouter =useRouter()
 
  const refreshToken = () => {

  }
 
 
 
  const connectBack = async (querys) => {
    let token = ""
    if(myCookie.getCookie("TokenLightcode") != "") {
        const jwtPayload = jwtDecode(myCookie.getCookie("TokenLightcode"));
        const d = new Date();

        if (jwtPayload.exp < d.getTime()/1000) {

            myCookie.setCookie("TokenLightcode","")
            myRouter.push({ name: 'login' })
            return ''

        } else token = myCookie.getCookie("TokenLightcode") 
    }
    

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
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
            for (let err in data[e]) {
              errortext = errortext + data[e][err].message + '\n'
            }
          }
        }
        if (errortext == '') {
          return data
        } else {
          toast.error(errortext)
          // mymodal.modalNormal("Error!", "response : " + errortext, "error");
          return ''
        }
      }
      else if(res.status == 401) {
        toast.error('error ')
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
      // mymodal.modalNormal('Error!', 'Error:' + error, 'error')
      // console.error('Error:', error)
      return ''
    }
  }

  return { connectBack }
})
