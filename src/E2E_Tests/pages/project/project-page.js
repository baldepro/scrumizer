var ProjectPage = function () {
  this.isBtnPresent = function (btn) {
    return element(by.css('.' + btn)).isPresent()
  }

  this.clickBtn = function () {
    element(by.buttonText('Add')).click()
  }
}

module.exports = new ProjectPage()
