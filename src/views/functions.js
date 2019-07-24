export const getImgSrc = async (file, options = {}) => {
  const base64Content = await new Promise((resolve, reject) => {
    try {
      let reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = function() {
          var w = this.width;
          var h = this.height;
          let res = {
            error: false,
            base64Content: reader.result,
            height: h,
            width: w
          };

          if (options && options.width && w < options.width) {
            res.error = true;
            res.message = "Image width is lesser than required width="+w;
          }

          if (options && options.height && h < options.height) {
            res.error = true;
            res.message = "Image height is lesser than required height";
          }

          resolve(res);
        };

        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    } catch (e) {
      reject(e.message);
    }
  });

  return base64Content;
};
