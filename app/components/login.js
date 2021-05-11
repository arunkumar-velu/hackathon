import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action, set } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default class LoginComponent extends Component {
    @service router;
    @service store;
    @action
    submit() {
        if(isEmpty(this.empId) || isEmpty(this.password)){
            set(this, "error","Employee Id or password is empty");
        }else{
            this.store.findAll("user").then((users)=>{
                let activeUser = users.find((user) => {
                    return user.empId === this.empId})
                if(activeUser && activeUser.password == this.password){
                    sessionStorage.setItem("currentUser", this.empId)
                    this.router.transitionTo('');
                }else{
                    set(this, "error","Incorrect employeeId or Password");
                }
            })
        }
    }
    register(){
        this.router.transitionTo('register');
    }
      
}
