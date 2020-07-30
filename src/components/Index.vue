<template>
  <div class="index">
    <div class="container center-align">
        <div class="ice-cream">
            <img :src="Img" alt="Ice Cream Logo">
        </div>
        <div class="index-text flow-text">
          <p>This is a Simple CRUD Web App <br> Created with VueJS, MaterializeCSS & Firebase ( Firestore )</p>
        </div>
        <div class="index-button">
          <span class="btn btn-large"> 
              <router-link :to="{ name: 'Add' }"> Get Started </router-link>
          </span>
        </div>
    </div>
  </div>
</template>

<script>
import Img from '@/assets/ice-cream.svg'

export default {
  name: 'Index',
  data () {
    return {
      Img,
    }
  }
}
</script>


<style>

/* Collor Palette 
    Pink #e8505b;
    Yellow #f3ecc2;
    Turqoiuse #14b1ab;

 */

.index {
  background: #e8505b;
  height: 100vh;
}

.container {
  height: 100%;
  width: 100%;
}


.index .container img {
  margin-top: 120px;
  height: 180px;
  width: 180px;
  background: #fff;
  border-radius: 50%;
  padding: 8px;
}

.index .container img:hover{
  transform: rotate(360deg);
  transition: .8s ease;
}

.index .container p {
  height: 100px;
  text-align: center;
  color: white;
  font-family: 'Oswald', sans-serif;
  font-weight: 200;

}

.index .container span a {
  color: black;
  font-family: 'Oswald', sans-serif;
  font-weight: 400;
}

.index .container .btn {
  background: #f3ecc2;
}

.index .container .btn:hover{
  background: rgb(223, 234, 247);
}

</style>
