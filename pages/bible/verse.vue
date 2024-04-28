<template>
  <div class="lg:w-2/3 mx-auto">
    <p
      class="text-3xl text-center underline underline-offset-3 decoration-sky-500 font-bold"
    >
      Specific Verses
    </p>

    <SpecificVerseCard
      method="GET"
      endpoint="/bible/verse"
      description="Get Genesis 1:1. Default version (NIV) is used."
      border_bottom
    />

    <SpecificVerseCard
      method="GET"
      verse="1-2"
      bible_version="KJV"
      description="Get Genesis 1:1-2 using King James version"
      border_bottom
    />

    <SpecificVerseCard
      method="GET"
      book="Philemon"
      book_group="Paul Epistles"
      verse="1-3"
      bible_version="KJV"
      description="Get Philemon 1:1-3 using King James version"
      border_bottom
    />

    <SpecificVerseCard
      method="GET"
      verse="1-2"
      book_group="History"
      bible_version="KJV"
      description="Providing a book_group in which the book isn't in raises 400 HTTP exception"
    />
  </div>
</template>
Random
