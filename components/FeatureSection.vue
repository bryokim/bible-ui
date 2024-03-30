<script setup lang="ts">
defineProps<{
  title: string;
  description: string | undefined;
}>();
</script>

<template>
  <section>
    <div class="group/title mb-2">
      <ULink
        to="/bible/random-verse"
        active-class="text-primary"
        inactive-class="text-sky-500 hover:text-emerald-500"
        class="flex items-center relative font-bold text-2xl underline ms-3"
        ><UIcon
          name="i-bi-feather"
          class="me-2 hidden group-hover/title:block absolute -left-7"
        />
        {{ title }}
      </ULink>
    </div>

    <div v-if="description" class="flex items-center mb-4">
      <UIcon name="i-heroicons-arrow-small-right-20-solid" />
      <p class="ps-3">
        {{ description }}
        <span class="italic">Example:</span>
      </p>
    </div>

    <div
      class="p-2 backdrop-blur-sm shadow-lg drop-shadow-lg bg-white dark:bg-gray-800 rounded-xl"
    >
      <slot name="example"></slot>
    </div>
  </section>
</template>
