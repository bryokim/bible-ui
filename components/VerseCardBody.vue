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
}>();

const colorMode = useColorMode();
</script>

<template>
  <div v-if="verseResponse">
    <div class="mb-3 flex justify-between flex-col sm:flex-row">
      <div class="text-2xl">
        {{ verseResponse.reference }}
      </div>
      <div class="flex justify-end">
        <UBadge
          v-if="verseResponse.book_group !== 'Any'"
          size="sm"
          color="sky"
          :variant="colorMode.preference == 'dark' ? 'soft' : 'solid'"
          class="me-3"
          >{{ verseResponse.book_group }}
        </UBadge>
        <UBadge
          size="sm"
          color="blue"
          :variant="colorMode.preference == 'dark' ? 'soft' : 'solid'"
          >{{ verseResponse.bible_version }}
        </UBadge>
      </div>
    </div>
    <div class="ms-4">
      <div
        v-for="verse in verseResponse.verse_text"
        :key="verse"
        class="text-base"
      >
        <p>
          <span class="text-fuchsia-400 text-2xl">{{
            verse.split(/\.(.*)/, 2)[0]
          }}</span>
          . {{ verse.split(/\.(.*)/, 2)[1] }}
        </p>
      </div>
    </div>
  </div>
  <div v-else>
    <VerseSkeleton />
  </div>
</template>
