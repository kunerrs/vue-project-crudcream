<template>
    <div class="navbar">
        <nav class="nav-extended"> 
            <div class="nav-content">
                <router-link :to="{ name: 'Index' }">
                    <h2 class="center-align">Ice Cream</h2> 
                </router-link>
            </div>
        </nav>   
    </div>
  
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return{
            
        }
    }
}
</script>

<style>

nav {
    background: #e8505b;
}
.navbar nav h2 {
    margin: 0;
    padding: 8px;
    font-family: 'Sacramento', cursive;
}

.navbar nav h2:hover {
    color: black;
}

</style>