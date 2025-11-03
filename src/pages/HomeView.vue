<script setup lang="ts">
import BaseBtn from '@/components/base/BaseBtn.vue'
import BaseTextInput from '@/components/base/BaseTextInput.vue'
import { defineAsyncComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const inputValue = ref<string>()

const BaseDialog = defineAsyncComponent(() => import('@/components/base/BaseDialog.vue'))

const BaseDialogRef = ref<InstanceType<typeof BaseDialog> | null>(null)

const getSomething = () => {
  console.log('addeddd')
}
</script>

<template>
  <BaseBtn label="Base btn" outline />
  <BaseTextInput label="Base input" v-model="inputValue" />
  <BaseDialog ref="BaseDialogRef" @save="getSomething">
    <div class="row q-col-gutter-sm">
      <div class="col-6">
        <label>Base label:</label>
        <BaseTextInput label="Base" />
      </div>
      <div class="col-6">
        <label>Base label:</label>
        <BaseTextInput label="Base" />
      </div>
      <div class="col-6">
        <label>Base label:</label>
        <BaseTextInput label="Base" />
      </div>
      <div class="col-6">
        <label>Base label:</label>
        <BaseTextInput label="Base" />
      </div>

      <div class="col-6">
        <label>Base label:</label>
        <BaseTextInput label="Base" />
      </div>
      <div class="col-6">
        <label>Base label:</label>
        <BaseTextInput label="Base" />
      </div>
      <div class="col-12">
        <label>Base label:</label>
        <BaseTextInput label="Base" />
      </div>
    </div>
  </BaseDialog>
  {{ inputValue }}
  {{ t('title.defaultDialogTitle') }}
</template>
