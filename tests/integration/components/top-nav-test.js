import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | top-nav', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    sessionStorage.setItem("currentUser", "E001")
    await render(hbs`<TopNav />`);
    assert.equal(this.element.querySelector('.logo').textContent.trim(), 'Hackathon Idea');
    assert.equal(this.element.querySelector('.user span').textContent.trim(), 'E001');
    assert.equal(this.element.querySelector('.logout').textContent.trim(), 'Logout');
  });
});
