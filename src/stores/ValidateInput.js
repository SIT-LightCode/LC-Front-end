import { defineStore } from 'pinia'
import { modalSwal } from './Modal.js'
import { Toaster, toast } from 'vue-sonner'
import { cookieData } from '../stores/CookieData.js'
import { jwtDecode } from 'jwt-decode'

import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

export const validateInput = defineStore('validateInput', () => {
  const validatePassword = (password) => {
    if (password != undefined && password != null) {
      let errorNote = ''
      password = password.replace(' ', '')
      if (password.length < 4) {
        errorNote = errorNote + 'Password is too short\n'
      }
      if (password.length > 10) {
        errorNote = errorNote + 'Password is too long\n'
      }
      return errorNote
    } else return 'Password is null'
  }

  const validateEmail = (email) => {
    let errorNote = ''
    const regex = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    )

    let emailVaildate = email.trimStart().trimEnd()
    if ( !(regex.test(emailVaildate))) {
      errorNote = errorNote + 'Email is invalid \n'
    }

    return errorNote
  }

  const validateNameNull = (name) => {
    let errorNote = ''
    let nameVali = name.trimStart().trimEnd()
    if (nameVali == null) {
      errorNote = errorNote + 'name is null \n'
    }
    if (nameVali == '') {
      errorNote = errorNote + 'name is null \n'
    }
    if (nameVali == undefined) {
      errorNote = errorNote + 'name is undefined \n'
    }
    return errorNote
  }

  const validateAuthorities = (authorities) => {
    let errorNote = ''
    if (authorities.length > 0) {
      errorNote = errorNote + 'User must has authorities \n'
    }

    if (authorities.includes('USER')) {
      errorNote = errorNote + ' User must has USER \n'
    }
    return errorNote
  }

  return { validatePassword, validateEmail, validateNameNull, validateAuthorities }
})
