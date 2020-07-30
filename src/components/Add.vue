<template>
  <div class="add">
      <div class="container">
          <div class="form-title"> 
            <h2 class="center-align"> Create </h2>
          </div>

         <form @submit.prevent="addIceCream" class="center-align">
             <div class="field-title">
                 <label for="title">Ice Cream Name</label>
                 <input type="text" name="title" v-model="title">
             </div>
             <div v-for="(flav,index) in flavors" :key="index" class="field">
                 <label for="flavor">Flavors</label>
                 <input type="text" name="flavor" v-model="flavors[index]">
                 <i class="material-icons delete" @click="deleteFlav(flav)">delete</i>
             </div>
             <div class="field add-flavor">
                  <label for="add-flavor">Add a Flavor: (Press Tab to Add Another Flavor)</label>
                 <input type="text" name="add-flavor" v-model="another" @keydown.tab.prevent="addFlav">
             </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text feedback"> {{ feedback }}</p>
                <button class="btn"> Add Ice Cream</button>
            </div>
         </form>

        <div class="sandbox-button center-align">
            <router-link :to="{ name: 'Sandbox' }">  
                <img :src="Img" alt="All Ice Cream">
                <span class="center-align">See All Ice Creams</span>
             </router-link>
        </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
import Img from '@/assets/all-icecream.svg'

export default { 
    name: 'Add',
    data() {
        return {
            Img,
            flavors: [],
            title: null,
            feedback: null,
            another: null,
            slug: null

        }
    },
    methods: {
        addIceCream() {
            if(this.title){
                this.feedback = null
                // Slug
                this.slug = slugify( this.title,{
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                db.collection('icecreams').add({
                    title: this.title,
                    flavors: this.flavors,
                    slug: this.slug
                })
                .then( () => {
                    this.$router.push({ name: 'Sandbox' })
                })
                .catch(err => {
                    console.log(err)
                })
            }else{
                this.feedback = 'Must Enter an Ice Cream Name'
            }
        },
        addFlav(){
            if(this.another){
                this.flavors.push(this.another)
                this.another = null
                this.feedback = null
            }else{
                this.feedback = 'Must Enter A Flavor'
            }
        },
        deleteFlav(flav){
            this.flavors = this.flavors.filter( flavor => {
                return flavor != flav
            })
        }
    }
}
</script>

<style>
.add {
    background: #e8505b;
    height: 100vh;
}

.container {
    padding:20px;
    max-width: 500px;
}

.container .form-title h2 {
    font-family: 'Oswald', sans-serif;
    margin: 0 auto;
    color: #fff;
    letter-spacing: 8px;
    font-family: 'Oswald', sans-serif;
}


.container form {
    margin-top: 80px;
    padding: 12px;
    font-family: 'Oswald', sans-serif;

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

.container .field {
    margin: 20px auto;
    position: relative;
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

.container .sandbox-button img {
    height: 100px;
    width: 100px;
    margin-top: 80px;
}

.container .sandbox-button span {
    display: block;
    font-family: 'Oswald', sans-serif;
    color: #fff;
    font-size: 1.2em;
    text-decoration: underline;
}

.container .sandbox-button span:hover{
    color: #f3ecc2;
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