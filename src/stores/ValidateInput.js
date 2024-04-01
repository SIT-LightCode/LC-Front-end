import { defineStore } from 'pinia'
import { modalSwal } from './Modal.js'
import { Toaster, toast } from 'vue-sonner'
import { cookieData } from '../stores/CookieData.js'
import { jwtDecode } from 'jwt-decode'

import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

export const validateInput = defineStore('validateInput', () => {
  
  const validatePassword = (password,status) => {
    if (password != undefined && password != null) {
      let errorNote = ''
      password = password.replace(' ', '')
      if (password.length < 6) {
        errorNote = errorNote + 'Password is too short\n'
      }
    if(status){
      const regexUpperCase = /[A-Z]/;
      const regexLowerCase = /[a-z]/;
      const regexNumber = /\d/;
      if (!(regexUpperCase.test(password))) {
        errorNote = errorNote + 'Password dont has UpperCase\n'
      }
      if (!(regexLowerCase.test(password))) {
        errorNote = errorNote + 'Password dont has LowerCase\n'
      }
      if (!(regexNumber.test(password))) {
        errorNote = errorNote + 'Password dont has Number\n'
      }
    }
      return errorNote
    } else return 'Password is null'
  }

  const validateEmail = (email) => {
    let errorNote = ''
    const regex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )

    let emailVaildate = email.trimStart().trimEnd()
    if (!regex.test(emailVaildate)) {
      errorNote = errorNote + 'Email is invalid \n'
    }

    return errorNote
  }

  const validateNameNull = (name,type) => {
    let errorNote = ''
    let nameVali = name.trimStart().trimEnd()
    if (nameVali == null) {
      errorNote = errorNote + type + ' is null \n'
    }
    if (nameVali == '') {
      errorNote = errorNote + type +' is null \n'
    }
    if (nameVali == undefined) {
      errorNote = errorNote + type +' is undefined \n'
    }
    return errorNote
  }

  const validateAuthorities = (authorities) => {
    let errorNote = ''
    if (authorities.length < 1) {
      errorNote = errorNote + 'User must has authorities \n'
    }
    
    return errorNote
  }
  const validateSameValue = (newvalue, oldvalue) => {
    let errorNote = ''
    if (JSON.stringify(newvalue) === JSON.stringify(oldvalue)) {
      errorNote = errorNote + 'newvalue is the same as oldvalue\n'
    }

    return errorNote
  }
  return {
    validatePassword,
    validateEmail,
    validateNameNull,
    validateAuthorities,
    validateSameValue,
  }
})
