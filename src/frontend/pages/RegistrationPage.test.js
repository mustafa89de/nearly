import { mount } from '@vue/test-utils';
import RegistrationPage from './RegistrationPage.vue';

describe('RegistrationPage', () => {
  test('should render names', () => {
    const wrapper = mount(RegistrationPage);
    const h1 = wrapper.find("h1");

    const expectedText = 'Hello Bean, Jonas, Mustafa, Tom!';

    expect(h1.exists()).toBeTruthy();
    expect(h1.text()).toBe(expectedText);
  });
});
