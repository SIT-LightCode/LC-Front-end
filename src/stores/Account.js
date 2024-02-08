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
      if(data != ""){
        console.log(data)
        toast.success('Create user completed')
      }
      else toast.error('Error')

    })
  }

  const EditAccount = async (nameAccount, emailAccount) => {
    const query = gql.mutation(
      {
        operation: 'upsertUser',
        variables: {
          id: { type: 'Int', value: user.value.id },
          authorities: { value: user.value.authorities },
          name: { value: nameAccount },
          email: { value: emailAccount },
        },
        fields: ['id', 'authorities', 'name', 'email'],
      },
      undefined,
      {
        operationName: 'UpsertUser ',
      },
    )

    myconnectBackend.connectBack(query).then(async (data) => {
      toast.success('edit user completed')
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
      user.value = data.data.getUserByEmail
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
  return { user, EditAccount, AddAccount, GetUserByEmail , GetUser, userList,DeteleUser}
})
