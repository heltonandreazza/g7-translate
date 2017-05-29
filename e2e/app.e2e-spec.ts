import { G7TranslatePage } from './app.po';

describe('g7-translate App', () => {
  let page: G7TranslatePage;

  beforeEach(() => {
    page = new G7TranslatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
