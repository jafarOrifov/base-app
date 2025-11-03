<script setup lang="ts">
import useFormRules from '@/composables/useCommon'

const {
  label,
  iconAppend,
  iconPrepend,
  rule = true,
} = defineProps<{
  label?: string
  icon?: string
  iconPrepend?: string
  iconAppend?: string
  rule?: boolean
}>()
const { required } = useFormRules()
const modelValue = defineModel<string>()

const emit = defineEmits<{
  (e: 'enter'): void
}>()
</script>

<template>
  <q-input
    class="text-caption"
    outlined
    v-model="modelValue"
    @keyup.enter="() => emit('enter')"
    dense
    :rules="rule ? [required()] : []"
    :label="label"
    style="min-width: 200px"
    v-bind="$attrs"
  >
    <template v-if="iconPrepend" #prepend>
      <q-icon :name="iconPrepend" color="primary"></q-icon>
    </template>
    <template v-if="iconPrepend" #append>
      <q-icon :name="iconAppend" color="primary"></q-icon>
    </template>
  </q-input>
</template>
