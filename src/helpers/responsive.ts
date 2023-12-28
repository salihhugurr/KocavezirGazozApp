import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const ww = (param: number): number => {
  return width * param || width;
};

const wh = (param: number): number => {
  return height * param || height;
};

export { ww, wh };
