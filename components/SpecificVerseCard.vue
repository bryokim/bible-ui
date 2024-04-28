<script setup lang="ts">
const props = defineProps<{
  method: "GET";
  book?: string;
  chapter?: number;
  verse?: string;
  book_group?: string;
  bible_version?: string;
  endpoint?: string;
  description?: string;
  border_bottom?: boolean;
}>();

const config = useRuntimeConfig();
const endpoint = props.endpoint || "/bible/verse";

const colorMode = useColorMode();
const verseResponse = ref<VerseResponseType>();
const loading = ref(false);
const error = ref();

const verseStore = useVerseStore();

async function getVerse() {
  loading.value = true;

  await verseStore
    .fetchVerse(endpoint, config.public.baseURL, {
      book: props.book || "Genesis",
      chapter: props.chapter || 1,
      verse: props.verse || "1",
      book_group: props.book_group,
      bible_version: props.bible_version,
    })
    .then((data: VerseResponseType | void) => {
      error.value = undefined;
      if (data) verseResponse.value = data;
    })
    .catch((e: typeof HTTPError) => {
      error.value = e;
    })
    .finally(() => {
      loading.value = false;
    });
}

function parseEndpoint() {
  const parsedEndpoint = [
    endpoint,
    `?book=${props.book || "Genesis"}`,
    `&chapter=${props.chapter || 1}`,
    `&verse=${props.verse || "1"}`,
  ];

  if (props.book_group) parsedEndpoint.push(`&book_group=${props.book_group}`);

  if (props.bible_version)
    parsedEndpoint.push(`&bible_version=${props.bible_version}`);

  return parsedEndpoint.join("");
}

const parsedEndpoint = parseEndpoint();

onBeforeMount(async () => {
  await getVerse();
});
</script>

<template>
  <VerseCard
    :endpoint="parsedEndpoint"
    :method="method"
    :verseResponse="verseResponse"
    :description="description"
    class="py-10"
  >
    <template #footer>
      <div v-if="error">
        <UAlert
          :title="error.statusCode"
          :description="error.detail"
          color="red"
          variant="subtle"
          icon="i-heroicons-exclamation-circle-solid"
          class="mb-3"
        />
      </div>
      <div class="flex justify-center sm:justify-end">
        <ClientOnly>
          <UButton
            @click="getVerse()"
            :variant="colorMode.preference == 'dark' ? 'outline' : 'solid'"
            :loading="loading"
            :disabled="loading"
            icon="i-bi-lightning-charge"
            color="teal"
            :label="loading ? 'getting verse' : 'Get verse'"
          />
        </ClientOnly>
      </div>
    </template>
  </VerseCard>
  <slot name="info"></slot>
  <UDivider v-if="border_bottom"></UDivider>
</template>
