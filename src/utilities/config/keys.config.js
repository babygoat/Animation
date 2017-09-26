import * as animationData from '../../assets/test.json';
import assert from '../assert.js';

const KeyRange = 13;

const Keys = Array.from(Array(KeyRange).keys()).map((i) => String.fromCharCode(97 + i));

const KeyAnimations = {
  'a': [animationData],
  'b': [animationData],
  'c': [animationData],
  'd': [animationData],
  'e': [animationData],
  'f': [animationData],
  'g': [animationData],
  'h': [animationData],
  'j': [animationData],
  'k': [animationData],
  'l': [animationData],
  'm': [animationData],
  'n': [animationData],
};

assert( Object.keys(KeyAnimations).length == KeyRange, 'Mismatch between KeyRange and Number of Key Animation definition!' );

export {
  Keys,
  KeyAnimations,
}
