import { defineStore } from 'pinia'
import { modalSwal } from './Modal.js'
import { Toaster, toast } from 'vue-sonner'
import { cookieData } from '../stores/CookieData.js'

export const connectBackend = defineStore('connectBackend', () => {
  const myCookie = cookieData()
  
  const connectBack = async (querys) => {
    let token = ""
    if(myCookie.getCookie("TokenLightcode") != "") {
      token = myCookie.getCookie("TokenLightcode")
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
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
          toast.error('An error occured!')
          // mymodal.modalNormal("Error!", "response : " + errortext, "error");
          return ''
        }
      }
    } catch (error) {
      console.log(error)
      toast.error('An error when try to get data!')
      // mymodal.modalNormal('Error!', 'Error:' + error, 'error')
      // console.error('Error:', error)
      return ''
    }
  }

  return { connectBack }
})
