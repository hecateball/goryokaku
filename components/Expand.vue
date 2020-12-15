<template>
  <button
    class="bg-blue-500 text-white rounded select-none px-4"
    :class="{ 'opacity-50': disabled }"
    :disabled="disabled"
    @click="expand"
  >
    Buy (${{ business.upgrade.cost }})
  </button>
</template>

<script lang="ts">
import { PropType, defineComponent } from '@nuxtjs/composition-api'
import { Business, Status, useExpand } from '~/composables/business'

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
    const { expand, disabled } = useExpand(business, status)
    return {
      expand,
      disabled,
    }
  },
})
</script>
