import Switch from './src/switch.vue'

import { install } from '../_utils'

export const FSwitch = install(Switch)

export type SwitchInstance = InstanceType<typeof Switch>

export * from './src/interface.d'

export default FSwitch
