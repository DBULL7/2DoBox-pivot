var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;


// var driver_fx = new webdriver.Builder()
//     .forBrowser('firefox')
//     .build();

var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();


// editTest(driver_fx);
editTest(driver_chr);

function editTest(driver) {
  driver.get('https://dbull7.github.io/2DoBox-pivot/');
  driver.findElement(By.id('title-input')).sendKeys('please');
  driver.findElement(By.id('body-input')).sendKeys('work');
  driver.findElement(By.id('save-button')).click();

  driver.sleep(1000).then(function() {
  driver.findElement(By.id('card-title')).sendKeys('11111');
  driver.findElement(By.id('card-title')).sendKeys(Keys.ENTER);

  })

  driver.navigate().refresh();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('card-title')).getText().then(function(title) {
      if(title == '11111') {
        console.log('Test passed');
      } else {
        console.log('Test failed');
      }
    });
  });

  // driver.quit();
}
