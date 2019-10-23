import { mount } from '@vue/test-utils'
import WelcomePage from './WelcomePage.vue'

describe('RegistrationPage', () => {
  test('should render names', () => {
    const wrapper = mount(WelcomePage);
    const h1 = wrapper.find("h1");

    const expectedText = 'Hello Bean, Jonas, Mustafa, Tom!';

    expect(h1.exists()).toBeTruthy();
    expect(h1.text()).toBe(expectedText);
  })
})
