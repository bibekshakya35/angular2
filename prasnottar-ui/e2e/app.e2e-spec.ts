import { PrasnottarPage } from './app.po';

describe('prasnottar App', () => {
  let page: PrasnottarPage;

  beforeEach(() => {
    page = new PrasnottarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
