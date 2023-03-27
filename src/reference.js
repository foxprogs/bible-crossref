import { db } from "./db";
import { books } from "./const";

/**
 * Returns an array of cross references for a specific verse
 * @param {Object} bcv - verse reference
 * @param {string} bcv.book - three-letter book code
 * @param {string} bcv.chapter - chapter number
 * @param {string} bcv.verse - verse number
 * @returns {Array} array of cross references
 */
export const getByBCV = ({ book, chapter, verse }) => {
  if (!book || !chapter || !verse) {
    throw new Error("Incorrect reference");
  }
  if (!books.includes(book)) {
    throw new Error("Incorrect book code");
  }
  return db?.[book]?.[parseInt(chapter)]?.[parseInt(verse)] ?? [];
};

/**
 * Returns an object of arrays of cross references for each verse in the chapter
 * @param {Object} bc - chapter reference
 * @param {string} bc.book - three-letter book code
 * @param {string} bc.chapter - chapter number
 * @returns {Object} object of arrays of cross references
 */
export const getByBC = ({ book, chapter }) => {
  if (!book || !chapter) {
    throw new Error("Incorrect reference");
  }
  if (!books.includes(book)) {
    throw new Error("Incorrect book code");
  }
  const verses = db?.[book]?.[parseInt(chapter)];
  if (!verses || verses.length <= 1) {
    return {};
  }
  return Object.fromEntries(
    verses.slice(1).map((el, index) => [index + 1, el])
  );
};
