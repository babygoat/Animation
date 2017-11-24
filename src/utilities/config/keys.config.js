import { animationDir, musicDir } from 'Root/path.config';
import assert from '../assert';

const Keys = ['1', '0', 'm', 'o', 'r', 'e'];
const KeyRange = Keys.length;

const plays = [
  'Calypso',
  'Inuit',
  'Amis',
  'Hakka',
  'Rakrak',
  'TWOpera',
];

const animationUrls = {};
const musicUrls = {};

Keys.forEach((value, index) => {
  animationUrls[value] = `${plays[index]}.json`;
  musicUrls[value] = `${plays[index]}.mp3`;
});

Object.keys(animationUrls).forEach((key) => {
  animationUrls[key] = animationDir + animationUrls[key];
});

Object.keys(musicUrls).forEach((key) => {
  musicUrls[key] = musicDir + musicUrls[key];
});

const KeyAnimationUrls = animationUrls;

assert(Object.keys(KeyAnimationUrls).length === KeyRange, 'Mismatch between KeyRange and Number of Key Animation definition!');

const KeyMusicUrls = musicUrls;

assert(Object.keys(KeyMusicUrls).length === KeyRange, 'Mismatch between KeyRange and Number of Key Audio Url definitions!');

export {
  Keys,
  KeyAnimationUrls,
  KeyMusicUrls,
};
