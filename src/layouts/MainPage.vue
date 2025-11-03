<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { menus } from '@/router'
import { useCommonStore } from '@/stores/common'
import type { Locales } from '@/types/common'
import PageHeader from '@/components/base/PageHeader.vue'

const { t } = useI18n()
const store = useCommonStore()

const expanded = ref<Record<string | number, boolean>>({})
const drawer = ref<boolean>(false)

watch(
  expanded,
  (val) => {
    localStorage.setItem('active-expansion', JSON.stringify(val))
  },
  { deep: true },
)

const language = computed<Locales>({
  get: function () {
    return store.currentLocale
  },
  set: function (locale) {
    store.setLocale(locale)
    window.location.reload()
  },
})

const changeTheme = (color: string) => {
  document.body.style.setProperty('--q-primary', color)

  store.chengeTheme(color)
}

const logout = () => {
  localStorage.clear()
  window.location.reload()
}

onMounted(async () => {
  const saved = localStorage.getItem('active-expansion')
  if (saved) {
    expanded.value = JSON.parse(saved)
  } else {
    expanded.value = Object.fromEntries(menus.map((menu, index) => [index, false]))
  }
  await nextTick()
  await store.getBranches()
  await store.getUser()
  await store.getTerritories()
  await store.getPositoins()
  await store.getStaffs()
})
</script>

<template>
  <q-layout
    view="lHh Lpr lff"
    container
    style="height: 100vh"
    class="shadow-2 rounded-borders bg-grey-3"
  >
    <q-header class="bg-white text-black">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>Ishonch do'konlar tarmog'i</q-toolbar-title>
        <q-space />
        <BaseBtn icon-right="mdi-menu-down" icon="mdi-web" outline :label="language">
          <q-menu transition-show="rotate" transition-hide="rotate">
            <q-list style="min-width: 100px">
              <q-item
                clickable
                dense
                v-close-popup
                v-for="item in store.languages"
                :key="item.locale"
                @click="language = item.locale"
                :class="language === item.locale ? 'text-bold text-primary' : 'text-black'"
              >
                <q-item-section>{{ item.label }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </BaseBtn>
        <BaseBtn class="q-mx-md" padding="sm" outline rounded icon="mdi-account-outline">
          <q-menu transition-show="rotate" transition-hide="rotate">
            <q-list style="min-width: 200px" class="q-pa-sm text-black">
              <div class="row justify-start items-center q-pa-sm">
                <div
                  style="border-radius: 50%; width: 55px; height: 55px; overflow: hidden"
                  class="q-mr-md"
                >
                  <q-img src="../assets/images/images.png" height="55" width="55" />
                </div>
                <div class="row items-center" style="height: 55px">
                  <span class="text-bold"
                    >{{ 'Jafar' }}<br /><span class="text-grey-8">{{ 'Admin' }}</span></span
                  >
                </div>
              </div>
              <q-separator color=""></q-separator>
              <div>
                <div class="row items-center q-my-sm">
                  <q-icon color="grey-8" name="mdi-home-outline" class="q-mx-sm" size="sm"></q-icon>
                  <span class="text-secondary">{{ 'Fargona shahar' }}</span>
                </div>
                <div class="row items-center">
                  <q-icon
                    color="grey-8"
                    name="mdi-phone-outline"
                    class="q-mx-sm"
                    size="sm"
                  ></q-icon>
                  <span class="text-secondary">{{ '(93) 374-58-94' }}</span>
                </div>
                <div class="row items-center cursor-pointer q-my-sm">
                  <q-icon
                    color="grey-8"
                    name="mdi-account-arrow-right-outline"
                    class="q-mx-sm"
                    size="sm"
                  ></q-icon>
                  <q-btn @click="logout" dense flat color="secondary">{{
                    $t('label.logout')
                  }}</q-btn>
                </div>

                <q-separator color=""></q-separator>

                <div class="row items-center justify-evenly cursor-pointer q-my-sm">
                  <div class="color-block1" @click="changeTheme('#239f55ff')"></div>
                  <div class="color-block2" @click="changeTheme('#3f3a72')"></div>
                  <div class="color-block3" @click="changeTheme('#6a224f')"></div>
                  <div class="color-block4" @click="changeTheme('#193779')"></div>
                </div>
              </div>
            </q-list>
          </q-menu>
        </BaseBtn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="250"
      :breakpoint="400"
      class="bg-primary text-white text-body1"
    >
      <div style="height: 49px" class="row items-center text-h5 text-bold">
        <q-icon name="fa-regular fa-star" class="q-mx-md"></q-icon>
        Ishonch
      </div>
      <q-separator color="grey-4"></q-separator>
      <q-scroll-area style="height: calc(100% - 50px)">
        <q-list>
          <q-expansion-item
            v-for="(menu, index) in menus"
            :key="menu.name"
            v-model="expanded[index]"
            expand-icon-class="text-white"
            group="somegroup"
            :icon="menu.meta?.icon as string"
            header-style="border-radius: 20px; min-height: auto"
            :label="t(menu.meta?.title as string)"
          >
            <template #default>
              <div class="opened-menu">
                <q-item
                  v-for="child in menu.children"
                  :key="child.name"
                  clickable
                  v-ripple
                  :to="child.path"
                  dense
                  class="menu-hover"
                  active-class="active-menu"
                >
                  <q-item-section avatar>
                    <q-icon :name="child.meta?.icon as string" />
                  </q-item-section>

                  <q-item-section> {{ t(child.meta?.title as string) }} </q-item-section>
                </q-item>
              </div>
            </template>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <div class="q-pa-sm">
        <PageHeader />
        <RouterView />
      </div>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.menu-hover:hover {
  color: white;
  height: auto;
  clip-path: polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%);
}

.active-menu {
  color: white;
  background-color: rgba(202, 218, 198, 0.4);
  clip-path: polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%);
  font-style: italic;
}

.opened-menu {
  box-shadow: inset 0 0 3px rgba(25, 77, 21, 0.5);
  padding: 5px 0;
  font-size: 15px;
}

.color-block1 {
  background: #239f55ff;
  cursor: pointer;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid lightgrey;
}
.color-block2 {
  background: #3f3a72;
  cursor: pointer;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid lightgrey;
}
.color-block3 {
  background: #6a224f;
  cursor: pointer;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid lightgrey;
}
.color-block4 {
  background: #193779;
  cursor: pointer;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid lightgrey;
}
</style>
