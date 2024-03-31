/**
 * Implements the verses store for fetching and storing requested
 * verses.
 *
 * Uses `local storage` for persistence.
 */
export const useVerseStore = defineStore(
  "verses",
  () => {
    const verses = ref<{
      [propName: string]: any;
    }>({});

    /**
     * Fetches a verse and adds it to the verses which are stored in the local
     * storage. If verse has been fetched before, the stored value is returned.
     *
     * Errors are also saved corresponding to the request that caused the error.
     * The error is raised again if the same path is requested.
     *
     * @param endpoint the api endpoint to request from
     * @param baseURL the api's base URL
     * @param queryParams query parameters passed to the request
     * @returns the fetched verse
     */
    async function fetchVerse(
      endpoint: string,
      baseURL: string,
      queryParams: {
        book?: string;
        chapter?: number;
        verse?: string;
        book_group?: string;
        bible_version?: string;
      }
    ) {
      const key: string = `${queryParams.book || "Genesis"}_${
        queryParams.chapter || 1
      }_${queryParams.verse?.replace("-", "_") || "1"}_${
        queryParams.book_group || "Any"
      }_${queryParams.bible_version || "NIV"}`;

      if (verses.value[key]) {
        const value = verses.value[key];

        if (!value.error) return verses.value[key];

        throw new HTTPError(value);
      }

      await $fetch(endpoint, {
        method: "GET",
        baseURL: baseURL,
        query: {
          book: queryParams.book || "Genesis",
          chapter: queryParams.chapter || 1,
          verse: queryParams.verse || "1",
          book_group: queryParams.book_group,
          bible_version: queryParams.bible_version,
        },
      })
        .then((data) => {
          verses.value[key] = data;
          return verses.value[key];
        })
        .catch((e: any) => {
          // Save only errors that are caused by client
          if (e.status.toString().startsWith("4")) {
            verses.value[key] = {
              error: true,
              message: e.message,
              data: e.data,
              status: e.status.toString(),
            };
          }
          throw new HTTPError(e);
        });
    }

    return { verses, fetchVerse };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
