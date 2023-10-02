import { QualWeb, generateEARLReport } from '../dist/index.js';
import { expect } from 'chai';

describe('Qualstate', function () {
  it('Qualstate Test', async function () {
    this.timeout(0);

    const qualweb = new QualWeb({ adBlock: true, stealth: true });

    await qualweb.start(undefined, { headless: true, args: ['--ignore-certificate-errors', '--no-sandbox'] });

    let qualStateOptions = {
      "maxStates": 3,
      "ignore": {
        "ids_events": ["/contact/", "_blank", "target"]
      }
    }
    
    const evaluations = await qualweb.evaluate({
      url: 'https://observatorio.acessibilidade.gov.pt/directories/27',
      log: { console: false },
      // viewport: { mobile: true, landscape: false },
      execute: { act: true, wcag: true, bp: false },
      'act-rules': { levels: ['A', 'AA'] },
      qualstate: qualStateOptions
    });

    await qualweb.stop();

    expect(3).to.be.equal(evaluations["https://observatorio.acessibilidade.gov.pt/directories/27"].states.length);
  });
});