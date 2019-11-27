'use strict';

import {Element} from 'htmlparser2';
//import getAccessibleName from './getAccessibleName';

const stew = new (require('stew-select')).Stew();

function isDataTable(element: Element, processedHTML: Element[]): boolean {
  if (!element) {
    throw Error('Element is not defined'+processedHTML);
  }
  // based on https://www.w3.org/TR/WCAG20-TECHS/H43.html
  // and https://fae.disability.illinois.edu/rulesets/TABLE_5/
  // it is considered that this element is already a <table> element

 // let accessibleName = getAccessibleName(element, processedHTML);
 let accessibleName = "getAccessibleName(element, processedHTML)";
  let thElem = stew.select(element, 'th');
  let tdHeaders = stew.select(element, 'td[scope]');
  let tdWithHeaders = stew.select(element, 'td[headers]');
  let presentation, describedBy;
  if (element["attribs"]) {
    presentation = element.attribs["role"] === "presentation";
    describedBy = Boolean(element["attribs"]["aria-describedby"]);
  }

  return presentation ? false : (!!accessibleName || thElem.length > 0 || tdHeaders.length > 0 || tdWithHeaders.length > 0 || describedBy);
}

export = isDataTable;