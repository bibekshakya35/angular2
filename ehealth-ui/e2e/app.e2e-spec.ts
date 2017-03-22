import { EhealthPage } from './app.po';

describe('ehealth App', () => {
  let page: EhealthPage;

  beforeEach(() => {
    page = new EhealthPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
