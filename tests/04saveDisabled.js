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

  var isDisabled = driver.findElement(By.id('submit')).getAttribute('disabled');
  if (isDisabled !== true) {
    console.log('Test passed')
  } else {
    console.log('Nope')
  }
  // var checkDisabled =
  // driver.findElement(By.id('submit')).isEnabled();
  // if (checkDisabled !== true){
  //   console.log('test passed');
  // } else {
  //   console.log('test failed')
  // }
  driver.quit();
}
