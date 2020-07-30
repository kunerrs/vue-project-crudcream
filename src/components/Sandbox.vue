<template>
  <div class="sandbox">
     <div class="card" v-for="icecream in icecreams" :key="icecream.id">
        <div class="card-content">
            <i class="material-icons delete" @click="deleteIceCream(icecream.id)"> delete </i>
            <span class="card-title"> {{ icecream.title }}</span>
                <ul class="flavors">
                    <li v-for="(flav,index) in icecream.flavors" :key="index">
                        <span class="chip"> {{ flav }} </span>
                    </li>
                </ul>
        </div>
            <span class="btn-floating btn-large halfway-fab deep-purple accent-2">
                <router-link :to="{ name: 'Edit', params: { icecream_slug: icecream.slug} }">
                        <i class="material-icons edit">edit</i>
                </router-link>
            </span>
      </div>
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'Sandbox',
    data() {
        return {
            icecreams: []
        }
    },
    methods: {
        deleteIceCream(id){
            db.collection('icecreams').doc(id).delete()
                .then( () => {
                    this.icecreams = this.icecreams.filter( icecream => {
                        return icecream.id != id
                                  })
                    })
        }
    },
    created (){
        // Fetch at Created Hook ( Lifecycle Hook )
        db.collection('icecreams').get()
            .then( snapshot=> {
                snapshot.forEach( doc => {
                    let icecream = doc.data()
                    icecream.id = doc.id
                    this.icecreams.push(icecream)
                })
            })
    }
}
</script>

<style>

.sandbox {
   display: grid;
   grid-template-columns: 1fr 1fr 1fr;
   grid-gap: 20px;
   margin: 120px auto;
   max-width: 95vw;
   padding: 12px;
}

.sandbox .card-title{
    width: auto;
    text-align: center;
    font-weight: bold;
    color: rgb(75, 74, 74);
}

.sandbox .flavors {
    margin: 30px auto;
}

.sandbox .flavors li {
    display: inline-block;
}

.sandbox .chip {
    display: inline-block;
    font-size: 1em;
    background:#f3ecc2;
}

.sandbox .card .delete {
    position: absolute;
    top:4px;
    right: 4px;
    color: #aaa;
    cursor: pointer;
}

.sandbox .card .delete:hover {
    color: rgb(167, 39, 39);
    transform: rotate(360deg);
    transition: .7s ease;
}

.sandbox .card .edit {
    background: transparent;
}

.sandbox .card .edit:hover {
    color:#000;
}

</style>