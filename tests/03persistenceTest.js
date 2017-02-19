var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;


var driver_fx = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();


makesCard(driver_fx);
makesCard(driver_chr);



function makesCard(driver) {
  driver.get('https://dbull7.github.io/2DoBox-pivot/');
  driver.findElement(By.id('title-input')).sendKeys('please');
  driver.findElement(By.id('content-input')).sendKeys('work');
  driver.findElement(By.id('submit')).click();

  driver.navigate().refresh();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('entry-title')).getText().then(function(title) {
      if(title === 'please') {
        console.log('Test passed');
      } else {
        console.log('Test failed');
      }
    });
  });

  driver.quit();
}
