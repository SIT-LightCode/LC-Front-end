import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed, ref } from 'vue'
import { modalSwal } from './Modal.js'
import { connectBackend } from './ConnectBackend.js'
import { Toaster, toast } from 'vue-sonner'
import * as gql from 'gql-query-builder'
import { useRouter } from 'vue-router'
import { cookieData } from '../stores/CookieData.js'
import { jwtDecode } from 'jwt-decode'
import { validateInput } from './ValidateInput.js'

export const account = defineStore('account', () => {
  const mymodal = modalSwal()
  const myCookie = cookieData()
  const myconnectBackend = connectBackend()
  const myRouter = useRouter()
  const myVaildate = validateInput()

  const user = ref({ id: null, name: '', email: '', authorities: [], score: 0 })
  const userList = ref({})

  // const user = ref({name:'',role:'User'})
  const AddAccount = async (nameAccount, emailAccount, passwordAccount) => {
    let errorValidate =
      myVaildate.validateNameNull(nameAccount) +
      myVaildate.validateEmail(emailAccount) +
      myVaildate.validatePassword(passwordAccount)
    if (errorValidate != '') {
      toast.error(errorValidate)
      return "error"
    } else {
      const query = gql.mutation(
        {
          operation: 'upsertUser',
          variables: {
            id: { type: 'Int', value: null },
            authorities: { value: 'USER' },
            name: { value: nameAccount.trimStart().trimEnd() },
            email: { value: emailAccount.trimStart().trimEnd() },
            password: { value: passwordAccount.trimStart().trimEnd() },
          },
          fields: ['id', 'name', 'email'],
        },
        undefined,
        {
          operationName: 'UpsertUser ',
        },
      )

      myconnectBackend.connectBack(query).then(async (data) => {
        if (data != '') {
          toast.success('Create user completed')
        } 
      })
    }
  }

  const EditAccount = async (editUser,olddata) => {
    let errorValidate =
      myVaildate.validateNameNull(editUser.name) +
      myVaildate.validateEmail(editUser.email) +
      myVaildate.validateAuthorities(editUser.authorities)+
      myVaildate.validateSameValue(editUser,olddata)
    if (errorValidate != '') {
      toast.error(errorValidate)
    } else {
      const query = gql.mutation(
        {
          operation: 'upsertUser',
          variables: {
            id: { type: 'Int', value: editUser.id },
            authorities: { value: `${editUser.authorities}` },
            name: { value: editUser.name.trimStart().trimEnd()  },
            email: { value: editUser.email.trimStart().trimEnd() },
          },
          fields: ['id', 'authorities', 'name', 'email'],
        },
        undefined,
        {
          operationName: 'UpsertUser ',
        },
      )

      myconnectBackend.connectBack(query).then(async (data) => {
        if (data != '') {
          toast.success('edit user completed')
          GetUserByEmail()
          GetUser()
        } 
      })
    }
  }

  const GetUserByEmail = async () => {
    let jsonFromToken = jwtDecode(myCookie.getCookie('TokenLightcode'))
    const query = gql.query(
      {
        operation: 'getUserByEmail ',
        variables: {
          email: { value: jsonFromToken.sub },
        },
        fields: ['id', 'name', 'email', 'authorities', 'score'],
      },
      undefined,
      {
        operationName: 'GetUserByEmail ',
      },
    )

    myconnectBackend.connectBack(query).then(async (data) => {
      if (data != '') {
        user.value = data.data.getUserByEmail
      } 
    })
  }

  const GetUser = async () => {
    const query = gql.query(
      {
        operation: 'getUser',
        fields: ['id', 'name', 'email', 'authorities', 'score'],
      },
      undefined,
      {
        operationName: 'GetUser',
      },
    )

    myconnectBackend.connectBack(query).then(async (data) => {
      if (data != '') {
        userList.value = data['data']['getUser']
      }
    })
  }
  const DeteleUser = async (id) => {
    const query = gql.mutation(
      {
        operation: 'removeUser',
        variables: {
          id: { type: 'Int!', value: id },
        },
      },
      undefined,
      {
        operationName: 'RemoveUser',
      },
    )
    myconnectBackend.connectBack(query).then(async (data) => {
      if (data != '') {
        GetUser()
        toast.success('User has been deleted')
        //mymodal.modalNormal('Deleted!', 'This Content has been deleted.', 'success')
      }
    })
  }
  return { user, EditAccount, AddAccount, GetUserByEmail, GetUser, userList, DeteleUser }
})
