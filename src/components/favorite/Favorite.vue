<template>
    <div>
        <div v-if="favorites==null||favorites.length==0"> 暂无收藏 </div>
        <app-product-counter v-else></app-product-counter>
    </div>
</template>
<script>
import { baseUrl } from '../shared/settings.js'
import axios from 'axios'
var utils = require('../shared/utils.js')
import ProductCounter from '../shared/ProductCounter'
export default {
    components: {
        appProductCounter: ProductCounter
    },
    data() {
        return {
            productsIncart: []
        }
    },
    computed: {
        favorites() {
            return this.$store.state.favorite.favorites
        }
    },
    created() {
        this.productsIncart = JSON.parse(sessionStorage.getItem('cartproducts')) || []
        // let openid = sessionStorage.getItem('openid') || 'undefined'//TODO
        // axios.get(baseUrl + 'favorites/' + openid)
        //     .then(res => {
        //         debugger
        //         if (res.data.state == 1) {
        //             this.$store.favorites = res.data.body
        //             this.$store.favorites.forEach(function (fav) {
        //                 fav.Count = 0
        //             });
        //         } else {
        //             alert(res.data.message)
        //         }
        //     }).catch(err => {
        //         alert(err)
        //     })
        this.$store.dispatch('loadData')
    },
    // methods: {
    //     increase(product) {
    //         product.Count = utils.add(product.Count, product.Step)
    //     },
    //     decrease(product) {
    //         product.Count = utils.subtraction(product.Count, product.Step)
    //     }
    // }
}
</script>
