import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed, ref } from 'vue'
import { modalSwal } from './Modal.js'
import { connectBackend } from './ConnectBackend.js'
import { Toaster, toast } from 'vue-sonner'
import * as gql from 'gql-query-builder'
import { useRouter, useRoute } from 'vue-router'
import { cookieData } from './CookieData.js'
import { jwtDecode } from 'jwt-decode'
import { validateInput } from './ValidateInput.js'
import { loginCon } from './LoginCon.js'
import { problemCon } from './ProblemCon.js'
import { learningCon } from './LearningCon'

export const account = defineStore('account', () => {
  const mymodal = modalSwal()
  const myCookie = cookieData()
  const myconnectBackend = connectBackend()
  const myRouter = useRouter()
  const route = useRoute()
  const myLogin = loginCon()
  const myVaildate = validateInput()
  const myProblem = problemCon()
  const myLearning = learningCon()
  const user = ref({
    id: null,
    name: '',
    email: '',
    authorities: [],
    score: 0,
    scoreUnOfficial: 0,
    skills: [],
  })
  // {"id":852,"name":"testadmin","email":"admin@mail.com","authorities":["USER","ADMIN"],"score":300,"scoreUnOfficial":300,
  // "skills":[{"id":1,"level":4,"tag":{"id":2,"topic":"Variables"}},{"id":2,"level":1,"tag":{"id":5,"topic":"Data Structure"}}]}
  const userList = ref({})
  const scoreboard = ref({})

  const AddAccount = async (nameAccount, emailAccount, passwordAccount) => {
    let errorValidate =
      myVaildate.validateNameNull(nameAccount, 'name') +
      myVaildate.validateEmail(emailAccount) +
      myVaildate.validatePassword(passwordAccount, true)
    if (errorValidate != '') {
      toast.error(errorValidate)
      return 'error'
    } else {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/v1/auth/register`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            name: nameAccount,
            email: emailAccount,
            password: passwordAccount,
          }),
        })
        if (res.status === 201) {
          const objectJson = await res.json()

          if (objectJson.data != '') {
            toast.success('Create user completed')
            await myLogin.SignIn(emailAccount, passwordAccount, true).then(() => {
              return true
            })
          }
        } else if (res.status == 400) {
          const objectJson = await res.json()
          toast.error(objectJson.errors[0].message)
          return true
        }
      } catch (err) {
        console.log(err)
        toast.error('Error from server')
        return true
      }
    }
  }
  const EditAccount = async (editUser, olddata) => {
    let errorValidate =
      myVaildate.validateNameNull(editUser.name, 'name') +
      myVaildate.validateEmail(editUser.email) +
      myVaildate.validateAuthorities(editUser.authorities) +
      myVaildate.validateSameValue(editUser, olddata)
    if (errorValidate != '') {
      toast.error(errorValidate)
    } else {
      if (editUser.authorities == 'ADMIN') {
        editUser.authorities = ['USER', 'ADMIN']
      } else if (editUser.authorities == 'USER') {
        editUser.authorities = ['USER']
      }

      const query = gql.mutation(
        {
          operation: 'upsertUser',
          variables: {
            id: { type: 'Int', value: editUser.id },
            authorities: { value: `${editUser.authorities}` },
            name: { value: editUser.name.trimStart().trimEnd() },
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
          await GetUser()
          await GetUserByEmail()
        }
      })
    }
  }

  const GetUserByEmail = async (status) => {
    let jsonFromToken = jwtDecode(myCookie.getCookie('TokenLightcode'))
    const query = gql.query(
      {
        operation: 'getUserByEmail ',
        variables: {
          email: { value: jsonFromToken.sub },
        },
        fields: [
          'id',
          'name',
          'email',
          'authorities',
          'score',
          'scoreUnOfficial',
          { skills: ['id', 'level', { tag: ['id', 'topic'] }] },
        ],
      },
      undefined,
      {
        operationName: 'GetUserByEmail ',
      },
    )

    myconnectBackend.connectBack(query).then(async (data) => {
      if (data != '') {
        localStorage.setItem('user', JSON.stringify(data.data.getUserByEmail))
        user.value = JSON.parse(localStorage.getItem('user') || '{}')

        await myProblem.getAllproblem()
        await myLearning.getAllTag()
        await myProblem.getSubmissionByUserId(user.value.id)


        if (status == 'signup') {
          myRouter.push({ name: 'startpretest' })
        } else if (status !== 'check') {
          myRouter.push({ name: 'lightcode' })       
         }
        // else if (route.name == 'lightcode') {
        //   location.reload()
        //   myRouter.push({ name: 'lightcode' })
        // }
        // else myRouter.push({ name: 'lightcode' })
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
        for (let i in data['data']['getUser']) {
          if (data['data']['getUser'][i].authorities.includes('ADMIN')) {
            data['data']['getUser'][i].authorities = 'ADMIN'
          } else data['data']['getUser'][i].authorities = 'USER'
        }
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
  const GetBoard = async () => {
    const query = gql.query(
      {
        operation: 'getLeaderboard ',
        fields: ['id', 'name', 'email', 'score'],
      },
      undefined,
      {
        operationName: 'getLeaderboard ',
      },
    )

    myconnectBackend.connectBack(query).then(async (data) => {
      if (data != '') {
        scoreboard.value = data['data']['getLeaderboard']
        // for (let i in data['data']['getUser']) {
        //   if (data['data']['getUser'][i].authorities.includes('ADMIN')) {
        //     data['data']['getUser'][i].authorities = 'ADMIN'
        //   } else data['data']['getUser'][i].authorities = 'USER'
        // }
        // userList.value = data['data']['getUser']
      }
    })
  }

  const editPassword = async (emailAccount, oldPassword, newPassword) => {
    let errorValidate =
      myVaildate.validateEmail(emailAccount) +
      myVaildate.validatePassword(passwordAccount, true) +
      myVaildate.validatePassword(newPassword, true)
    if (errorValidate != '') {
      toast.error(errorValidate)
      return 'error'
    } else {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/v1/auth/password`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            name: emailAccount,
            password: oldPassword,
            newPassword: newPassword,
          }),
        })
        if (res.status === 201) {
          const objectJson = await res.json()
          if (objectJson.data != '') {
            toast.success('Password Changed')
            return true
          }
        } else if (res.status == 400) {
          toast.error('Cannot update password')
          return true
        }
      } catch (err) {
        console.log(err)
        toast.error('Error from server')
        return true
      }
    }
  }

  return {
    user,
    EditAccount,
    AddAccount,
    GetUserByEmail,
    GetUser,
    userList,
    DeteleUser,
    GetBoard,
    scoreboard,
    editPassword,
  }
})
