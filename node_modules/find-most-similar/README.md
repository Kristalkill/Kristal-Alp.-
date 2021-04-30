# find Most Similar
Use Levenshtein distance alg to find the most similar word in an array. Perfect for providing suggestions in error messages and/or recovering from spelling mistakes.

## Install

Install via npm

```sh

 npm install --save find-most-similar

```

## How to use

```javascript

import findMostSimilar from 'find-most-similar';

// the word you are checking others against
const source = 'book';

// words to search for the closest to the source word
const words = ['lock','block', 'back', 'hack'];

// returns the word that requires the fewest changes to convert to the source word
findMostSimilar(source, words);

// returns 'back'

```

## License

 [MIT](https://github.com/thatbraxguy/findMostSimilar/blob/master/LICENSE)
