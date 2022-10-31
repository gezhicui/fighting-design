import type { WaterfallRowType, WaterfallType } from './interface'
import type { PropType } from 'vue'

export const Props = {
  list: {
    type: [] as PropType<WaterfallRowType[]>,
    default: (): [] => []
  },
  type: {
    type: String as PropType<WaterfallType>,
    default: (): string => 'flex'
  },
  cols: {
    type: Number,
    default: (): number => 2
  },
  minWidth: {
    type: Number,
    default: (): number => 200
  },
  rowGap: {
    type: String,
    default: (): string => '0px'
  },
  colGap: {
    type: String,
    default: (): string => '0px'
  }
} as const

export const Emits = {
  'scroll-end': (): void | null => null
} as const
