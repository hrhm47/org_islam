import { Dimensions, PixelRatio } from "react-native";

export const widthPercentageToDP = widthPercent => {
  const screenWidth = Dimensions.get("window").width; // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

export const heightPercentageToDP = heightPercent => {
  const screenHeight = Dimensions.get("window").height; // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

export const getWindowWidth = () => Dimensions.get("window").width;
export const getWindowHeight = () => Dimensions.get("window").height;
/** The scale function is used to scale up
 * the app UI across different sized devices.
 * The guideline width is based on iPhone 8.
 */
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;
const widthRatio = getWindowWidth() / guidelineBaseWidth;
const baseScale = size => widthRatio * size;

export const heightRatio = getWindowHeight() / guidelineBaseHeight;

export const scale = (size, factor = 0.5) => size + (baseScale(size) - size) * factor;
