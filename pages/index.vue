<template>
  <div>
    <div>
      <p class="text-6xl">{{ cash }}</p>
    </div>
    <ul>
      <li class="my-8" v-for="business in businesses" :key="business.id">
        <Business :business="business" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { useSession } from '~/composables/session'
import { useBusinesses } from '~/composables/business'
import { useFormatter } from '~/composables/formatter'
import Business from '~/components/Business.vue'

export default defineComponent({
  components: {
    Business,
  },
  setup: () => {
    const { businesses } = useBusinesses()
    const { session } = useSession()
    const { formatter } = useFormatter()
    return {
      businesses,
      cash: computed(() => formatter.format(session.cash)),
    }
  },
})
</script>
