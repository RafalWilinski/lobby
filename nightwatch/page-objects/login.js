module.exports = {
  url: function () {
    return this.api.launchUrl.concat('/login')
  },
  elements: {
    email: {
      selector: '#login-email'
    },
    password: {
      selector: '#login-password'
    }
  },
  commands: [{
    isDisplayed: function () {
      return this.waitForElementVisible('form', 1000).assert.visible('input');
    },
    clickForgotSecret: function () {
      return this.click('@forgotSecret')
    }
  }]
}
