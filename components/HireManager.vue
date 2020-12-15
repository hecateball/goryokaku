<template>
  <button
    class="bg-blue-500 text-white rounded select-none px-4"
    :class="{ 'opacity-50': disabled }"
    :disabled="disabled"
    @click="hireManager"
  >
    Hire Manager (${{ business.manager.cost }})
  </button>
</template>

<script lang="ts">
import { PropType, defineComponent } from '@nuxtjs/composition-api'
import { Business, Status, useHireManager } from '~/composables/business'

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
    const { hireManager, disabled } = useHireManager(business, status)
    return {
      hireManager,
      disabled,
    }
  },
})
</script>
