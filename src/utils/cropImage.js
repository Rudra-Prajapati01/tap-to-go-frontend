const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

export const getCroppedImg = (imageSrc, pixelCrop) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );
      resolve(canvas.toDataURL("image/jpeg", 0.95));
    };
    image.onerror = reject;
  });

export const getCroppedBanner = async (imageSrc, pixelCrop) => {
  const image = await loadImage(imageSrc);
  const OUTPUT_W = Math.min(pixelCrop.width, 1920);
  const scale = OUTPUT_W / pixelCrop.width;
  const OUTPUT_H = Math.round(pixelCrop.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = OUTPUT_W;
  canvas.height = OUTPUT_H;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    OUTPUT_W,
    OUTPUT_H
  );
  return canvas.toDataURL("image/jpeg", 0.92);
};

export const getCroppedAvatar = async (imageSrc, pixelCrop) => {
  const image = await loadImage(imageSrc);
  const SIZE = Math.min(pixelCrop.width, 600);
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    SIZE,
    SIZE
  );
  return canvas.toDataURL("image/png");
};

export const getCroppedLogo = async (imageSrc, pixelCrop) => {
  const image = await loadImage(imageSrc);
  const SIZE = Math.min(pixelCrop.width, 400);
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, SIZE, SIZE);
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    SIZE,
    SIZE
  );
  return canvas.toDataURL("image/png");
};

export const dataURLtoBlob = (dataURL) => {
  const [header, data] = dataURL.split(",");
  const mime = header.match(/:(.*?);/)[1];
  const binary = atob(data);
  const arr = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i);
  return new Blob([arr], { type: mime });
};