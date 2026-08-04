<script setup>
import { computed,ref,onMounted} from 'vue'
import { usePrefectureStore } from '../stores/prefecture'

const store = usePrefectureStore()

// actionsを呼び出す処理
const deleteM = (index) =>{
    store.deleteM(index)
}
 const totalElevation = computed(() => store.totalElevation) 

const clearList =store.clearList


</script>

<template>
<v-container>
                <div v-if="totalElevation === 0" >
                <p>あなたの挑戦を待ってます</p>
                </div>
        <div v-else>
    <p>挑戦標高 : {{ totalElevation }} m</p><br>
    <table border="1" class="mountains-list">
        <thead>
            <tr class="top-label">
                        <th>山名</th>
                        <th>都道府県</th>
                        <th>標高</th>
                        <th>気温</th>
                        <th>風速</th>
                        <th>降水量(mm)</th>
                        <th>登山指数</th>
                        <th>削除</th>
                        </tr>   
                    </thead>
                    <tbody>
                        <tr v-for="(favorite,index) in store.favoriteMountain" :key="favorite.name">
                        <td>{{favorite.name}}</td>
                        <td>{{favorite.prefectures.join()}}</td>
                        <td class="list">{{favorite.elevation}} m</td>
                        <td class="list">{{favorite.temperature}} °C</td>
                        <td class="list">{{favorite.wind}} km/h </td>
                        <td class="list">{{favorite.rain}} mm</td>
                        <td class="list-center">{{ favorite.rank }}</td>
                        <td class="list favorite">
                            <button v-on:click="deleteM(index)">
                            ×
                            </button>
                        </td>
                        </tr>
                    </tbody>
                    </table><br>
                    <div class=vbtn>
                    <v-btn  size="small" v-on:click="clearList">お気に入りを全削除  
                    </v-btn> 
                    </div>
                    </div>
                    
</v-container>
</template>

<style scoped>
/* 都道府県ボタン */
.body{
    text-align: center;
}
.mountains-list{
      margin: 0 auto;
}
p{
    font-size: large;
    text-align: center;
}
.vbtn{
    margin: 0 auto;   
    text-align: center;
}

</style>