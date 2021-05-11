import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
    @service router;
    beforeModel(){
        let currentUser = sessionStorage.getItem('currentUser');
        if(!currentUser){
            this.router.transitionTo('login');
        }
    }
}