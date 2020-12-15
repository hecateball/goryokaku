<template>
  <button
    v-if="!manager"
    class="bg-blue-500 text-white rounded select-none px-4"
    :class="{ 'opacity-50': disabled }"
    :disabled="disabled"
    @click="hireManager"
  >
    Hire Manager ({{ cost }})
  </button>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from '@nuxtjs/composition-api'
import { Business, useHireManager } from '~/composables/business'
import { useFormatter } from '~/composables/formatter'

export default defineComponent({
  props: {
    business: {
      type: Object as PropType<Business>,
      required: true,
    },
    manager: {
      type: Boolean,
      required: true,
    },
  },
  setup: ({ business }) => {
    const { hireManager, disabled } = useHireManager(business)
    const { formatter } = useFormatter()
    return {
      hireManager,
      disabled,
      cost: formatter.format(business.manager.cost),
    }
  },
})
</script>
