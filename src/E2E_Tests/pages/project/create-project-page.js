var CreateProjectPage = function () {
  this.enterFieldName = function (name) {
    return element(by.model('name')).sendKeys(name)
  }

  this.enterFieldDescription = function (description) {
    return element(by.model('description')).sendKeys(description)
  }

  this.clickSubmit = function () {
    element(by.buttonText('Submit')).click()
  }
}

module.exports = new CreateProjectPage()
