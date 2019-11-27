'use strict';

import { Element } from 'htmlparser2';
import { widgetRoles, widgetElements } from "./constants";

function isElementWidget(element: Element): boolean {



  if (element.attribs === undefined)
    return false;

  let name = '';
  let role = element.attribs["role"];
  if (element.name)
    name = element.name;

  return widgetRoles.indexOf(role) >= 0 || widgetElements.indexOf(name) >= 0;
}

export = isElementWidget;