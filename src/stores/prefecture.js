import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import { areaItems } from './Area'

export const usePrefectureStore = defineStore('prefecture', {
    state: () => ({
        name:'',
        prefectures:'',
        elevation:'',
        temperature:'',
        wind:'',
        rain:'',
        rank:'',
        mountains:[],
        favoriteMountain:[],
        selectedArea:[],
        selectPrefecture:'',
        title:[],
        currentPrefecture:[]
    }),

    getters:{
        count:(state)=> state.mountains.length,
        favo:(state)=>state.favoriteMountain,
        totalElevation:(state)=> {
            return state.favoriteMountain.reduce((sum,item) => 
            {return sum+item.elevation},0)
            }
    },

    actions:{
        getMountainRank(
        temp,wind,rain){
        if(rain ===0 && wind < 5 &&temp>=5){
        return "A";}
        if(rain<1 && wind < 10 && temp >=0){
        return "B";}
        return "C";}
        ,
        favoriteM(mountain){
            const exists = this.favoriteMountain.some(item => item.name === mountain.name)
            console.log(exists)
            if (!exists) {
                this.favoriteMountain.push(mountain)
                //console.log(this.favoriteMountain.length)
            }else{
                alert("すでに追加されてます。")
            }
        },

        deleteM(index) {
            this.favoriteMountain.splice(index,1)
            console.log("消しました")
        },

        async selectMountain(prefID){
            let weather = ref(0)
            let current = ref(0)
            const result = []
            console.log("セレクト起動開始")
            const res = await axios.get(`https://mountix.codemountains.org/api/v1/mountains?tag=1&prefecture=${prefID}`)
            console.log(res.data.mountains)
            for(const mountain of res.data.mountains){
            console.log("for文開始", mountain.name,mountain.location.latitude)
            weather = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${mountain.location.latitude}&longitude=${mountain.location.longitude}&current=temperature_2m,precipitation,wind_speed_10m`)
            //await new Promise(resolve => setTimeout(resolve, 1000))
            console.log(weather.data.current.temperature_2m);
            current = weather.data.current
            result.push({
                name: mountain.name,
                prefectures: mountain.prefectures,
                elevation: mountain.elevation,
                temperature: current.temperature_2m,
                wind: current.wind_speed_10m,
                rain: current.precipitation,
                rank:this.getMountainRank(
                current.temperature_2m,
                current.wind_speed_10m,
                current.precipitation)
                })
            }
            this.mountains = result
        },

        clearList() {
             this.favoriteMountain = []
             alert("挑戦山岳リストを全部削除しました")
        }
// async loadMountain(prefID) {
//     console.log("起動開始")
// let weather = ref(0)
// let current = ref(0)
// const result = []
// const mountains = []
// const res = await axios.get(`https://mountix.codemountains.org/api/v1/mountains?tag=1&prefecture=${prefID}`);
// console.log("山情報取得")
// for(const mountain of res.data.mountains){
// //console.log("for文開始", mountain.name,mountain.location.latitude)
// weather = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${mountain.location.latitude}&longitude=${mountain.location.longitude}&current=temperature_2m,precipitation,wind_speed_10m`)
// //console.log(weather.data.current.temperature_2m);
// current = weather.data.current

// //console.log(current)
// //console.log(mountain)

// result.push({
// name: mountain.name,
// prefecture: mountain.prefectures,
// elevation: mountain.elevation,
// temperature: current.temperature_2m,
// wind: current.wind_speed_10m,
// rain: current.precipitation,
// rank:this.getMountainRank(
// current.temperature_2m,
// current.wind_speed_10m,
// current.precipitation)
// })
// }
// console.log("天気取得完了");
// //console.log(result[0])
// this.mountains  = result 
// //console.log(mountains.value)

// }}
    }
})