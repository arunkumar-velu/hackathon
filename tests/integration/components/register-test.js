import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | register', function(hooks) {
  setupRenderingTest(hooks);

  test('it register for is rendered', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    
    await render(hbs`<Register />`);
    let empId = this.element.getElementsByClassName('form-group')[0];
    let password = this.element.getElementsByClassName('form-group')[1];
    let confPassword = this.element.getElementsByClassName('form-group')[2];

    assert.equal(empId.querySelector("label").textContent.trim(), 'Employee Id');
    assert.ok(empId.querySelector("input"));
    assert.equal(password.querySelector("label").textContent.trim(), 'Password');
    assert.ok(password.querySelector("input"));
    assert.equal(confPassword.querySelector("label").textContent.trim(), 'Confirm password');
    assert.ok(confPassword.querySelector("input"));
    assert.equal(this.element.querySelector(".btn-primary").textContent.trim(), 'Register');
    assert.equal(this.element.querySelector(".btn-secondary").textContent.trim(), 'Login');
  });
  
  test('it show error on form validation error message', async function(assert) {
   
    await render(hbs`<Register />`);
    await click('.btn-primary');
    assert.equal(this.element.querySelector(".error").textContent.trim(), 'Pls fill all the fields', 'Overall form validation');

    await render(hbs`<Register />`);
    let empId = this.element.getElementsByClassName('form-group')[0];
    await fillIn(empId.querySelector("input"), 'test');
    await click('.btn-primary');
    assert.equal(this.element.querySelector(".error").textContent.trim(), 'Pls fill all the fields', 'Employee Id validation');

    await render(hbs`<Register />`);
    let password = this.element.getElementsByClassName('form-group')[1];
    await fillIn(password.querySelector("input"), 'test');
    await click('.btn-primary');
    assert.equal(this.element.querySelector(".error").textContent.trim(), 'Passwords are miss matching');

    await render(hbs`<Register />`);
    let confPassword = this.element.getElementsByClassName('form-group')[2];
    await fillIn(confPassword.querySelector("input"), 'test');
    await click('.btn-primary');
    assert.equal(this.element.querySelector(".error").textContent.trim(), 'Passwords are miss matching');
  });
  test('it show password and confirmation validation error message', async function(assert) {
    await render(hbs`<Register />`);
    let empId = this.element.getElementsByClassName('form-group')[0];
    let confPassword = this.element.getElementsByClassName('form-group')[2];
    let password = this.element.getElementsByClassName('form-group')[1];
    await fillIn(empId.querySelector("input"), 'test');
    await fillIn(password.querySelector("input"), 'test');
    await fillIn(confPassword.querySelector("input"), 'test1');
    await click('.btn-primary');
    assert.equal(this.element.querySelector(".error").textContent.trim(), 'Passwords are miss matching');
  });

  // test('it tranisiton for valid input', async function(assert) {
  //   await render(hbs`<Register />`);
  //   let empId = this.element.getElementsByClassName('form-group')[0];
  //   let confPassword = this.element.getElementsByClassName('form-group')[2];
  //   let password = this.element.getElementsByClassName('form-group')[1];
  //   await fillIn(empId.querySelector("input"), 'test');
  //   await fillIn(password.querySelector("input"), 'test');
  //   await fillIn(confPassword.querySelector("input"), 'test');
  //   await click('.btn-primary');
  //   assert.ok(true, )
  // });
});
