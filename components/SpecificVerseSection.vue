<template>
  <FeatureSection
    title="Specific Verses"
    to="/bible/verse"
    description="Getting a specific verse from the Bible."
  >
    <template #example>
      <V1SpecificVerseCard
        description="Get Genesis 1:1. Default version (NIV) is used."
      />
      <V2SpecificVerseCard
        description="Get Genesis 1:1. Default version (NIV) is used.
        V2 of the api is used."
      >
        <template #info>
          <ClientOnly>
            <UButton
              :ui="{ block: 'w-full flex justify-start items-center' }"
              to="/bible/verse"
              label="More on getting specific verses"
              color="sky"
              variant="ghost"
              icon="i-heroicons-arrow-top-right-on-square-16-solid"
              class="mb-3"
              block
            />
          </ClientOnly>
        </template>
      </V2SpecificVerseCard>
    </template>
  </FeatureSection>
</template>
