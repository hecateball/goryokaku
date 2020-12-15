<template>
  <div v-if="session.statuses[business.id] !== undefined">
    <div class="my-2">
      <h2 class="text-2xl">{{ business.displayName }}</h2>
      <p>({{ session.statuses[business.id].branches }})</p>
    </div>
    <div class="my-2">
      <h3 class="text-xl">Upgrades</h3>
      <ul class="px-8">
        <li class="list-disc" v-for="upgrade in business.upgrades">
          {{ upgrade.displayName }}
        </li>
      </ul>
    </div>
    <Run
      :business="business"
      :manager="session.statuses[business.id].manager"
    />
    <Expand :business="business" />
    <HireManager
      :business="business"
      :manager="session.statuses[business.id].manager"
    />
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
