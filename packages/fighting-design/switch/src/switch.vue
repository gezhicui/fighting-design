<script lang="ts" setup name="FSwitch">
  import { Props } from './props'
  import { reactive, toRefs } from 'vue'
  import { FSvgIcon } from '../../svg-icon'
  import { useList, useRun, useGlobal } from '../../_hooks'
  import { EMIT_UPDATE } from '../../_tokens'

  const prop = defineProps(Props)
  const emit = defineEmits({
    [EMIT_UPDATE]: (target: boolean): string => String(target)
  })

  const { getSize } = useGlobal(prop)

  /** 替换 type 后得到的 props */
  const params = reactive({
    ...toRefs(prop),
    size: getSize()
  })

  const { styles, classes } = useList(params, 'switch')

  /** 点击切换 */
  const handleClick = (): void => {
    if (prop.disabled) return
    emit(EMIT_UPDATE, !prop.modelValue)
    useRun(prop.onChange, !prop.modelValue)
  }

  /** 样式列表 */
  const styleList = styles(['closeColor', 'activeColor'])

  /** 类名列表 */
  const classList = classes(['size', 'square'], 'f-switch__input')
</script>

<template>
  <div role="switch" :class="['f-switch', { 'f-switch__disabled': disabled }]" :style="styleList">
    <!-- 左侧文字描述 -->
    <span v-if="closeText" :class="['f-switch__right-text', { 'f-switch__text-active': !modelValue }]">
      {{ closeText }}
    </span>

    <!-- 主要内容 -->
    <div :class="[classList, { 'f-switch__active': modelValue }]" @click="handleClick">
      <span :class="['f-switch__roll', { 'f-switch__roll-active': modelValue }]">
        <f-svg-icon v-if="icon" :icon="icon" :size="iconSize" />
      </span>
    </div>

    <!-- 右侧文字描述 -->
    <span v-if="activeText" :class="['f-switch__left-text', { 'f-switch__text-active': modelValue }]">
      {{ activeText }}
    </span>
  </div>
</template>
