<template>
  <div v-if="session.statuses[business.id] !== undefined">
    <h2>
      {{ business.displayName }}({{ session.statuses[business.id].branches }})
    </h2>
    <Run :business="business" />
    <Expand :business="business" />
    <HireManager :business="business" />
    <Upgrade :business="business" />
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from '@nuxtjs/composition-api'
import { Business } from '~/composables/business'
import { useSession } from '~/composables/session'
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
  setup: () => {
    const { session } = useSession()
    return {
      session,
    }
  },
})
</script>
