<template>
    <div>
        <div class="visible-sm visible-xs">
            <img class="image-responsive" src="../../assets/images/banner.png" alt="banner" width="100%">
        </div>
        <div class="row">
            <div class="col-xs-3" v-for="category in categories" :category="category">
                <img class="categories img-responsive" :src="category.IconPath" alt="icon" role="button" @click="onCategoryClick(category.Id)">
                <p class="catename">{{category.Name}}</p>
                <!--<img src="http://placehold.it/60x60" class="categories" alt="icon" role="button" @click="onCategoryClick(category.id)">-->
            </div>
        </div>
        <app-product-counter :products="products" @increase="increase" @decrease="decrease"></app-product-counter>
        <div v-if="products.length<=0">
            <hr>
            <p class="no-product">暂无商品</p>
        </div>
        <div class="btn-pay" role="button" v-if="productsIncart.length>0" @click="gotoOrder()">
            结算
            <span class="badge">{{productsIncart.length}}</span>
        </div>
    </div>
</template>
<script>
import { baseUrl } from '../shared/settings.js'
import AppProductCounter from '../shared/ProductCounter.vue'
import axios from 'axios'
export default {
    components: {
        appProductCounter: AppProductCounter
    },
    data() {
        return {
            products: [],
            categories: [],
            productsIncart: [],
            category: {},
            product: {}
        }
    },
    created() {
        const vm = this;
        axios.get(baseUrl + 'categories').then(function (res) {
            if (res.data.state == 1) {
                vm.categories = res.data.body;
            } else {
                alert(res.data.message);
            }
        }).catch(function (err) {
            console.log(err)
        })
        axios.get(baseUrl + 'products')
            .then(function (res) {
                if (res.data.state == 1) {
                    vm.products = res.data.body.items;
                    vm.products.forEach(function (product) {
                        product.Count = 0;
                    });
                } else {
                    alert(res.data.message)
                }
            }).catch(function (err) {
                console.log(err)
            })
    },
    methods: {
        onCategoryClick(cateid) {
            console.log('-----------cateId:' + cateid)
        },
        increase(index) {
            console.log('----------index:' + index)
        },
        decrease(index) {
            console.log('----------index:' + index)
        }
    }
}
</script>
<style scoped>
.categories {
    border: 3px solid white;
    width: 60px;
    height: 60px;
    margin: 0 auto;
}

.categories+p {
    text-align: center;
}

.carousel-inner {
    min-height: 200px;
}

.catename {
    color: #0272e2;
    font-weight: bold;
}

.no-product {
    text-align: center;
    color: orange;
}

.btn-pay {
    width: 50px;
    height: 50px;
    background-color: #fe1914;
    border: 1px solid white;
    border-radius: 50%;
    text-align: center;
    padding-top: 10px;
    color: white;
    position: fixed;
    bottom: 20px;
    right: 20px;
    box-shadow: 1px 1px 5px #951a08;
}

.btn-pay .badge {
    background-color: #ff8003;
}
</style>
