import { generator, TGeneratedColor } from './generator' ;

const input = document.getElementById('color-input');
const container = document.getElementById('result-container');

function renderPalette(colors: TGeneratedColor[]) {
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('palette')

  for (let i = 0; i < colors.length; i += 1) {
    const element = colors[i];
    containerDiv.style.display = 'flex';
    

    const div = document.createElement('div');
    div.classList.add('palette_color')
    div.style.backgroundColor = element.hex;

    if (element.hsb.b > 80) {
      div.style.color = 'black';
    }

    const pHex = document.createElement('p');
    pHex.innerText = `HEX: ${element.hex}`

    const pRgb = document.createElement('p');
    pRgb.innerText = `RGB: ${element.rgb.r}, ${element.rgb.g}, ${element.rgb.b}`

    const pHsb = document.createElement('p');
    pHsb.innerText = `HSB: ${element.hsb.h}, ${element.hsb.s}, ${element.hsb.b}`

    div.append(pHex, pRgb, pHsb);

    containerDiv.appendChild(div);
  }

  container.appendChild(containerDiv);
}

input.onchange = (event) => {
  const colors = generator(event.target['value']);
  renderPalette(colors);
};
