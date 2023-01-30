'use strict';

import { randIndexOfArray, randNumber } from './random-number.js';
import { capitalizeString } from './string-manipulation.js';
import adjectives from './adjective-list.json';
import nouns from './noun-list.json';
import verbs from './verb-list.json';
import names from './name-list.json';

const getAdjective = async () => {
  if (adjectives.adjs) {
    return capitalizeString(randIndexOfArray(adjectives.adjs));
  } else {
    return null;
  }
};

const getNoun = async () => {
  if (nouns.nouns) {
    return capitalizeString(randIndexOfArray(nouns.nouns));
  } else {
    return null;
  }
};

const getVerb = async () => {
  if (verbs.verbs) {
    const verb = randIndexOfArray(verbs.verbs);
    const word = randNumber(0, 1) ? verb.past : verb.present;
    return capitalizeString(word);
  } else {
    return null;
  }
};

export { getAdjective, getNoun, getVerb, names };
