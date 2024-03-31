/**
 * Type of the verse response received from APi.
 */
export interface VerseResponseType {
  reference: string;
  verse_text: string[];
  book_group: string;
  bible_version: string;
}
