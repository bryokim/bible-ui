<script setup lang="ts">
import moment from "moment";

// Time in milliseconds to the next day
const timeTillTomorrow = ref(moment().endOf("day").diff(moment()));

// Ref to the VueCountdown component
const countdown = ref(null);

/**
 * Reset timeTillTomorrow and restart the countdown.
 */
function onCountdownEnd() {
  timeTillTomorrow.value = moment().endOf("day").diff(moment(), "seconds");

  // Restart the countdown
  // @ts-expect-error
  countdown.value?.restart();
}
</script>

<template>
  <ClientOnly>
    <vue-countdown
      ref="countdown"
      :time="timeTillTomorrow"
      @end="onCountdownEnd"
      v-slot="{ hours, minutes, seconds }"
    >
      <UBadge color="gray">
        {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds
      </UBadge>
      <span class="text-sm"> to new verse. </span>
    </vue-countdown>
  </ClientOnly>
</template>
