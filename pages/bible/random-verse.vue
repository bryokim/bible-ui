<template>
  <div class="lg:w-2/3 mx-auto">
    <p
      class="text-3xl text-center underline underline-offset-3 decoration-sky-500 font-bold"
    >
      Random Verses
    </p>
    <RandomVerseCard
      description="Get random verse from whole Bible. Default version (NIV) is used."
      border_bottom
    />
    <RandomVerseCard
      bible_version="KJV"
      description="Get random verse from whole Bible using King James version"
      border_bottom
    />
    <RandomVerseCard
      bible_version="KJV"
      book_group="Law"
      description="Get random verse Law books with King James Version"
      border_bottom
    />
    <RandomVerseCard
      bible_version="ASV"
      book_group="Gospels"
      :verse_range="2"
      description="Get two consecutive random verses from Gospel books with American Standard Version"
    />
  </div>
</template>
