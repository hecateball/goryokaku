<template>
  <div>
    <h2>{{ business.displayName }}({{ branches }})</h2>
    <Run :business="business" :status="status" />
    <Expand :business="business" :status="status" />
    <HireManager :business="business" :status="status" />
    <Upgrade :business="business" :status="status" />
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from '@nuxtjs/composition-api'
import { Business, useStatus } from '~/composables/business'
import Run from '~/components/Run.vue'
import Expand from '~/components/Expand.vue'
import HireManager from '~/components/HireManager.vue'
import Upgrade from '~/components/Upgrade.vue'

export default defineComponent({
  components: {
    Run,
    Expand,
    HireManager,
    Upgrade,
  },
  props: {
    business: {
      type: Object as PropType<Business>,
      required: true,
    },
  },
  setup: ({ business }) => {
    const { status } = useStatus(business.id)
    return {
      ...status,
      status,
    }
  },
})
</script>
