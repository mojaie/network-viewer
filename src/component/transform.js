
/** @module component/transform */

import {default as legend} from '../component/legend.js';


function transform(selection, tx, ty, tk) {
  selection.select('.field')
    .attr('transform', `translate(${tx}, ${ty}) scale(${tk})`);
}

function transform2(selection, state) {
  const st = state.transform;
  selection.select('.field')
    .attr('transform', `translate(${st.x}, ${st.y}) scale(${st.k})`);
}

function resize(selection, state) {
  const width = selection.property("offsetWidth");
  const height = selection.property("offsetHeight");
  selection.select('.view')
      .attr('viewBox', `0 0 ${width} ${height}`)
    .select('.boundary')
      .attr('width', width)
      .attr('height', height);
  state.setViewBox(width, height);
  state.resizeNotifier();
}


function viewFrame(selection, state) {
  selection.select('.view').remove(); // Clean up
  selection.append('svg')
    .classed('view', true);
  selection.call(resize, state);
}


function view(selection, state) {
  selection
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('pointer-events', 'all')
    .attr('viewBox', `0 0 ${state.viewBox.right} ${state.viewBox.bottom}`);

  // Clean up
  selection.selectAll('g, rect').remove();

  // Boundary
  selection.append('rect')
      .classed('boundary', true)
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', state.viewBox.right)
      .attr('height', state.viewBox.bottom)
      .attr('fill', '#ffffff')
      .attr('stroke-width', 1)
      .attr('stroke', '#cccccc');
  // Field
  selection.append('g')
      .classed('field', true)
      .style('opacity', 1e-6)
    .transition()
      .duration(1000)
      .style('opacity', 1);
}


export default {
  transform, transform2, resize, viewFrame, view
};
