import Component from '@glimmer/component';
import { action,set } from '@ember/object';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default class RegisterComponent extends Component {
    @service router;
    @service store;
    @action
    register() {
        let empId = this.empId,
            password= this.password;
            if(this.password !== this.confirmPassword){
             set(this, "error", 'Passwords are miss matching')   
            }else if(!isEmpty(this.empId) && !isEmpty(this.password) && !isEmpty(this.confirmPassword)){
                var newUser = this.store.createRecord('user', {
                    empId,
                    password
                });
                newUser.save().then(()=>{
                    this.login();
                });
            }else{
                set(this, "error", 'Pls fill all the fields') 
            }
        
    }
    login(){
        this.router.transitionTo('login');
    }
}
