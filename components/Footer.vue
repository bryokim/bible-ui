<template>
  <div class="sticky top-[100vh] h-auto">
    <UDivider label="bible-ui" class="mt-10 px-5" />
    <div class="h-20 flex justify-around items-center text-base">
      <div class="flex items-center me-10">
        <UIcon name="i-bi-c-circle" class="me-3" /> <span>2024</span>
      </div>
      <div class="flex items-center me-10">
        <ULink
          to="https://github.com/bryokim"
          target="_blank"
          class="flex items-center me-6 hover:text-emerald-500 hover:underline underline-offset-4"
        >
          <UIcon name="i-bi-person-raised-hand" class="me-3" />
          <span>Brian Kimathi</span>
        </ULink>
      </div>
      <div>
        <ULink
          to="https://github.com/bryokim/bible-ui"
          target="_blank"
          class="flex items-center me-6 hover:text-emerald-500 hover:underline underline-offset-4"
        >
          <UIcon name="i-bi-github" class="me-3" /> <span>github</span>
        </ULink>
      </div>
    </div>
  </div>
</template>
