<template>
  <div class="lg:w-2/3 mx-auto">
    <p
      class="text-3xl text-center underline underline-offset-3 decoration-sky-500 font-bold"
    >
      Random Verses
    </p>
    <RandomVerseCard
      method="GET"
      endpoint="/bible/random-verse"
      description="Get random verse from whole Bible. Default version (NIV) is used."
    />
    <RandomVerseCard
      method="GET"
      endpoint="/bible/random-verse?bible_version=KJV"
      description="Get random verse from whole Bible using King James version"
    />
    <RandomVerseCard
      method="GET"
      endpoint="/bible/random-verse?bible_version=KJV&book_group=Law"
      description="Get random verse Law books with King James Version"
    />
    <RandomVerseCard
      method="GET"
      endpoint="/bible/random-verse?bible_version=KJV&book_group=Gospels&verse_range=2"
      description="Get two consecutive random verses from Gospel books with King James Version"
      last
    />
  </div>
</template>
