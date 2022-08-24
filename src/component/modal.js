
/** @module component/modal */

import d3 from 'd3';

import {default as badge} from './badge.js';
import {default as box} from './formBox.js';


function dialogBase(selection) {
  selection
      .classed('modal', true)
      .attr('tabindex', -1)
      .attr('aria-hidden', true);
  selection.append('div')
      .classed('modal-dialog', true)
    .append('div')
      .classed('modal-content', true);
}


function confirmDialog(selection) {
  const base = selection.call(dialogBase)
      .select('.modal-content');
  // body
  base.append('div')
      .classed('modal-body', true)
    .append('div')
      .classed('message', true);
  // footer
  const footer = base.append('div')
      .classed('modal-footer', true);
  footer.append('button')
      .classed('btn', true)
      .classed('btn-outline-secondary', true)
      .classed('cancel', true)
      .attr('type', 'button')
      .attr('data-bs-dismiss', 'modal')
      .text('Cancel');
  footer.append('button')
      .classed('btn', true)
      .classed('btn-primary', true)
      .classed('ok', true)
      .attr('type', 'button')
      .attr('data-bs-dismiss', 'modal')
      .text('OK');
}


function updateConfirmDialog(selection, message) {
  selection.select('.message').text(message);
}


function submitDialog(selection, title) {
  const base = selection.call(dialogBase)
      .select('.modal-content');
  // header
  const header = base.append('div')
      .classed('modal-header', true);
  header.append('h5')
      .classed('modal-title', true)
      .text(title);
  header.append('button')
      .classed('btn-close', true)
      .attr('type', 'button')
      .attr('data-bs-dismiss', 'modal')
      .attr('aria-label', 'Close');
  // body
  base.append('div')
      .classed('modal-body', true);
  // footer
  const footer = base.append('div')
      .classed('modal-footer', true);
  footer.append('button')
      .classed('btn', true)
      .classed('btn-secondary', true)
      .attr('type', 'button')
      .attr('data-bs-dismiss', "modal")
      .text('Cancel');
  footer.append('button')
      .classed('btn', true)
      .classed('btn-primary', true)
      .attr('type', 'button')
      .attr('data-bs-dismiss', 'modal')
      .text('Save changes')
      .on('click', () => {
        selection.dispatch('submit');
      });
}



function renameDialog(selection) {
  const renameBox = selection.call(submitDialog, "Rename snapshot")
    .select('.modal-body').append('div')
      .classed('name', true)
      .call(box.textBox, 'New name');
  renameBox.select('.form-control')
      .attr('required', 'required');
  renameBox.select('.invalid-feedback')
      .call(badge.updateInvalidMessage, 'Please provide a valid name');
}


function updateRenameDialog(selection, name) {
  selection.select('.name').call(box.updateFormValue, name);
}


function renameDialogValue(selection) {
  return box.formValue(selection.select('.name'));
}


export default {
  confirmDialog, updateConfirmDialog, submitDialog,
  renameDialog, updateRenameDialog, renameDialogValue
};
