describe('Go to schedule page from home', () => {
  beforeAll(async () => {
    await device.launchApp();
    await device.reloadReactNative();
  });

  it('Check if the screen is home', async () => {
    await expect(element(by.id('home_screen'))).toBeVisible();
  });

  it('Check if the button exists and is visible, then tap it', async () => {

    // check if the button exists and is visible
    let button = await element(by.id('schedule_button'));
    await expect(button).toExist()
    await expect(button).toBeVisible();

    // Tap the button
    await button.longPress(1000);
  });

  it('Check we are on the schedule screen and if it exists and is visible', async () => {
    let page = await element(by.id('schedule_page'));
    await waitFor(page).toExist().withTimeout(2000);
    await expect(page).toBeVisible();
  });

  it('Check the title after data is loaded', async () => {
    await expect(element(by.text('Liste des lignes :'))).toBeVisible();
  });

});
