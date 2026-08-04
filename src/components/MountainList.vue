<script setup>
import { computed,ref,onMounted,createApp} from 'vue'
import { usePrefectureStore } from '../stores/prefecture'
import { areaItems } from '../stores/Area'

const store = usePrefectureStore();
const area = areaItems;
let test = ref([]);

// actionsを呼び出す処理
//const mori = store.mori()
//onMounted(async () => {await store.loadMountain()})
//console.log("actions呼び出し")
const favoriteM = (mountain) => {
    store.favoriteM(mountain)
}
const count = computed(() => store.count)
//const favo = computed(() => store.favo)

function selectPrefecture(prefID){
    //console.log(area.Items[pref][0].title);
    console.log(prefID)
}
</script>

<template>
    <div class="body">
    <v-container>
        <p>以下から都道府県を選択して下さい</p>
            <v-btn href="#" @click.prevent="store.selectMountain(8)">茨城県</v-btn>
            <v-btn href="#" @click.prevent="store.selectMountain(9)">栃木県</v-btn>
            <v-btn href="#" @click.prevent="store.selectMountain(10)">群馬県</v-btn>
            <v-btn href="#" @click.prevent="store.selectMountain(11)">埼玉県</v-btn><br>
            <v-btn href="#" @click.prevent="store.selectMountain(12)">千葉県</v-btn>
            <v-btn href="#" @click.prevent="store.selectMountain(13)">東京都</v-btn>
            <v-btn href="#" @click.prevent="store.selectMountain(14)">神奈川県</v-btn>
            <v-btn href="#" @click.prevent="store.selectMountain(19)">山梨県</v-btn>
            <v-btn href="#" @click.prevent="store.selectMountain(20)">長野県</v-btn><br><br>

            <div v-if="count===0" >
                <p>都道府県が選択されていません</p>
                </div>
            <div v-else>
                <p>表示件数 : {{ count }} 件</p>
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
                    <th>挑戦？</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="mountain in store.mountains" :key="mountain.name">
                    <td>{{mountain.name}}</td>
                    <td>{{mountain.prefectures.join()}}</td>
                    <td class="list">{{mountain.elevation}} m</td>
                    <td class="list">{{mountain.temperature}} °C</td>
                    <td class="list">{{mountain.wind}} km/h </td>
                    <td class="list">{{mountain.rain}} mm</td>
                    <td class="list-center">{{ mountain.rank }}</td>
                    <td class="list favorite">
                    <v-btn size="small" v-on:click="favoriteM(mountain)">Yes!  
                    </v-btn> 
                    </td>
                    </tr>
                </tbody>
        </table>
            </div>
    </v-container>
    </div>
</template>

<style scoped>
.body{
    text-align: center;
}
.mountains-list{
      margin: 0 auto;
}

</style>