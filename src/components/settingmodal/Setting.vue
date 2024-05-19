<script setup>
import { ref } from 'vue'
import buttonVue from '../button/Button.vue'
import { account } from '../../stores/Account'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password';
import { Toaster, toast } from 'vue-sonner'


const emit = defineEmits(['CloseModal', 'EditUserByUser'])
const myAccount = account()
const editMode = ref('')
const user = ref('')
user.value = JSON.parse(localStorage.getItem('user'))
const EditUser = ref({
  id: user.value.id,
  name: user.value.name,
  email: user.value.email,
  authorities: user.value.authorities,
  score: user.value.score,
})
const oldUser = {
  id: user.value.id,
  name: user.value.name,
  email: user.value.email,
  authorities: user.value.authorities,
  score: user.value.score,
}

const editNewPassword = ref({
  email: '',
  password: '',
  newpassword: '',
})


const EditByUser = () => {
  myAccount.EditAccount(EditUser.value, oldUser).then(() => {
    emit('CloseModal', false)
  })
}
const lowCase = () => {
  EditUser.value.email = EditUser.value.email.toLowerCase()
}

const maxPassword = () => {
  editNewPassword.value.password = editNewPassword.value.password.substring(0, 20).trim(" ")

}
const maxNewPassword = () => {
  editNewPassword.value.newpassword = editNewPassword.value.newpassword.substring(0, 20).trim(" ")

}

const ChangePassword = () => {
  let errorText = ''
  if (editNewPassword.value.password == editNewPassword.value.newpassword) {
     errorText = 'Error value: Old password and New Password is same input'
  }
  if (errorText != "") {
    toast.error(errorText)
  } else {
    myAccount.editPassword(editNewPassword.value.email, editNewPassword.value.password, editNewPassword.value.newpassword).then(() => {
      emit('CloseModal', false)
    })
  }



}
</script>

<template>
  <div class="space-y-5">
    <hr />
    <div v-if="editMode == ''">
      Account
      <div class="p-5">name : {{ user.name }}</div>
      <div class="p-5">email : {{ user.email }}</div>
      <buttonVue :name="'Edit'" class="bg-blue-300 hover:bg-blue-400" @click="editMode = 'user'" :status="false">
      </buttonVue>
      <buttonVue :name="'Change Password'" class="bg-blue-300 hover:bg-blue-400" @click="editMode = 'password'"
        :status="false"></buttonVue>
    </div>
    <div v-if="editMode == 'user'">
      <div class="">
        Edit Account
        <div class=" flex justify-content-center m-5">
          <table>
            <tr>
              <td> <label for="username">Username</label>

              </td>
              <td>
                <InputText class="mx-3 p-2" id="username" v-model="EditUser.name" />
              </td>
            </tr>
            <tr>
              <td> <label for="email">Email</label>
              </td>
              <td>
                <InputText class="mx-3 p-2" id="email" @change="lowCase()" v-model="EditUser.email" />
              </td>
            </tr>
          </table>


        </div>

   
      </div>
      <buttonVue @buttonClick="editMode = ''" :name="'Close'" :status="false" class="bg-gray-300 hover:bg-gray-400">
      </buttonVue>
      <buttonVue :name="'Update user'" :status="false" class="bg-blue-300 hover:bg-blue-400"
        @buttonClick="EditByUser()">
      </buttonVue>
    </div>
    <div v-else-if="editMode == 'password'">
      <div class="">
        Edit Password
        <div class="flex justify-content-center m-5">
          <table>
            <tr>
              <td> <label class="block uppercase text-gray-700 text-xs mb-2 p-2" for="grid-password">Email
                </label></td>
              <td>
                <InputText type="email" @change="lowCase()" v-model="editNewPassword.email" />
              </td>
            </tr>
            <tr>
              <td> <label class="block uppercase text-gray-700 text-xs mb-2 p-2" for="grid-password">Password
                </label></td>
              <td>
                <Password v-model="editNewPassword.password" toggleMask @change="maxPassword">
                  <template #header>
                    <h6>Pick a password</h6>
                  </template>
                  <template #footer>
                    <Divider />
                    <p class="mt-2">Suggestions</p>
                    <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                      <li>At least one lowercase</li>
                      <li>At least one uppercase</li>
                      <li>At least one numeric</li>
                      <li>Minimum 6 characters</li>
                      <li>Maximum 20 characters</li>
                    </ul>
                  </template>
                </Password>
              </td>
            </tr>
            <tr>
              <td> <label class="block uppercase text-gray-700 text-xs mb-2 p-2" for="grid-password">New Password
                </label></td>
              <td>
                <Password v-model="editNewPassword.newpassword" @change="maxNewPassword">
                  <template #header>
                    <h6>Pick a password</h6>
                  </template>
                  <template #footer>
                    <Divider />
                    <p class="mt-2">Suggestions</p>
                    <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                      <li>At least one lowercase</li>
                      <li>At least one uppercase</li>
                      <li>At least one numeric</li>
                      <li>Minimum 6 characters</li>
                      <li>Maximum 20 characters</li>
                    </ul>
                  </template>
                </Password>
              </td>
            </tr>
          </table>
        </div>


      </div>
      <buttonVue @buttonClick="editMode = ''" :name="'Close'" :status="false" class="bg-gray-300 hover:bg-gray-400">
      </buttonVue>
      <buttonVue :name="'Change Password'" :status="false" class="bg-blue-300 hover:bg-blue-400"
        @buttonClick="ChangePassword()">
      </buttonVue>
    </div>
  </div>
</template>

<style></style>
