<script setup lang="ts">
const props = defineProps<{
  endpoint: string;
  method: "GET";
  bible_version?: string;
  description?: string;
}>();

const config = useRuntimeConfig();

const colorMode = useColorMode();
const verseResponse = ref<VerseResponseType>();
const loading = ref(false);
const error = ref();

const verseStore = useVerseStore();

async function getDailyVerse() {
  loading.value = true;

  await verseStore
    .fetchDailyVerse(props.endpoint, config.public.baseURL, {
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
  const parsedEndpoint = [props.endpoint];

  if (props.bible_version)
    parsedEndpoint.push(`&bible_version=${props.bible_version}`);

  return parsedEndpoint.join("");
}

const parsedEndpoint = parseEndpoint();

onBeforeMount(async () => {
  await getDailyVerse();
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
            @click="getDailyVerse()"
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
  <UDivider></UDivider>
</template>
