<script setup lang="ts">
interface Parameter {
  name: string;
  type: string;
  description: string;
}

defineProps<{
  parameters: Parameter[];
  title: string;
}>();
</script>

<template>
  <h2 class="text-blue-600 dark:text-sky-400">{{ title }}:</h2>

  <slot name="info"></slot>

  <dl class="ms-10 text-base list-dsc">
    <div v-for="parameter in parameters" :key="parameter.name">
      <dt class="list-item">
        {{ parameter.name }}
        <UBadge variant="outline" class="text-md ring-0">
          {{ parameter.type }}
        </UBadge>
      </dt>
      <dd class="ms-2">{{ parameter.description }}</dd>
    </div>
  </dl>
</template>
