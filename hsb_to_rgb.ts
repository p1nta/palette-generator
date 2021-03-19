export default function hsbToRgb(
  h: number,
  s: number,
  b: number,
) {
  const hue = h / 360;
  const brightness = b / 100;
  const saturation = s /100;

  const i = Math.floor(hue * 6);
  const f = hue * 6 - i;
  const p = brightness * (1 - saturation);
  const q = brightness * (1 - f * saturation);
  const t = brightness * (1 - (1 - f) * saturation);
  let red;
  let green;
  let blue;

  switch (i % 6) {
    case 0: {
      red = brightness;
      green = t;
      blue = p;
      break;
    }

    case 1: {
      red = q;
      green = brightness;
      blue = p;
      break;
    }

    case 2: {
      red = p;
      green = brightness;
      blue = t;
      break;
    }

    case 3: {
      red = p;
      green = q;
      blue = brightness;
      break;
    }

    case 4: {
      red = t;
      green = p;
      blue = brightness;
      break;
    }

    case 5: {
      red = brightness;
      green = p;
      blue = q;
      break;
    }
  }

  return {
    r: Math.round(red * 255),
    g: Math.round(green * 255),
    b: Math.round(blue * 255),
  };
}
