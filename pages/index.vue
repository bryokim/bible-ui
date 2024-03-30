<template>
  <UContainer>
    <div
      class="lg:w-2/3 mx-auto h-20 mb-10 sm:mb-20 flex items-center justify-center backdrop-blur-sm-lg drop-shadow-md shadow-md bg-gray-900/10 dark:bg-white/5 rounded-lg"
    >
      <p class="text-center">
        Welcome to Bible-UI. Frontend for the
        <ULink
          to="https://github.com/bryokim/bible-api"
          target="_blank"
          active-class="text-primary"
          inactive-class="text-sky-500 hover:text-emerald-500"
          >Bible-API
        </ULink>
      </p>
    </div>

    <div class="lg:w-2/3 mx-auto">
      <div class="">
        <p
          class="text-3xl text-center underline underline-offset-3 decoration-sky-500 font-bold"
        >
          Random Verses
        </p>
        <RandomVerseCard
          method="GET"
          endpoint="/bible/random-verse"
          description="Get random verse from whole Bible. Default version (NIV) is used."
          class="my-10"
        />
        <RandomVerseCard
          method="GET"
          endpoint="/bible/random-verse?bible_version=KJV"
          description="Get random verse from whole Bible using King James version"
          class="my-10"
        />
        <RandomVerseCard
          method="GET"
          endpoint="/bible/random-verse?bible_version=KJV&book_group=Law"
          description="Get random verse Law books with King James Version"
          class="my-10"
        />
        <RandomVerseCard
          method="GET"
          endpoint="/bible/random-verse?bible_version=KJV&book_group=Gospels&verse_range=2"
          description="Get two consecutive random verses from Gospel books with King James Version"
          class="mt-10 pb-10"
        />
      </div>
    </div>
  </UContainer>
</template>
