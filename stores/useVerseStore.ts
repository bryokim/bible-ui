import moment from "moment";

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
    ): Promise<VerseResponseType | void> {
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

      return await _fetch(key, endpoint, baseURL, {
        book: queryParams.book || "Genesis",
        chapter: queryParams.chapter || 1,
        verse: queryParams.verse || "1",
        book_group: queryParams.book_group,
        bible_version: queryParams.bible_version,
      });
    }

    /**
     * Fetches daily verse. If verse has been fetched before,
     * the stored value is returned.
     *
     * The stored daily verse must be valid for that day to be returned.
     *
     * @param endpoint the api endpoint to request from
     * @param baseURL the api's base URL
     * @param queryParams query parameters passed to the request
     * @returns the daily verse
     */
    async function fetchDailyVerse(
      endpoint: string,
      baseURL: string,
      queryParams: {
        bible_version?: string;
      }
    ): Promise<VerseResponseType | void> {
      const key: string = `DAILY_VERSE_${queryParams.bible_version || "NIV"}`;

      if (verses.value[key]) {
        const value = verses.value[key];

        // stored daily verse's day is same as the start of the day
        // If not, don't return stored daily verse but fetch a new one.
        if (
          value.day &&
          moment(value.day, "dddd-MMM-D-YYYY").isSame(moment().startOf("day"))
        ) {
          // The stored daily verse is valid
          return value;
        }

        // throw error if value is an error
        if (value.error) throw new HTTPError(value);
      }

      return await _fetch(key, endpoint, baseURL, {
        bible_version: queryParams.bible_version,
      });
    }

    /**
     * Fetches verses from the given endpoints.
     *
     * @see HTTPError
     * @throws HTTPError
     *
     * @param key the key to store the response in in the verses value
     * @param endpoint the api endpoint to request from
     * @param baseURL the api's base URL
     * @param queryParams query parameters passed to the request
     * @returns the fetched verse
     */
    async function _fetch(
      key: string,
      endpoint: string,
      baseURL: string,
      queryParams: object
    ): Promise<VerseResponseType | void> {
      return await $fetch(endpoint, {
        method: "GET",
        baseURL: baseURL,
        query: queryParams,
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

    return { verses, fetchVerse, fetchDailyVerse };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
