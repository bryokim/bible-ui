<script setup lang="ts">
import ParameterList from "~/components/ParameterList.vue";

const versions = [
  {
    key: "V1",
    label: "Version 1",
    description:
      "Using v1 of the api at `api/v1/bible`.\
    This version uses query parameters only and no path parameters.",
    endpoint: "/api/v1/bible/verse",
  },
  {
    key: "V2",
    label: "Version 2",
    description:
      "Using v2 of the api at `api/v2/bible`.\
    This version uses both query and path parameters.",
    endpoint: "/api/v2/bible/{book}/{chapter}/{verse}",
  },
];

const parameters = [
  {
    name: "book",
    type: "string",
    description: "The book of the Bible to get the verse from. eg Genesis",
  },
  {
    name: "chapter",
    type: "integer",
    description: "The chapter of the book to get the verse from. eg 1",
  },
  {
    name: "verse",
    type: "string",
    description: "The specific verse or range of verses to get. eg 1 or 1-4",
  },
  {
    name: "bible_version",
    type: "string",
    description: "The version of the Bible to use. eg KJV",
  },
  {
    name: "book_group",
    type: "string",
    description: "The group of that the book belongs to. eg Law",
  },
];

const queryParametersV1 = parameters;

const pathParameters = parameters.slice(0, 3);

const queryParametersV2 = parameters.slice(3);
</script>

<template>
  <div class="lg:w-2/3 mx-auto">
    <p
      class="text-3xl text-center underline underline-offset-3 decoration-sky-500 font-bold"
    >
      Specific Verses
    </p>

    <UTabs :items="versions" class="mt-10" unmount>
      <template #item="{ item }">
        <p class="my-5 text-lg">- {{ item.description }}</p>
        <UDivider />

        <div v-if="item.key == 'V1'">
          <p class="my-5 text-lg">
            Endpoint:
            <UBadge variant="outline" class="ring-0 text-lg text-green-600">
              {{ item.endpoint }}
            </UBadge>
          </p>
          <div class="my-5">
            <ParameterList
              title="Query Parameters"
              :parameters="queryParametersV1"
            />
          </div>

          <UDivider />

          <V1SpecificVerseCard
            description="Get Genesis 1:1. Default version (NIV) is used."
            border_bottom
          />

          <V1SpecificVerseCard
            verse="1-2"
            bible_version="KJV"
            description="Get Genesis 1:1-2 using King James version"
            border_bottom
          />

          <V1SpecificVerseCard
            book="Philemon"
            book_group="Paul Epistles"
            verse="1-3"
            bible_version="KJV"
            description="Get Philemon 1:1-3 using King James version"
            border_bottom
          />

          <V1SpecificVerseCard
            verse="1-2"
            book_group="History"
            bible_version="KJV"
            description="Providing a book_group in which the book isn't in raises 400 HTTP exception"
          />
        </div>

        <div v-else>
          <p class="my-5 text-lg">
            Endpoint:
            <UBadge variant="outline" class="text-lg ring-0 text-green-600">
              {{ item.endpoint }}
            </UBadge>
          </p>
          <div class="my-5">
            <div class="mb-5">
              <ParameterList
                title="Path Parameters"
                :parameters="pathParameters"
              >
                <template #info>
                  <UBadge
                    size="xs"
                    color="rose"
                    variant="soft"
                    class="text-base"
                  >
                    Must be given in this order
                  </UBadge>
                </template>
              </ParameterList>
            </div>

            <div>
              <ParameterList
                title="Query Parameters"
                :parameters="queryParametersV2"
              />
            </div>
          </div>

          <UDivider />

          <V2SpecificVerseCard
            description="Get Genesis 1:1. Default version (NIV) is used."
            border_bottom
          />

          <V2SpecificVerseCard
            verse="1-2"
            bible_version="KJV"
            description="Get Genesis 1:1-2 using King James version"
            border_bottom
          />

          <V2SpecificVerseCard
            book="Philemon"
            book_group="Paul Epistles"
            verse="1-3"
            bible_version="KJV"
            description="Get Philemon 1:1-3 using King James version"
            border_bottom
          />

          <V2SpecificVerseCard
            verse="1-2"
            book_group="History"
            bible_version="KJV"
            description="Providing a book_group in which the book isn't in raises 400 HTTP exception"
          />
        </div>
      </template>
    </UTabs>
  </div>
</template>
Random
