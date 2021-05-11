import Model, { attr } from '@ember-data/model';

export default class IdeaModel extends Model {
  @attr('string') title;
  @attr('string') description;
  @attr() tags;
  @attr('number') likes;
  @attr('number') createdAt;
  @attr('string') createdBy;
}
