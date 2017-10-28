import {animationDir, musicDir} from 'Root/path.config.js';
import assert from '../assert.js';

const Keys = ['1','0','m','o','r','e'];
const KeyRange = Keys.length;

const plays = [
  'Calypso',
  'Inuit',
  'Amis',
  'Hakka',
  'Rakrak',
  'TWOpera',
];

let animationUrls = {};
let musicUrls = {};

Keys.forEach((value, index) => {
  animationUrls[value] = plays[index] + '.json';
  musicUrls[value] = plays[index] + '.mp3';
});

Object.keys(animationUrls).map( (key) =>{
  animationUrls[key] = animationDir + animationUrls[key];
});

Object.keys(musicUrls).map( (key) =>{
  musicUrls[key] = musicDir + musicUrls[key];
});

const KeyAnimationUrls = animationUrls;

assert( Object.keys(KeyAnimationUrls).length == KeyRange, 'Mismatch between KeyRange and Number of Key Animation definition!' );

const KeyMusicUrls = musicUrls;

assert( Object.keys(KeyMusicUrls).length == KeyRange, 'Mismatch between KeyRange and Number of Key Audio Url definitions!' );

export {
  Keys,
  KeyAnimationUrls,
  KeyMusicUrls,
}
