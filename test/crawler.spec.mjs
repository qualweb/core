import { QualWeb } from '../dist/index';
import { expect } from 'chai';

describe('Core input method: file', function() {
  it('Should evaluate all urls', async function() {
    this.timeout(0);

    const qualweb = new QualWeb({ adBlock: true, stealth: true });

    const urls = await qualweb.crawlDomain('https://ciencias.ulisboa.pt', {
      maxDepth: 0,
      logging: true
    });

    const options = {
      urls,
      'wcag-techniques': {
        exclude: ['QW-WCAG-T16']
      }
    };

    await qualweb.start({ maxConcurrency: 5, monitor: true }, { args: ['--no-sandbox', '--ignore-certificate-errors']});
    const reports = await qualweb.evaluate(options);
    await qualweb.stop();
    
    expect(Object.keys(reports).length).to.be.greaterThan(1);
  });
});