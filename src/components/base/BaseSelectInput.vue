<script setup lang="ts" generic="T">
import useFormRules from '@/composables/useCommon'

const { required } = useFormRules()
interface Props<T> {
  options: T[]
  label: string
  rule?: boolean
}

const modelValue = defineModel<number | null | boolean | string>()

const { options, label, rule = true } = defineProps<Props<T>>()
</script>

<template>
  <q-select
    outlined
    map-options
    emit-value
    v-model="modelValue"
    :options="options"
    options-dense
    :rules="rule ? [required()] : []"
    option-value="id"
    option-label="name"
    :label="label"
    dense
    style="min-width: 200px"
    v-bind="$attrs"
  >
  </q-select>
</template>
