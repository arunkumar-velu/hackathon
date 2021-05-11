import Component from '@glimmer/component';
import { action,computed } from '@ember/object';
import { inject as service } from '@ember/service';
export default class TopNavComponent extends Component {
    @service router;
    @computed ()
    get userName(){
        return sessionStorage.getItem("currentUser")
    }
    @action
    logout(){
        sessionStorage.removeItem("currentUser");
        this.router.transitionTo('login');
    }
}
