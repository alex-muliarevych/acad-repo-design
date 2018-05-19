import { Given, When, Then } from "cucumber";
import { Selector, ClientFunction } from "testcafe";

const getWindowLocation = ClientFunction(() => window.location);
const LOCATION = 'http://localhost:8181';

Given('Any user access a root page', async function() {
  await this.testController.navigateTo(LOCATION);
});

Then('User can see a root page', async function() {
  const location = await getWindowLocation.with({ boundTestRun: this.testController })();
  const page = Selector('.page').with({ boundTestRun: this.testController });

  await this.testController.expect(location.origin).eql(LOCATION);
});