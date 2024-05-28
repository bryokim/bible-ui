<script setup lang="ts">
const endpoint = "/api/v1/bible/verse";
const config = useRuntimeConfig();

const colorMode = useColorMode();

const state = reactive({
  verse: "",
});

const loading = ref(false);
const verseResponse = ref<VerseResponseType>();
const error = ref();

// The available bible versions
const bibleVersions = [
  {
    value: "KJV",
    label: "King James Version",
  },
  {
    value: "NIV",
    label: "New International Version",
  },
  {
    value: "ASV",
    label: "American Standard Version",
  },
];

// Default version is NIV
const selectedBibleVersion = ref("NIV");
const parsedEndpoint = ref(`${endpoint}`);

function getQuery() {
  return state.verse
    ? { reference: state.verse, bible_version: selectedBibleVersion.value }
    : { bible_version: selectedBibleVersion.value };
}

async function getVerse() {
  parsedEndpoint.value = encodeURI(
    `${endpoint}?bible_version=${selectedBibleVersion.value}${
      state.verse ? `&reference=${state.verse}` : ""
    }`
  );

  if (!state.verse) {
    error.value = {
      statusCode: 400,
      data: {
        detail: "No verse provided",
      },
    };
    return;
  }

  await $fetch(endpoint, {
    method: "GET",
    baseURL: config.public.baseURL,
    query: getQuery(),
  })
    .then((data: any) => {
      error.value = undefined;
      if (data) verseResponse.value = data;
    })
    .catch((e: any) => {
      error.value = e;
    });
}

async function onVersionChange() {
  if (state.verse) await getVerse();
}
</script>

<template>
  <p class="text-center">
    Interactively look for verses in any of the available Bible Versions.
  </p>

  <UForm :state="state" class="w-5/6 md:w-2/3 lg:w-1/2 mx-auto mt-10">
    <UFormGroup
      size="xl"
      label="Bible Verse"
      name="verse"
      class="mb-4"
      hint="eg. Genesis 1:1-2"
      required
    >
      <UInput
        v-model="state.verse"
        type="text"
        placeholder="Proverbs 24:3-4"
        icon="i-heroicons-magnifying-glass-20-solid"
        trailing
      />
    </UFormGroup>

    <URadioGroup
      v-model="selectedBibleVersion"
      legend="Choose Bible version"
      :options="bibleVersions"
      class="my-10 text-2xl"
      @change="onVersionChange()"
    />

    <ClientOnly>
      <UButton
        @click="getVerse()"
        :label="loading ? 'Loading' : 'Get verse'"
        :loading="loading"
        :disabled="loading"
        :variant="colorMode.preference == 'dark' ? 'outline' : 'solid'"
        color="teal"
        block
      />
    </ClientOnly>
  </UForm>

  <VerseCard
    :verse-response="verseResponse"
    :description="undefined"
    :endpoint="parsedEndpoint"
    method="GET"
    class="w-5/6 md:w-2/3 mx-auto mt-10"
  >
    <template #footer>
      <div v-if="error">
        <UAlert
          :title="error.statusCode"
          :description="error.data.detail"
          color="red"
          variant="subtle"
          icon="i-heroicons-exclamation-circle-solid"
          class="mb-3"
        />
      </div>
    </template>
  </VerseCard>
</template>
