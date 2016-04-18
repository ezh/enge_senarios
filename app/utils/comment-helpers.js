import { getDateArray } from '../utils/helpers'

export const makeComment = (text, author, ancestors) => {
  return {
    ancestors: ancestors,
    author: author,
    text: text,
    created_at: getDateArray(new Date())
  }
}
