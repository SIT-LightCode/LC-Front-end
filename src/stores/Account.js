import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed, ref } from 'vue'
import { modalSwal } from './Modal.js'
import { connectBackend } from './ConnectBackend.js'
import { Toaster, toast } from 'vue-sonner'
import * as gql from 'gql-query-builder'
import { useRouter } from 'vue-router'
import { cookieData } from '../stores/CookieData.js'
import { jwtDecode } from 'jwt-decode'

export const account = defineStore('account', () => {
  const mymodal = modalSwal()
  const myCookie = cookieData()
  const myconnectBackend = connectBackend()
  const myRouter = useRouter()

  const user = ref([])
  const userList = ref({})

  // const user = ref({name:'',role:'User'})
  const AddAccount = async (nameAccount, emailAccount, passwordAccount) => {
    const query = gql.mutation(
      {
        operation: 'upsertUser',
        variables: {
          id: { type: 'Int', value: null },
          authorities: { value: 'USER' },
          name: { value: nameAccount },
          email: { value: emailAccount },
          password: { value: passwordAccount },
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
      } else toast.error('Error')
    })
  }

  const EditAccount = async (editUser) => {
    const query = gql.mutation(
      {
        operation: 'upsertUser',
        variables: {
          id: { type: 'Int', value: editUser.id },
          authorities: { value: `${editUser.authorities}` },
          name: { value: editUser.name },
          email: { value: editUser.email },
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
        console.log(data.data.upsertUser)
        toast.success('edit user completed')
        user.value = data.data.upsertUser
      } else {
        toast.error('Error')
      }
    })
  }

  const GetUserByEmail = async () => {
    let jsonFromToken = jwtDecode(myCookie.getCookie('TokenLightcode'))
    const query = gql.query(
      {
        operation: 'getUserByEmail ',
        variables: {
          email: { value: jsonFromToken.sub },
        },
        fields: ['id', 'name', 'email', 'authorities'],
      },
      undefined,
      {
        operationName: 'GetUserByEmail ',
      },
    )

    myconnectBackend.connectBack(query).then(async (data) => {
      if (data != '') {
        user.value = data.data.getUserByEmail
      } else toast.error('Error')
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
    const query = gql.query(
      {
        operation: 'removeUserById',
        variables: {
          id: { type: 'Int!', value: id },
        },
      },
      undefined,
      {
        operationName: 'RemoveUserById',
      },
    )
      console.log(query)
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
