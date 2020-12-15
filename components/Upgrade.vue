<template>
  <button
    class="bg-blue-500 text-white rounded select-none px-4"
    :class="{ 'opacity-50': disabled }"
    :disabled="disabled"
    @click="upgrade"
  >
    Upgrade (${{ business.manager.cost }})
  </button>
</template>

<script lang="ts">
import { PropType, defineComponent } from '@nuxtjs/composition-api'
import { Business, Status, useUpgrade } from '~/composables/business'

export default defineComponent({
  props: {
    business: {
      type: Object as PropType<Business>,
      required: true,
    },
    status: {
      type: Object as PropType<Status>,
      required: true,
    },
  },
  setup: ({ business, status }) => {
    const { upgrade, disabled } = useUpgrade(business, status)
    return {
      upgrade,
      disabled,
    }
  },
})
</script>
