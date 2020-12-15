<template>
  <button
    class="bg-blue-500 text-white rounded select-none px-4"
    :class="{ 'opacity-50': disabled }"
    :disabled="disabled"
    @click="upgrade"
  >
    Upgrade: {{ business.upgrades[0].displayName }} ({{ cost }})
  </button>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from '@nuxtjs/composition-api'
import { Business, useUpgrade } from '~/composables/business'
import { useFormatter } from '~/composables/formatter'

export default defineComponent({
  props: {
    business: {
      type: Object as PropType<Business>,
      required: true,
    },
  },
  setup: ({ business }) => {
    const { upgrade, disabled } = useUpgrade(business)
    const { formatter } = useFormatter()
    const cost = computed(() => formatter.format(business.upgrades[0].cost))
    return {
      upgrade,
      disabled,
      cost,
    }
  },
})
</script>
