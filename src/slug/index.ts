import slugify from 'slugify'

/**
 * Converts a string to a URL slug.
 *
 * @param input - The string to be converted.
 * @returns The URL slug of the input string.
 */
export const toSlug = (input: string): string => {
  return slugify(input, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    strict: true,
    trim: true
  })
}
