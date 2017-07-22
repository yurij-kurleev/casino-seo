import { CasinoSeoPage } from './app.po';

describe('casino-seo App', () => {
  let page: CasinoSeoPage;

  beforeEach(() => {
    page = new CasinoSeoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
