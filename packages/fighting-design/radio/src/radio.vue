<script lang="ts" setup name="FRadio">
  import { Props } from './props'
  import { isString, isBoolean, isNumber } from '../../_utils'
  import { useRun } from '../../_hooks'
  import { computed, inject } from 'vue'
  import { RADIO_GROUP_PROPS_kEY } from '../../radio-group/src/props'
  import { EMIT_UPDATE } from '../../_tokens'
  import type { RadioGroundInject, RadioModelValue } from '../../radio-group'
  import type { ClassList } from '../../_interface'

  const prop = defineProps(Props)
  const emit = defineEmits({
    [EMIT_UPDATE]: (val: RadioModelValue): boolean => isString(val) || isNumber(val) || isBoolean(val)
  })

  /** 获取父组件注入的依赖项 */
  const parentInject = inject<RadioGroundInject | null>(RADIO_GROUP_PROPS_kEY, null)

  const modelValue = computed({
    /**
     * 获取值
     *
     * 如果父组件有依赖注入则使用
     *
     * 否则使用之身 props 参数
     */
    get: (): RadioModelValue => {
      return (parentInject && parentInject.modelValue) || prop.modelValue
    },
    /**
     * 设置值
     *
     * @param { string | number | boolean }  val 最新值
     */
    set: (val: RadioModelValue): void => {
      if (parentInject && !parentInject.disabled) {
        parentInject.changeEvent(val)
        return
      }
      if (prop.disabled) return
      emit(EMIT_UPDATE, val)
      useRun(prop.onChange, val)
    }
  })

  /** 类名列表 */
  const classList = computed((): ClassList => {
    return [
      'f-radio',
      {
        'f-radio__checked': modelValue.value === prop.label,
        'f-radio__margin': !parentInject,
        'f-radio__disabled': prop.disabled || (parentInject && parentInject.disabled)
      }
    ] as const
  })
</script>

<template>
  <label role="radio" aria-checked="false" tabindex="0" :class="classList">
    <input v-model="modelValue" hidden type="radio" :value="label" :disabled="disabled" :name="name" />
    <span v-if="!parentInject?.border" class="f-radio__circle" />
    <span class="f-radio__text">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
