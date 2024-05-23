<template>
    <FeatureSection
      title="Daily verse"
      to="/bible/daily-verse"
      description="Getting daily verse."
    >
      <template #example>
        <DailyVerseCard
          method="GET"
          description="Get daily verse. Default version (NIV) is used."
        >
          <template #info>
            <ClientOnly>
              <UButton
                :ui="{ block: 'w-full flex justify-start items-center' }"
                to="/bible/daily-verse"
                label="More on daily verse"
                color="sky"
                variant="ghost"
                icon="i-heroicons-arrow-top-right-on-square-16-solid"
                class="mb-3"
                block
              />
            </ClientOnly>
          </template>
        </DailyVerseCard>
      </template>
    </FeatureSection>
  </template>
  