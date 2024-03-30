<template>
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
    <RandomVerseSection />
  </div>
</template>
