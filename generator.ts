import hexToRgb from './hex_to_rgb';
import rgbToHsb from './rgb_to_hsb';
import hsbToRgb from './hsb_to_rgb';

export type TGeneratedColor = {
  rgb: {
      r: number;
      g: number;
      b: number;
  };
  hex: string;
  hsb: {
      h: number;
      s: number;
      b: number;
  };
}

const minSaturation = 10;
const maxSaturation = 30;
const minBrightness = 15;
const maxBrightness = 100;
const steps = 5;

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b): string {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function generator(hex: string): TGeneratedColor[] {
  const rgb = hexToRgb(hex);
  const hsb = rgbToHsb(rgb.r, rgb.g, rgb.b);
  const result = [{ rgb, hex, hsb }];

  let saturationTintStep = (hsb.s - minSaturation) / steps;
  let saturationShadeStep = (hsb.s - maxSaturation) / steps;

  let brightnessTintStep = (maxBrightness - hsb.b) / steps;
  let brightnessShadeStep = (hsb.b - minBrightness) / steps;

  if (brightnessTintStep < 0) {
    brightnessTintStep = 0;
  }

  if (brightnessShadeStep < 0) {
    brightnessShadeStep = 0;
  }

  if (saturationTintStep < 0) {
    saturationTintStep = 0;
  }

  if (saturationShadeStep < 0) {
    saturationShadeStep = 0;
  }

  for (let i = 1; i <= steps; i += 1) {
    const tintHsb = {
      h: Math.round(hsb.h),
      s: Math.round(hsb.s - saturationTintStep * i),
      b: Math.round(hsb.b + brightnessTintStep * i),
    }
    const tintRgb = hsbToRgb(tintHsb.h, tintHsb.s, tintHsb.b);
    const tintHex = rgbToHex(tintRgb.r, tintRgb.g, tintRgb.b);

    const shadeHsb = {
      h: Math.round(hsb.h),
      s: Math.round(hsb.s - saturationShadeStep * i),
      b: Math.round(hsb.b - brightnessShadeStep * i),
    }
    const shadeRgb = hsbToRgb(shadeHsb.h, shadeHsb.s, shadeHsb.b);
    const shadeHex = rgbToHex(shadeRgb.r, shadeRgb.g, shadeRgb.b);

    result.unshift({
      hex: tintHex,
      rgb: tintRgb,
      hsb: tintHsb,
    });

    result.push({
      hex: shadeHex,
      rgb: shadeRgb,
      hsb: shadeHsb,
    })
  }

  console.log(result);

  return result;
}
