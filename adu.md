```js
import React, { useState } from 'react';
import Konva from 'konva';
import { Stage, Layer, Image } from 'react-konva';
import PSD from 'psd.js';

function App() {
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      const psd = await PSD.fromEvent(event);
      const tree = psd.tree();
      const layers = tree.descendants();
      const images = await Promise.all(
        layers.map(async (layer) => {
          if (layer.isGroup()) {
            return null; // ignore groups
          }
          const canvas = document.createElement('canvas');
          canvas.width = psd.header.width;
          canvas.height = psd.header.height;
          const ctx = canvas.getContext('2d');
          layer.canvas = canvas;
          layer.ctx = ctx;
          const image = await layer.image.toPng();
          const konvaImage = new window.Image();
          konvaImage.src = image.src;
          konvaImage.onload = () => {
            const konvaImg = new Konva.Image({
              image: konvaImage,
              x: layer.left,
              y: layer.top,
              width: layer.width,
              height: layer.height,
            });
            layer.konvaImg = konvaImg;
            layer.ctx.drawImage(konvaImage, 0, 0);
          };
          return { layer, image };
        })
      );
      setImages(images.filter((img) => img !== null));
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <Stage width={800} height={600}>
        <Layer>
          {images.map(({ layer }) => (
            <Image key={layer.id} image={layer.canvas} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
