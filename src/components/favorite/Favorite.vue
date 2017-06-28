<template>
    <div>
        <div v-if="favorites==null||favorites.length==0"> 暂无收藏 </div>
        <app-product-counter :products="favorites" @increase="increase" @decrease="decrease" v-if="favorites!=null&&favorites.length>0"></app-product-counter>
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
            favorites: [],
            productsIncart: []
        }
    }, created() {
        this.productsIncart = JSON.parse(sessionStorage.getItem('cartproducts')) || []
        let openid = sessionStorage.getItem('openid') || 'undefined'//TODO
        axios.get(baseUrl + 'favorites/' + openid)
            .then(res => {
                if (res.data.state == 1) {
                    this.favorites = res.data.body
                    this.favorites.forEach(function (fav) {
                        fav.Count = 0
                    });
                } else {
                    alert(res.data.message)
                }
            }).catch(err => {
                alert(err)
            })
    },
    methods: {
        increase(product) {
            product.Count = utils.add(product.Count, product.Step)
        },
        decrease(product) {
            product.Count = utils.subtraction(product.Count, product.Step)
        }
    }
}
</script>
