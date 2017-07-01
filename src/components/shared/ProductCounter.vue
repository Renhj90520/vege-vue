<template>
    <div class="row margin">
        <div class="col-md-3 col-sm-6 col-xs-12 paddingvertical" v-for="(product,index) in favorites" :product="product" :index="index">
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
                    <button class="btn btn-primary btn-xs" @click="decrement(index)">
                        <i class="glyphicon glyphicon-minus"></i>
                    </button>
                    <input class="form-control inline" disabled type="number" :value="product.Count" min="0">
                    <button class="btn btn-primary btn-xs" @click="increment(index)">
                        <i class="glyphicon glyphicon-plus"></i>
                    </button>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
var utils = require('./utils')
import { mapMutations } from 'vuex'
export default {
    // props: ['products'],
    data() {
        return {
        }
    },
    computed: {
        favorites() {
            return this.$store.getters.favorites
        }
    },
    methods: {
        ...mapMutations([
            'increment',
            'decrement'
        ])
        // onDecrease(product) {
        //     this.$emit('decrease', product)
        // },
        // onIncrease(product) {
        //     this.$emit('increase', product)
        // }
    }
}
</script>

