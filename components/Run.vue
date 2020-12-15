<template>
  <button
    class="bg-blue-500 text-white rounded select-none px-4"
    :class="{ 'opacity-50': running }"
    :disabled="running"
    @click="run"
  >
    Run
  </button>
</template>

<script lang="ts">
import { PropType, defineComponent } from '@nuxtjs/composition-api'
import { Business, Status, useRun } from '~/composables/business'

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
    const { run, running } = useRun(business, status)
    return {
      run,
      running,
    }
  },
})
</script>
