<script lang="ts" setup name="FSvgIcon">
  import { Props } from './props'
  import { useList, useRun } from '../../_hooks'

  const prop = defineProps(Props)

  const { styles } = useList(prop, 'svg-icon')

  /**
   * 点击触发
   *
   * @param { Object } evt 事件对象
   */
  const handleClick = (evt: MouseEvent): void => {
    useRun(prop.onClick, evt)
  }

  /** 样式列表 */
  const styleList = styles(['size', 'color'])
</script>

<template>
  <i role="img" class="f-svg-icon" text-indent="middle" :style="styleList" @click="handleClick">
    <component :is="icon" v-if="icon" />
    <slot v-else />
  </i>
</template>
