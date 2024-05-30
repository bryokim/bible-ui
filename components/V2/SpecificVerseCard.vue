<script setup lang="ts">
const props = defineProps<{
  book?: string;
  chapter?: number;
  verse?: string;
  book_group?: string;
  bible_version?: string;
  description?: string;
  border_bottom?: boolean;
}>();

const config = useRuntimeConfig();

const endpoint = encodeURI(
  `${config.public.endpointPrefixV2}/${props.book || "Genesis"}/${
    props.chapter || 1
  }/${props.verse || "1"}`
);

const method = "GET";

const colorMode = useColorMode();
const verseResponse = ref<VerseResponseType>();
const loading = ref(false);
const error = ref();

const verseStore = useVerseStore();

async function getVerse() {
  loading.value = true;

  await verseStore
    .fetchVerseV2(endpoint, config.public.baseURL, {
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
  const parsedEndpoint = [endpoint];

  if (props.book_group) parsedEndpoint.push(`&book_group=${props.book_group}`);

  if (props.bible_version)
    parsedEndpoint.push(`&bible_version=${props.bible_version}`);

  if (parsedEndpoint.length > 1) {
    // Add trailing to the endpoint if there are query parameters
    parsedEndpoint[0] = endpoint.endsWith("?") ? endpoint : endpoint + "?";

    // Remove & from the first query parameter
    parsedEndpoint[1] = parsedEndpoint[1].startsWith("&")
      ? parsedEndpoint[1].slice(1)
      : parsedEndpoint[1];
  } else {
    // Remove ? from the endpoint if there are no query parameters
    parsedEndpoint[0] = endpoint.endsWith("?")
      ? endpoint.slice(0, -1)
      : endpoint;
  }

  return encodeURI(parsedEndpoint.join(""));
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
    apiVersion="V2"
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
