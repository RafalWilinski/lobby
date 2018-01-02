module.exports = {
  'Login Page Test': (browser) => {
    const login = browser.page.login()
    login.navigate().isDisplayed()

    browser.end()
  }
}
