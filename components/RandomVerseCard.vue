<script setup lang="ts">
const props = defineProps<{
  endpoint: string;
  method: "GET";
  description: string | undefined;
  border_bottom?: boolean;
}>();

const config = useRuntimeConfig();

const colorMode = useColorMode();
const randomVerse = ref();
const loading = ref(false);

async function getRandomVerse() {
  loading.value = true;
  await $fetch(props.endpoint, {
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
    :endpoint="endpoint"
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
