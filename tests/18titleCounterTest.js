var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;


var driver_fx = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();


checkImportanceCritical(driver_fx);
checkImportanceCritical(driver_chr);

// Show completed cards

function checkImportanceCritical(driver) {
  driver.get('https://dbull7.github.io/2DoBox-pivot/');
  driver.findElement(By.id('title-input')).sendKeys('please');





  driver.sleep(3000).then(function() {
    driver.findElement(By.id('title-counter')).getText().then(function(Critical) {
      if(Critical === '6') {
        console.log('Test passed');
      } else {
        console.log('Test failed');
      }
    });
  });
  driver.sleep(2000).then(function() {
    driver.quit();
  })
}
