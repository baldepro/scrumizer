
var HomePage = function () {
  this.urlPage = function () {
    return 'http://localhost:3000/'
  }

  this.isBtnPresent = function (btn) {
    return element(by.css('.' + btn)).isPresent()
  }

  this.clickBtn = function (btn) {
    element(by.css('.' + btn)).click()
  }
}

module.exports = new HomePage()
