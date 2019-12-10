import { randIndexOfArray, randNumber } from './random-number'
import { capitalizeString } from './string-manipulation'
import adjectives from './adjective-list'
import nouns from './noun-list'
import verbs from './verb-list'
const getAdjective = async () => {
  if (adjectives.adjs) {
    return capitalizeString(randIndexOfArray(adjectives.adjs))
  } else {
    return null
  }
}
const getNoun = async () => {
  if (nouns.nouns) {
    return capitalizeString(randIndexOfArray(nouns.nouns))
  } else {
    return null
  }
}
const getVerb = async () => {
  if (verbs.verbs) {
    const verb = randIndexOfArray(verbs.verbs)
    const word = randNumber(0, 1) ? verb.past : verb.present
    return capitalizeString(word)
  } else {
    return null
  }
}
module.exports = {
  getAdjective,
  getNoun,
  getVerb
}
