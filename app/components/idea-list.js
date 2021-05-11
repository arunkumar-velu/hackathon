import Component from '@glimmer/component';
import { computed, action, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';
import { isEmpty } from '@ember/utils';
export default class IdeaListComponent extends Component {
    @service store;
    showModal=false;
    sortKey = 'default';
    selectedTags = ArrayProxy.create({ content: A(['features']) });;
    tags=[{
            key:"features", 
            value: "Features"
        },
        {
            key:"tech", 
            value: "Tech"
        },
        {
            key:"enhancement", 
            value: "Enhancement"
        }
    ]
    resetValues(){
        this.title = '';
        this.description = '';
    }
    get list() {
        return this.args.list ?? [];
    }
    @computed('sortKey', 'list.[]')
    get sortedList() {
        console.log("sortedList", this.sortKey)
        return this.list.sortBy(this.sortKey);
    }
    @action
    addNew(){
        set(this, "showModal", true)
    }
    likeAction(item){
       item.likes++;
       item.save() 
    }
    submit(){
        if(isEmpty(this.title) && isEmpty(this.description)){
            set(this, "error", "Please all the fields");
        }else{
            var selectedTags = this.selectedTags.toArray();
            this.store.createRecord('idea', {
                title: this.title,
                tags: selectedTags,
                description: this.description,
                likes:0,
                createdAt: new Date().getTime(),
                createdBy: sessionStorage.getItem("currentUser")
            }).save().then(()=>{
                this.resetValues();
                set(this, "showModal", false);
            });
        }

    }
    close(){
        this.resetValues();
        set(this, "showModal", false);
        set(this, "error", '');
    }
    tagSelect(event){
        this.selectedTags.pushObject(event.target.value);
    }
    sort(event){
        set(this, "sortKey", event.target.value);
    }
    removeTag(tag, card){
        let tags =  card && card.tags ? card.tags : this.selectedTags;
        tags.removeObject(tag);
        card && card.save();
    }
}
