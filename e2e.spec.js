const AppURL = 'http://localhost:5000/'

describe('DMS-SYS', function() {
  browser.ignoreSynchronization = true;
  it('should direct to login', function() {
    browser.get(AppURL);
    browser.sleep(5000).then(function(done) {
    });
    element(by.css("a[href*='login']")).click();
    expect(browser.getCurrentUrl()).toBe(`${AppURL}login`);
  });

  it('should not accept invalid credentials', function() {
    const name = 'user' + Math.floor(Math.random() * 100000);
    element(by.name('email')).sendKeys(name + '@test.com');
    element(by.name('password')).sendKeys('password');
    element(by.css('[type="submit"]')).click();
    expect(browser.getCurrentUrl()).toBe(`${AppURL}login`);
  });

  it('should accept valid credentials', function() {
    element(by.name('email')).clear().sendKeys('jimnahmagira@yahoo.com');
    element(by.name('password')).clear().sendKeys('password');
    element(by.css('[type="submit"]')).click()
    browser.sleep(5000).then(function(done) {
      expect(browser.getCurrentUrl()).toBe(AppURL);
    });
  });

  it('should display public documents', function() {
    element(by.css("a[href*='documents']")).click();
    expect(browser.getCurrentUrl()).toBe(`${AppURL}documents`);
    expect(element(by.css('span')).getAttribute('innerHTML')).not.toEqual('private');
    browser.sleep(5000).then(function(done) {
    });

    });
    it('should create a document', function() {
      element(by.id('addDoc')).click();
      browser.sleep(5000).then(function(done) {
      });
      element(by.name('title')).clear().sendKeys('New Title From Selenium');
      element(by.name('content')).clear().sendKeys('Some new content from selenium');
      element(by.id('selectAccess')).click();
      element(by.id('public')).click();
      browser.sleep(5000).then(function(done) {
      });
      element(by.id('createDocument')).click()
      browser.sleep(5000).then(function(done) {
      });

    });
  });
