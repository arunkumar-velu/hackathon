import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | idea-list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.model = [{
      title: "title 1",
      description: "description 1",
      tags: ["tag1", "tag2"],
      createdAt: 11223344,
      createdBy: "E001",
      likes: "1"
    }]
    await render(hbs`<IdeaList @list={{this.model}}/>`);

    assert.ok(this.element.querySelector(".add-new"), 'Add new button is available');
    assert.ok(this.element.querySelector(".sort-by label"), 'Sort dropdown label is available');
    assert.ok(this.element.querySelector(".sort-by select"), 'Sort dropdown is available');
    assert.ok(this.element.querySelector(".cards"), 'List of cards is available');
    assert.ok(this.element.querySelector(".card-data"), 'Card is available');
    assert.equal(this.element.querySelector(".title").textContent.trim(), this.model[0].title, 'Title is available');
    assert.equal(this.element.querySelector(".desc").textContent.trim(), this.model[0].description, 'Description is available');
    assert.equal(this.element.querySelectorAll(".tag")[0].innerText, this.model[0].tags[0] +' ✕', 'Tag1 is available');
    assert.equal(this.element.querySelectorAll(".tag")[1].innerText, this.model[0].tags[1]+' ✕', 'Tag2 is available');
    assert.equal(this.element.querySelector(".like").innerText, " "+this.model[0].likes, 'Like is available');
    assert.equal(this.element.querySelector(".createdBy").textContent.trim(), this.model[0].createdBy, 'Created by is available');
    assert.ok(this.element.querySelector(".createdAt").textContent.trim(), 'Created At is available');
  });
  test('it renders add new idea form', async function(assert) {
    this.model = [{
      title: "title 1",
      description: "description 1",
      tags: ["tag1", "tag2"],
      createdAt: 11223344,
      createdBy: "E001",
      likes: "1"
    }];
    await render(hbs`<IdeaList @list={{this.model}}/>`);
    await click(this.element.querySelector(".add-new"));
    let title = this.element.getElementsByClassName("form-group")[0];
    let description = this.element.getElementsByClassName("form-group")[1];
    assert.ok(this.element.querySelector(".modal"), 'Add new modal popup is available');
    assert.ok(this.element.querySelector("form"), 'Add new modal popup is available with form');
    assert.equal(title.querySelector("label").textContent.trim(), 'Title','Title is available');
    assert.equal(description.querySelector("label").textContent.trim(), 'Description','Description is available');
    assert.equal(this.element.getElementsByClassName("modal")[0].getElementsByTagName("label")[2].textContent.trim(), 'Tag','Description is available');
    assert.ok(this.element.querySelector(".modal select"), 'Select drop down is available');
    assert.equal(this.element.querySelectorAll(".tag")[0].innerText, "features" +' ✕', 'features is available');
    assert.equal(this.element.querySelector(".modal .btn-primary").textContent.trim(), "Submit", 'submit is available');
    assert.equal(this.element.querySelector(".modal .btn-secondary").textContent.trim(), "Cancel", 'cancel is available');
    await click(this.element.querySelector(".modal select"));
    assert.equal(this.element.querySelector(".modal select option").textContent.trim(), "Features", "Dropdown having features in first item in list")
  });
  test('it add new idea form validation for all the fields', async function(assert) {
    this.model = [{
      title: "title 1",
      description: "description 1",
      tags: ["tag1", "tag2"],
      createdAt: 11223344,
      createdBy: "E001",
      likes: "1"
    }];
    await render(hbs`<IdeaList @list={{this.model}}/>`);
    await click(this.element.querySelector(".add-new"));
    await click(this.element.querySelector(".modal .btn-primary"));
    assert.ok(this.element.querySelector('.error'), "Error message on validation")
  });
});
