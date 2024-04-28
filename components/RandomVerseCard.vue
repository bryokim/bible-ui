<script setup lang="ts">
const props = defineProps<{
  method: "GET";
  description: string | undefined;
  bible_version?: string;
  book_group?: string;
  verse_range?: number;
  endpoint?: string;
  border_bottom?: boolean;
}>();

const config = useRuntimeConfig();
const endpoint = props.endpoint || "/bible/random-verse";

const colorMode = useColorMode();
const randomVerse = ref();
const loading = ref(false);

function parseEndpoint() {
  const parsedEndpoint = [endpoint];

  if (props.book_group) parsedEndpoint.push(`&book_group=${props.book_group}`);

  if (props.bible_version)
    parsedEndpoint.push(`&bible_version=${props.bible_version}`);

  if (props.verse_range)
    parsedEndpoint.push(`&verse_range=${props.verse_range}`);

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

  return parsedEndpoint.join("");
}

const parsedEndpoint = parseEndpoint();

async function getRandomVerse() {
  loading.value = true;
  await $fetch(parsedEndpoint, {
    method: props.method,
    baseURL: config.public.baseURL,
  })
    .then((data) => {
      randomVerse.value = data;
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loading.value = false;
    });
}

onBeforeMount(async () => {
  await getRandomVerse();
});
</script>

<template>
  <VerseCard
    :endpoint="parsedEndpoint"
    :method="method"
    :verseResponse="randomVerse"
    :description="description"
    class="py-10"
  >
    <template #footer>
      <div class="flex justify-center sm:justify-end">
        <ClientOnly>
          <UButton
            @click="getRandomVerse()"
            :variant="colorMode.preference == 'dark' ? 'outline' : 'solid'"
            :loading="loading"
            :disabled="loading"
            icon="i-bi-lightning-charge"
            color="teal"
            :label="loading ? 'getting verse' : 'Get Random Verse'"
          />
        </ClientOnly>
      </div>
    </template>
  </VerseCard>
  <slot name="info"></slot>
  <UDivider v-if="border_bottom"></UDivider>
</template>
