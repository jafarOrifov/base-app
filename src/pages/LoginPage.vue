<script setup lang="ts">
import BaseBtn from '@/components/base/BaseBtn.vue'
import BaseTextInput from '@/components/base/BaseTextInput.vue'
import { useAuthStore } from '@/stores/auth.store'
import type { UserCredentials } from '@/types/auth'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const authStore = useAuthStore()

const loading = ref<boolean>(false)
const userCredentials = reactive<UserCredentials>({
  username: 'Jafarbek',
  password: '123',
})
const remember = ref<boolean>(false)

const onSubmit = async () => {
  try {
    loading.value = true
    await authStore.login(userCredentials)
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="wrapper-block row shadow-5">
      <div class="wrapper-block-left col-7">
        <div class="cover-block column items-center justify-center q-pa-xl">
          <p class="text-white text-h4">Ishonch Do'konlar tarmog'i</p>
          <p class="text-white text-subtitle1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid mollitia earum laborum.
            Eum earum voluptatum dolorem at cupiditate fugiat culpa fugit voluptas quod. Iure veniam
            voluptatum blanditiis soluta hic provident!
          </p>
        </div>
      </div>
      <div class="wrapper-block-right col-5">
        <q-form
          @submit="onSubmit"
          class="column items-center justify-center full-height full-width"
        >
          <p class="text-h4 text-black">Tizimga xush kelibsiz!</p>

          <div class="full-width q-px-xl">
            <BaseTextInput
              v-model="userCredentials.username"
              :label="t('label.login')"
              icon-prepend="mdi-account-arrow-right-outline"
              class="q-mb-md"
              rounded
            />
            <BaseTextInput
              v-model="userCredentials.password"
              :label="t('label.password')"
              icon-prepend="mdi-lock-outline"
              class="q-mb-md"
              rounded
            />
            <div>
              <q-checkbox v-model="remember" class="text-black" :label="t('label.remember')" />
            </div>

            <BaseBtn
              :label="t('label.loginSystem')"
              :loading="loading"
              type="submit"
              rounded
              class="full-width"
            />
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background: #2a9b4c;
  background: linear-gradient(
    90deg,
    rgba(42, 155, 76, 1) 0%,
    rgba(87, 199, 133, 1) 50%,
    rgba(42, 155, 76, 1) 100%
  );
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper-block {
  width: 70vw;
  height: 80vh;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
}
.wrapper-block-left {
  background-image: url('../assets/images/person2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
.cover-block {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
}
</style>
