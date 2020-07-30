<template>
  <div class="edit" v-if="icecream">
      <div class="container">
          <div class="form-title">
              <h2 class="center-align">Edit <br> {{ icecream.title }} </h2> 
          </div>

        <form @submit.prevent="editIceCream" class="center-align">
             <div class="field-title">
                 <label for="title">Ice Cream Name</label>
                 <input type="text" name="title" v-model="icecream.title">
             </div>
             <div v-for="(flav,index) in icecream.flavors" :key="index" class="field">
                 <label for="flavor">Flavors</label>
                 <input type="text" name="flavor" v-model="icecream.flavors[index]">
                 <i class="material-icons delete" @click="deleteFlav(flav)">delete</i>
             </div>
             <div class="field add-flavor">
                  <label for="add-flavor">Add a Flavor: (Press Tab to Add Another Flavor)</label>
                 <input type="text" name="add-flavor" v-model="another" @keydown.tab.prevent="addFlav">
             </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text feedback"> {{ feedback }}</p>
                <button class="btn"> Save Changes </button>
            </div>
         </form>
      </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'Edit',
    data() {
        return {
            icecream: null,
            another: null,
            feedback: null,
        }
    },

    methods: {
        editIceCream() {
            if(this.icecream.title){
                this.feedback = null
                // Slug 
                this.icecream.slug = slugify(this.icecream.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                db.collection('icecreams').doc(this.icecream.id).update({
                    title: this.icecream.title,
                    slug: this.icecream.slug,
                    flavors: this.icecream.flavors
                }).then( () => {
                    this.$router.push( { name: 'Sandbox' })
                })
                .catch( err => {
                    console.log(err)
                })
            }else{
                this.feedback = 'Must Enter an Ice Cream Name'
            }
        },
        addFlav(){
            if(this.another){
                this.icecream.flavors.push(this.another)
                this.another = null
                this.feedback = null
            }else{
                this.feedback = 'Must Enter a Flavor'
            }
        },
        deleteFlav(flav){
            this.icecream.flavors = this.icecream.flavors.filter( flavor => {
                return flavor != flav
            })
        }
    },

    created() {
        let ref = db.collection('icecreams').where('slug', '==', this.$route.params.icecream_slug)
        ref.get().then( snapshot => {
            snapshot.forEach( doc => {
                this.icecream = doc.data()
                this.icecream.id = doc.id
            })
        })
    }
}
</script>

<style>

.edit {
    background: #e8505b;
    height: 100vh;
}

.container {
    padding:20px;
    max-width: 500px;
}

.container .form-title h2 {
    margin: 20px auto;
    color: #fff;
    letter-spacing: 10px;
    width: 100%;

}
.container .field {
    margin: 20px auto;
    position: relative;
}

.container form label {
    color: #fff;
    font-size: 1em;
    
}

.container form input[type=text] {
    font-family: 'Oswald', sans-serif;
    text-align: center;
    font-weight: 400;
}

.container .field .feedback {
    background: #fff;
    border-radius: 5px;
    padding: 8px;
}

.container .field .btn {
    background: #f3ecc2; 
    color: #000;
    font-family: 'Oswald', sans-serif;
}

.container .field .btn:hover{
    background: #fff;
}


.container .field .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    cursor: pointer;
}

.container .field .delete:hover {
    color: #fff;
    transition: .6s ease;
}



</style>