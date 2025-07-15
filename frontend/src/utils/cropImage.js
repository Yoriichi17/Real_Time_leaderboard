export const getCroppedImg = (imageSrc, crop, fileName = 'cropped.jpeg') => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = 'anonymous'; // Allow cross-origin image processing

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Ensure the crop result is a perfect circle (use smallest side)
      const diameter = Math.min(crop.width, crop.height);
      canvas.width = diameter;
      canvas.height = diameter;

      // Create a circular clipping mask
      ctx.beginPath();
      ctx.arc(diameter / 2, diameter / 2, diameter / 2, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.clip();

      // Draw the cropped image inside the circle
      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        diameter,
        diameter
      );

      // Convert canvas to blob (JPEG format)
      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error('Canvas is empty'));
        blob.name = fileName;
        resolve(blob);
      }, 'image/jpeg');
    };

    image.onerror = (e) => reject(e); // Handle load failure
  });
};
