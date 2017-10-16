//import * as animationData from '../../assets/test.json';
//import * as animationData1 from '../../assets/data.json';
import assert from '../assert.js';

const KeyRange = 2;

//const Keys = Array.from(Array(KeyRange).keys()).map((i) => String.fromCharCode(97 + i));
const Keys = ['a','b'];

const KeyAnimationUrls = {
  'a': ['./assets/test.json'],
  'b': ['./assets/data.json'],
}
/*
const KeyAnimation = {
  'a': [animationData],
  'b': [animationData1],
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
};*/

assert( Object.keys(KeyAnimationUrls).length == KeyRange, 'Mismatch between KeyRange and Number of Key Animation definition!' );

const KeyMusicUrls = {
  'a': './assets/musics/IntoUncertainty.mp3',
  'b': './assets/musics/MilesToGo.mp3',
/*  'c': './assets/musics/TakeItSlow.mp3',
  'd': './assets/musics/IntoUncertainty.mp3',
  'e': './assets/musics/MilesToGo.mp3',
  'f': './assets/musics/TakeItSlow.mp3',
  'g': './assets/musics/IntoUncertainty.mp3',
  'h': './assets/musics/MilesToGo.mp3',
  'i': './assets/musics/TakeItSlow.mp3',
  'j': './assets/musics/IntoUncertainty.mp3',
  'k': './assets/musics/MilesToGo.mp3',
  'l': './assets/musics/TakeItSlow.mp3',
  'm': './assets/musics/IntoUncertainty.mp3',
*/};

assert( Object.keys(KeyMusicUrls).length == KeyRange, 'Mismatch between KeyRange and Number of Key Audio Url definitions!' );

export {
  Keys,
  KeyAnimationUrls,
  KeyMusicUrls,
}
