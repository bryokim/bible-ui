<template>
  <FeatureSection
    title="Random Verses"
    to="/bible/random-verse"
    description="Getting a random verse from the Bible."
  >
    <template #example>
      <RandomVerseCard
        description="Get random verse from whole Bible. Default version (NIV) is used."
      >
        <template #info>
          <ClientOnly>
            <UButton
              :ui="{ block: 'w-full flex justify-start items-center' }"
              to="/bible/random-verse"
              label="More on random verses"
              color="sky"
              variant="ghost"
              icon="i-heroicons-arrow-top-right-on-square-16-solid"
              class="mb-3"
              block
            />
          </ClientOnly>
        </template>
      </RandomVerseCard>
    </template>
  </FeatureSection>
</template>
