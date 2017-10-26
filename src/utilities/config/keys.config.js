//import * as animationData from '../../assets/test.json';
//import * as animationData1 from '../../assets/data.json';
import {animationDir, musicDir} from 'Root/path.config.js';
import assert from '../assert.js';

//const KeyRange = 2;

//const Keys = Array.from(Array(KeyRange).keys()).map((i) => String.fromCharCode(97 + i));
const Keys = ['a','b','0','1'];

const KeyRange = Keys.length;

const KeyAnimationUrls = {
  'a': 'test.json',
  'b': 'data.json',
  '0': 'Inuit.json',
  '1': 'Calypso.json',
}

Object.keys(KeyAnimationUrls).map( (key) =>{
  KeyAnimationUrls[key] = animationDir + KeyAnimationUrls[key];
});
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
  'a': 'IntoUncertainty.mp3',
  'b': 'MilesToGo.mp3',
  '0': 'Inuit.mp3',
  '1': 'Calypso.mp3',
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
Object.keys(KeyMusicUrls).map( (key) =>{
  KeyMusicUrls[key] = musicDir + KeyMusicUrls[key];
});
assert( Object.keys(KeyMusicUrls).length == KeyRange, 'Mismatch between KeyRange and Number of Key Audio Url definitions!' );

export {
  Keys,
  KeyAnimationUrls,
  KeyMusicUrls,
}
