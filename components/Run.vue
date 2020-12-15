<template>
  <button
    class="text-white rounded select-none px-4"
    :class="{
      'bg-orange-500': manager,
      'bg-blue-500': !manager,
      'opacity-50': !manager && running,
    }"
    :disabled="manager || running"
    @click="run"
  >
    <span v-if="!manager">Run</span>
    <span v-else>Manager runs {{ business.displayName }}</span>
  </button>
</template>

<script lang="ts">
import { PropType, defineComponent } from '@nuxtjs/composition-api'
import { Business, useRun } from '~/composables/business'

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
    const { run, running } = useRun(business)
    return {
      run,
      running,
    }
  },
})
</script>
