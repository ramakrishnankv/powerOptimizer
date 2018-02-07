import { PowerOptimizerPage } from './app.po';

describe('power-optimizer App', () => {
  let page: PowerOptimizerPage;

  beforeEach(() => {
    page = new PowerOptimizerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
