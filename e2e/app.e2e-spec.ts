import { NgZoneAngular4Page } from './app.po';

describe('ng-zone-angular4 App', () => {
  let page: NgZoneAngular4Page;

  beforeEach(() => {
    page = new NgZoneAngular4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
