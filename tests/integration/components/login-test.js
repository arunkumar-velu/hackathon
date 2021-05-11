import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | login', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<Login />`);

    let empId = this.element.getElementsByClassName('form-group')[0];
    let password = this.element.getElementsByClassName('form-group')[1];

    assert.equal(empId.querySelector("label").textContent.trim(), 'Employee Id');
    assert.ok(empId.querySelector("input"));
    assert.equal(password.querySelector("label").textContent.trim(), 'Password');
    assert.ok(password.querySelector("input"));
    assert.equal(this.element.querySelector(".btn-primary").textContent.trim(), 'Login');
    assert.equal(this.element.querySelector(".btn-secondary").textContent.trim(), 'Register');
    await click('.btn-primary');
    assert.equal(this.element.querySelector(".error").textContent.trim(), 'Employee Id or password is empty');

  });

  test('it show error on form validation error message', async function(assert) {
   
    await render(hbs`<Login />`);
    await click('.btn-primary');
    assert.equal(this.element.querySelector(".error").textContent.trim(), 'Employee Id or password is empty');

    await render(hbs`<Login />`);
    let empId = this.element.getElementsByClassName('form-group')[0];
    await fillIn(empId.querySelector("input"), 'test');
    await click('.btn-primary');
    assert.equal(this.element.querySelector(".error").textContent.trim(), 'Employee Id or password is empty');

    await render(hbs`<Login />`);
    let password = this.element.getElementsByClassName('form-group')[1];
    await fillIn(password.querySelector("input"), 'test');
    await click('.btn-primary');
    assert.equal(this.element.querySelector(".error").textContent.trim(), 'Employee Id or password is empty');

  });
});
