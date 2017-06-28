<template>
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
</template>
<script>
var utils = require('./utils')
export default {
    props: ['products'],
    data() {
        return {
        }
    },
    methods: {
        onDecrease(product) {
            this.$emit('decrease', product)
        },
        onIncrease(product) {
            this.$emit('increase', product)
        }
    }
}
</script>

