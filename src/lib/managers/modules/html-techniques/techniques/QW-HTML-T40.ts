'use strict';

import {
  HTMLTechnique,
  HTMLTechniqueResult
} from '@qualweb/html-techniques';

import {
  Page,
  ElementHandle
} from 'puppeteer';

import {
  DomUtils
} from '../../../util/index';

import Technique from './Technique.object';

const technique: HTMLTechnique = {
  name: ' Failure of Success Criteria 2.1.1, 2.4.7, and 3.2.1 due to using script to remove focus when focus is received ',
  code: 'QW-HTML-T40',
  mapping: 'F55',
  description: 'Content that normally receives focus when the content is accessed by keyboard may have this focus removed by scripting.',
  metadata: {
    target: {
      element: '*'
    },
    'success-criteria': [{
      name: '2.1.1',
      level: 'A',
      principle: 'Operable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/keyboard'
    },{
      name: '2.4.7',
      level: 'A',
      principle: 'Operable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-visible'
    },{
      name: '3.2.1',
      level: 'A',
      principle: 'Understandable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/on-focus'
    }],
    related: [],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/failures/F55',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array < HTMLTechniqueResult > ()
};

class QW_HTML_T40 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(element: ElementHandle | undefined, page: Page): Promise < void > {
    
    if (!element) {
      return;
    }

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const isFocusable =await DomUtils.isElementFocusable(element);
    let keepsFocus;

    if(isFocusable){
      keepsFocus = await DomUtils.isFocusableBrowser(page, element);
      if (keepsFocus) { 
        evaluation.verdict = 'passed';
        evaluation.description = `Element kept focus`;
        evaluation.resultCode = 'RC1';
      }else{  
        evaluation.verdict = 'failed';
        evaluation.description = `Element didnt keep focus`;
        evaluation.resultCode = 'RC2';
      }

    evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
    evaluation.pointer = await DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);

    }  
  }
}

export = QW_HTML_T40;