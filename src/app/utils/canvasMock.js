module.exports = function () {
  return {
    getContext() {
      return {
        fillRect() {},
        clearRect() {},
        getImageData() {},
        putImageData() {},
        createImageData() {},
        setTransform() {},
        drawImage() {},
        save() {},
        fillText() {},
        restore() {},
        beginPath() {},
        moveTo() {},
        lineTo() {},
        closePath() {},
        stroke() {},
        translate() {},
        scale() {},
        rotate() {},
        arc() {},
        fill() {}
      };
    }
  };
};
