import { generator, TGeneratedColor } from './generator' ;

const input = document.getElementById('color-input');
const container = document.getElementById('result-container');

function renderPalette(colors: TGeneratedColor[]) {
  for (let i = 0; i < colors.length; i += 1) {
    const element = colors[i];
    
    const div = document.createElement('div');
    div.style.backgroundColor = element.hex;
    div.style.width = 'calc(100vw / 11)';
    div.style.height = 'calc(100vw / 11)';
    div.style.color = 'white';
    div.style.fontSize = '13px';
    div.style.textAlign = 'center';
    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.style.alignItems = 'center';

    if (element.hsb.b > 80) {
      div.style.color = '#8F999E';
    }

    const pHex = document.createElement('p');
    pHex.innerText = `HEX: ${element.hex}`

    const pRgb = document.createElement('p');
    pRgb.innerText = `RGB: ${element.rgb.r}, ${element.rgb.g}, ${element.rgb.b}`

    const pHsb = document.createElement('p');
    pHsb.innerText = `HSB: ${element.hsb.h}, ${element.hsb.s}, ${element.hsb.b}`

    div.append(pHex, pRgb, pHsb);

    container.appendChild(div);
  }
}

input.onchange = (event) => {
  const colors = generator(event.target['value']);
  renderPalette(colors);
};
