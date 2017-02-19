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
  driver.findElement(By.id('title-input')).sendKeys('11111');
  driver.findElement(By.id('content-input')).sendKeys('22222');
  driver.findElement(By.id('submit')).click();

  find search and sendKeys 1 to search

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('entry-title')).getText().then(function(title){
      if (title === "11111") {
        console.log('test passed')
      } else {
        console.log('test failed')
      }
    })
  });



  driver.quit();

}
