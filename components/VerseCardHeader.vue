<script setup lang="ts">
defineProps<{
  endpoint: string;
  method: "GET";
  description: string | undefined;
}>();

const colorMode = useColorMode();
</script>

<template>
  <div>
    <div class="flex items-start">
      <ClientOnly v-if="method">
        <UBadge
          size="sm"
          :variant="colorMode.preference == 'dark' ? 'outline' : 'solid'"
          class="me-3"
          >{{ method }}</UBadge
        >
        <template #fallback>
          <USkeleton class="h-6 w-12 me-1" />
        </template>
      </ClientOnly>
      <p class="font-bold text-base overflow-auto">{{ endpoint }}</p>
    </div>

    <div
      v-if="description"
      class="text-base my-3 ms-5 text-neutral-600 dark:text-stone-400"
    >
      <p class="">{{ description }}</p>
    </div>
  </div>
</template>
