
/** @module common/transform */

import d3 from 'd3';


export default class TransformState {
  constructor(width, height, transform) {
    this.fieldWidth = width;
    this.fieldHeight = height;

    /*
    transform: zoom and pan parameters
    viewBox: SVG canvas area, depends on browser size, can be changed by event.resize.
    focusArea: display area obtained by applying transform to viewbox
    -> focusArea = transform(viewBox)
    */

    this.viewBox = {
      top: 0,
      right: this.fieldWidth,
      bottom: this.fieldHeight,
      left: 0
    };

    this.focusArea = {};
    this.focusAreaMargin = 50;

    this.transform = transform || {x: 0, y: 0, k: 1};
    this.prevTransform = {
      x: this.transform.x,
      y: this.transform.y,
      k: this.transform.k
    };
  }

  setFocusArea() {
    const tx = this.transform.x;
    const ty = this.transform.y;
    const tk = this.transform.k;
    const margin = this.focusAreaMargin;
    this.focusArea.top = (this.viewBox.top - ty) / tk - margin;
    this.focusArea.left = (this.viewBox.left - tx) / tk - margin;
    this.focusArea.bottom = (this.viewBox.bottom - ty) / tk + margin;
    this.focusArea.right = (this.viewBox.right - tx) / tk + margin;
    // this.showFocusArea();  // debug
  }

  setViewBox(width, height) {
    // called by browser resize
    this.viewBox.right = width;
    this.viewBox.bottom = height;
    // this.showViewBox();  // debug
    this.setFocusArea();
  }

  setTransform(tx, ty, tk) {
    // called by transform operation
    this.transform.x = tx;
    this.transform.y = ty;
    this.transform.k = tk;
    // this.showTransform(); // debug
    this.setFocusArea();
  }

  showTransform() {
    d3.select('#debug-transform')
      .text(JSON.stringify(this.transform));
  }

  showFocusArea() {
    d3.select('#debug-focusarea')
      .text(JSON.stringify(this.focusArea));
  }

  showViewBox() {
    d3.select('#debug-viewbox')
      .text(JSON.stringify(this.viewBox));
  }
}
