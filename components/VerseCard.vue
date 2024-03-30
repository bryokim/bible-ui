<script setup lang="ts">
defineProps<{
  verseResponse:
    | {
        reference: string;
        verse_text: string[];
        book_group: string;
        bible_version: string;
      }
    | undefined;
  endpoint: string;
  method: "GET";
  description: string | undefined;
}>();
</script>

<template>
  <UCard
    :ui="{
      ring: 'ring-0',
      divide: 'divide-y-0',
      background: '',
      shadow: 'shadow-none',
      body: {
        background: 'bg-gray-900/10 dark:bg-white/10',
        base: 'backdrop-blur-sm rounded-lg shadow drop-shadow-md shadow-md',
      },
    }"
  >
    <template #header>
      <VerseCardHeader
        :endpoint="endpoint"
        :method="method"
        :description="description"
      />
    </template>

    <div class="">
      <VerseCardBody :verseResponse="verseResponse" />
    </div>

    <template #footer>
      <slot name="footer"></slot>
    </template>
  </UCard>
</template>
