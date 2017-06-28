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
        <div class="row margin">
            <div class="col-md-3 col-sm-6 col-xs-12 paddingvertical" v-for="(product,index) in products" :product="product" :index="index">
                <div class="pic" v-if="product.Pictures">
                    <router-link tag="a" :to="{name:'productdetail',params:{id:3}}">
                        <img class="productimg img-responsive" :src="product.Pictures[0].Path" alt>
                    </router-link>
                </div>
                <div class="info">
                    <router-link tag="a" :to="{name:'productdetail',params:{id:product.Id}}">
                        <p class="font-middle gray bold">{{product.Name}}</p>
                        <p class="font-large red bold">￥{{product.Price}}/{{product.UnitName}}</p>
                    </router-link>
                    <p>
                        <button class="btn btn-primary btn-xs" @click="onDecrease(product)">
                            <i class="glyphicon glyphicon-minus"></i>
                        </button>
                        <input class="form-control inline" disabled type="number" v-model="product.Count" min="0">
                        <button class="btn btn-primary btn-xs" @click="onIncrease(product)">
                            <i class="glyphicon glyphicon-plus"></i>
                        </button>
                    </p>
                </div>
            </div>
        </div>
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
var utils = require('../shared/utils.js')
export default {
    // components: {
    //     appProductCounter: AppProductCounter
    // },
    data() {
        return {
            products: [],
            categories: [],
            productsIncart: [],
            category: {},
            product: {}
        }
    },
    async created() {
        this.productsIncart = JSON.parse(sessionStorage.getItem("cartproducts")) || []
        try {
            const cateres = await axios.get(baseUrl + 'categories')
            this.categories = cateres.data.body
            if (this.categories.length > 0) {
                this.products.splice(0, this.products.length)
                let prores = await axios.get(baseUrl + 'products' + '?' + 'category=' + this.categories[0].Id)
                prores.data.body.items.forEach(p => {
                    p.Count = 0;
                    this.products.push(p)
                });
                if (this.productsIncart.length > 0) {
                    this.productsIncart.forEach((pc, index) => {
                        let pp = this.products.find(pi => pi.Id == pc.Id);
                        if (pp) {
                            let pic = this.productsIncart[index];
                            pp.Count = pic.Count;
                            this.productsIncart[index] = pp;
                        }
                    })
                }
            }
        } catch (error) {
            alert(error)
        }
    },
    methods: {
        async onCategoryClick(cateid) {
            let prores = await axios.get(baseUrl + 'products' + '?' + 'category=' + cateid)
            this.products.splice(0, this.products.length)
            prores.data.body.items.forEach(p => {
                p.Count = 0;
                this.products.push(p)
            });
            if (this.productsIncart.length > 0) {
                this.productsIncart.forEach((pc, index) => {
                    let pp = this.products.find(pi => pi.Id == pc.Id);
                    if (pp) {
                        let pic = this.productsIncart[index];
                        pp.Count = pic.Count;
                        this.productsIncart[index] = pp;
                    }
                })
            }
        },
        onIncrease(product) {
            // let product = this.products[index];
            product.Count = utils.add(product.Count, product.Step)
            if (this.productsIncart.indexOf(product) < 0) {
                this.productsIncart.push(product);
            }

            if (this.productsIncart.length > 0) {
                sessionStorage.setItem('cartproducts', JSON.stringify(this.productsIncart));
            }
        },
        onDecrease(product) {
            // let product = this.products[index];

            product.Count = utils.subtraction(product.Count, product.Step);
            if (product.Count < 0) {
                product.Count = 0;
            }

            let i = this.productsIncart.indexOf(product);
            if (product.Count == 0) {
                if (i >= 0) {
                    this.productsIncart.splice(i, 1);
                }
            }
            if (this.productsIncart.length > 0) {
                sessionStorage.setItem('cartproducts', JSON.stringify(this.productsIncart))
            } else {
                sessionStorage.removeItem('cartproducts')
            }
        }, gotoOrder() {
            if (this.productsIncart.length > 0) {
                sessionStorage.setItem('cartproducts', JSON.stringify(this.productsIncart));
                this.$router.push('order')
            } else {
                alert("未选择任何商品！")
            }
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
