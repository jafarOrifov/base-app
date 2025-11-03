<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const props = defineProps<{ title?: string }>()
defineEmits<{
  (e: 'save'): void
  (e: 'close'): void
}>()
const { t } = useI18n()

const modelValue = defineModel<boolean>()
</script>

<template>
  <q-dialog v-model="modelValue" persistent>
    <q-card class="bg-white dialog">
      <q-form @submit="$emit('save')">
        <q-card-section class="text-white bg-primary row justify-between items-center q-pa-sm">
          <div class="text-h6">{{ props.title || t('title.defaultDialogTitle') }}</div>
          <q-btn flat v-close-popup round dense icon="close" />
        </q-card-section>

        <q-separator />

        <q-card-section class="text-black q-pa-sm">
          <slot />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="q-pa-xs">
          <BaseBtn
            :label="t('label.cancel')"
            color="negative"
            v-close-popup
            flat
            @click="$emit('close')"
          />
          <BaseBtn :label="t('label.save')" flat type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
