import { QualWeb, generateEARLReport } from '../dist/index.js';
import { expect } from 'chai';

describe('Core', function () {
  it('Should evaluate one url', async function () {
    this.timeout(0);

    const qualweb = new QualWeb({ adBlock: true, stealth: true });

    await qualweb.start(undefined, { headless: true, args: ['--ignore-certificate-errors', '--no-sandbox'] });

    const evaluations = await qualweb.evaluate({
      url: 'https://ciencias.ulisboa.pt/',
      execute: {
        bp: true
      }
    });

    console.log(evaluations['https://ciencias.ulisboa.pt/'].metadata);

    const earlReports = generateEARLReport(evaluations);

    await qualweb.stop();

    expect(earlReports['https://ciencias.ulisboa.pt/']['@graph'].length).to.be.equal(1);
  });
});
