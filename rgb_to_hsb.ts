export default function rgbToHsb (
  r: number,
  g: number,
  b: number,
) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;

  const cMax = Math.max(red, green, blue);
  const delta = cMax - Math.min(red, green, blue);

  const diffc = c => (cMax - c) / 6 / delta + 1 / 2;
  const percentRoundFn = num => Math.round(num * 100) / 100;

  let h;
  let s;

  if (delta == 0) {
    h = s = 0;
  } else {
    s = delta / cMax;
    const deltaRed = diffc(red);
    const deltaGreen = diffc(green);
    const deltaBlue = diffc(blue);

    if (red === cMax) {
        h = deltaBlue - deltaGreen;
    } else if (green === cMax) {
        h = (1 / 3) + deltaRed - deltaBlue;
    } else if (blue === cMax) {
        h = (2 / 3) + deltaGreen - deltaRed;
    }

    if (h < 0) {
        h += 1;
    } else if (h > 1) {
        h -= 1;
    }
  }

  return {
      h: Math.round(h * 360),
      s: Math.round(percentRoundFn(s * 100)),
      b: Math.round(percentRoundFn(cMax * 100)),
  };
}