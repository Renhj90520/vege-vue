<template>
    <div>
        <div v-if="favorites==null||favorites.length==0"> 暂无收藏 </div>
        <app-product-counter :products="favorites" v-if="favorites!=null&&favorites.length>0"></app-product-counter>
    </div>
</template>
<script>
export default {
    data() {
        return {
            favorites: []
        }
    }
}
</script>
