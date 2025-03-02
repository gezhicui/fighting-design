<script lang="ts" setup name="FSelect">
  import { Props, SELECT_PROPS_TOKEN } from './props'
  import { FInput } from '../../input'
  import { useList } from '../../_hooks'
  import { provide, reactive, computed, useSlots } from 'vue'
  import { FDropdown } from '../../dropdown'
  import { getChildren } from '../../_utils'
  import { EMIT_UPDATE } from '../../_tokens'
  import type { VNode } from 'vue'
  import type { SelectProvide, SelectModelValue, SelectChildren } from './interface'
  import type { OptionProps } from '../../option'

  const prop = defineProps(Props)
  const slot = useSlots()
  const emit = defineEmits({
    [EMIT_UPDATE]: (val: SelectModelValue): boolean => !!val
  })

  const { styles } = useList(prop, 'select')

  /**
   * 获取子元素 option
   *
   * 通过插槽插入的内容，过滤出有效的子元素返回
   */
  const options = computed((): VNode[] => {
    /** 如果没有插槽内容，返回空数组 */
    if (!slot.default) return []

    return getChildren(slot.default(), 'FOption')
  })

  /** 输入框绑定的值 */
  const inputValue = computed({
    /** 通过获取到的子元素，计算当前绑定值对应的 label 展示文本框的内容 */
    get: (): string => {
      /** 如果插槽没内容，则返回空字符串 */
      if (!options.value.length) return ''

      /**
       * 通过插槽内容
       *
       * 过滤出和绑定值相同的那一项
       */
      const currentOption: VNode[] = options.value.filter((node: VNode): boolean => {
        const optionProp: OptionProps = node.props as OptionProps

        /** 判断是否有传递 props */
        if (optionProp) {
          return optionProp.value ? optionProp.value === prop.modelValue : optionProp.label === prop.modelValue
        }

        /**
         * 如果没有传递 props 则根据插槽来判断
         *
         * 放心，这里一定会有插槽，子组件已经做了判断
         */
        return (node as SelectChildren).children.default()[0].children === prop.modelValue
      })

      /**
       * 如果没有通过插槽找出和绑定值相同的
       *
       * 则返回空
       */
      if (!currentOption.length) return ''

      /** 获取到当前满足要求的子元素 */
      const children: OptionProps = currentOption[0] as OptionProps
      /** 获取到当前子元素的插槽内容 */
      const slot: string | undefined = children.children && children.children.default()[0].children
      /** 获取到当前子元素的 label 参数 */
      const label: string | undefined = children.props && children.props.label
      /** 获取到当前子元素的 value 参数 */
      const value: string | undefined = children.props && children.props.value
      /** 返回优先级：插槽 > label > value */
      return slot || label || (value && value.toString()) || ''
    },
    /**
     * 设置值
     *
     * @param { string } val 最新值
     */
    set: (val: string): string => {
      return val
    }
  })

  /**
   * 设置新的值
   *
   * @param { string } newValue 新的 value 值
   * @param { string | number | boolean } newLabel 新增 label 值
   */
  const setValue = (newValue: string, newLabel: SelectModelValue): void => {
    inputValue.value = newValue
    emit(EMIT_UPDATE, newLabel)
  }

  /** 向自组件注入依赖项 */
  provide<SelectProvide>(SELECT_PROPS_TOKEN, reactive({ setValue }))

  /** 样式列表 */
  const styleList = styles(['width'])
</script>

<template>
  <div class="f-select" :style="styleList">
    <f-dropdown trigger="click" :disabled="disabled">
      <f-input
        v-model="inputValue"
        readonly
        :name="name"
        :disabled="disabled"
        :placeholder="placeholder"
        :clear="clear"
      />

      <template #content>
        <slot />
      </template>
    </f-dropdown>
  </div>
</template>
