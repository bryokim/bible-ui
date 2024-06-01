<script setup lang="ts">
const config = useRuntimeConfig();
const V1Endpoint = `${config.public.endpointPrefix}/verse`;
const V2Endpoint = `${config.public.endpointPrefixV2}`;

const colorMode = useColorMode();

const state = reactive({
  verse: "",
});

const loading = ref(false);
const verseResponse = ref<VerseResponseType>();
const error = ref();
const apiVersion = ref(true); // true for V2 and false for V1

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
const parsedEndpoint = ref(`${apiVersion ? V2Endpoint : V1Endpoint}`);

function getQuery() {
  return state.verse
    ? { reference: state.verse, bible_version: selectedBibleVersion.value }
    : { bible_version: selectedBibleVersion.value };
}

async function getVerse() {
  let endpoint;

  if (apiVersion.value) {
    // API Version 2
    parsedEndpoint.value = encodeURI(
      `${V2Endpoint}/${state.verse}?bible_version=${selectedBibleVersion.value}`
    );
    endpoint = parsedEndpoint.value;
  } else {
    // API Version 1
    parsedEndpoint.value = encodeURI(
      `${V1Endpoint}?bible_version=${selectedBibleVersion.value}${
        state.verse ? `&reference=${state.verse}` : ""
      }`
    );
    endpoint = V1Endpoint;
  }

  if (!state.verse) {
    error.value = {
      statusCode: "400",
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
      verseResponse.value = undefined;
      error.value = e;
    });
}

async function onVersionChange() {
  if (state.verse) await getVerse();
}

async function onAPIVersionChange() {
  if (state.verse) {
    parsedEndpoint.value = apiVersion.value
      ? encodeURI(
          `${V2Endpoint}/${state.verse}?bible_version=${selectedBibleVersion.value}`
        )
      : encodeURI(
          `${V1Endpoint}?bible_version=${selectedBibleVersion.value}${
            state.verse ? `&reference=${state.verse}` : ""
          }`
        );
  } else {
    parsedEndpoint.value = apiVersion.value ? V2Endpoint : V1Endpoint;
  }
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

  <div class="w-5/6 md:w-2/3 mx-auto mt-10 flex items-center">
    <UTooltip
      text="Toggle between V1 and V2 of the API"
      :popper="{ placement: 'top' }"
    >
      <UToggle
        on-icon="i-bi-2-circle-fill"
        off-icon="i-bi-1-circle-fill"
        color="cyan"
        v-model="apiVersion"
        @change="onAPIVersionChange()"
      />
    </UTooltip>
    <div class="ms-4 flex items-center">
      <UBadge v-if="apiVersion" color="gray">API Version 2</UBadge>
      <UBadge v-else color="gray">API Version 1</UBadge>
    </div>
  </div>

  <VerseCard
    :verse-response="verseResponse"
    :description="undefined"
    :endpoint="parsedEndpoint"
    :api-version="apiVersion ? 'V2' : 'V1'"
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
