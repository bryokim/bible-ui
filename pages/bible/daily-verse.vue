<template>
  <div class="lg:w-2/3 mx-auto">
    <p
      class="text-3xl text-center underline underline-offset-3 decoration-sky-500 font-bold"
    >
      Daily Verse
    </p>

    <div class="mt-4 flex justify-end items-center">
      <Countdown />
    </div>

    <DailyVerseCard
      description="Get daily verse. Default version (NIV) is used."
      border_bottom
    />
    <DailyVerseCard
      bible_version="ASV"
      description="Get daily verse using American Standard Version."
      border_bottom
    />
    <DailyVerseCard
      bible_version="KJV"
      description="Get daily verse using King James Version."
      border_bottom
    />
    <DailyVerseCard
      bible_version="invalid_version"
      description="Providing an invalid version throws a 422 error"
    />
  </div>
</template>
