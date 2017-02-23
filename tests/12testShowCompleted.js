var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;


// var driver_fx = new webdriver.Builder()
//     .forBrowser('firefox')
//     .build();

var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();


// checkCompleted(driver_fx);
checkCompleted(driver_chr);

// Show completed cards

function checkCompleted(driver) {
  driver.get('https://dbull7.github.io/2DoBox-pivot/');
  driver.findElement(By.id('title-input')).sendKeys('please');
  driver.findElement(By.id('body-input')).sendKeys('work');
  driver.findElement(By.id('save-button')).click();

  driver.findElement(By.className('completed-task')).click()
  driver.navigate().refresh();



  driver.sleep(3000).then(function() {
    driver.findElement(By.id('show-completed')).click()
    driver.findElement(By.className('completed-task')).getText().then(function(completed) {
      if(completed === 'Completed') {
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
