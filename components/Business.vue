<template>
  <div v-if="session.statuses[business.id] !== undefined">
    <div class="my-2">
      <h2 class="text-2xl bg-blue-200">{{ business.displayName }}</h2>
      <p>({{ session.statuses[business.id].branches }})</p>
    </div>
    <div class="my-2" v-if="session.statuses[business.id].grade !== 0">
      <h3 class="text-xl">Upgrades</h3>
      <ul class="px-8">
        <li
          class="list-disc"
          v-for="upgrade in business.upgrades.filter(
            (upgrade, index) => index < session.statuses[business.id].grade
          )"
        >
          {{ upgrade.displayName }} (profit x{{ upgrade.multiplier }})
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
    <Upgrade
      :business="business"
      :grade="session.statuses[business.id].grade"
    />
  </div>
  <div v-else>
    <div class="my-2">
      <h2 class="text-2xl">{{ business.displayName }}</h2>
    </div>
    <Expand :business="business" />
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
