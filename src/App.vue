<template>
  <div class="bg-gray-100  pt-0 sm:pt-6">

    <div class="container-2xl mx-0 sm:mx-[24px] ">
      <div class="bg-white rounded-lg p-4">
        <div class=" shadow-sm max-w-[440px] border border-gray-300 rounded-md px-[13px] py-[9px]">
          <p class="text-xs leading-4 font-medium text-gray-700">Тикер</p>
          <input style="font-family: 'Euclid Square'"
                 class="font-['Euclid Square'] w-full text-base leading-6 font-normal text-gray-600"
                 placeholder="Например DOGE"
                 v-model="ticker"
          />
        </div>
        <button
            class=" text-base leading-6 font-medium font-['Inter'] mt-[12px] bg-indigo-600 shadow-sm rounded-md px-[25px] py-[13px] text-white"
            @click="addTicker"
        >Добавить
        </button>
      </div>
    </div>

    <div class="container-2xl mx-[16px] sm:mx-[24px]">
      <div
          class="flex items-center px-[13px] py-[9px] mt-[16px] bg-white border border-gray-300 rounded-md max-w-[456px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
              d="M17.5 17.5L12.5 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z"
              stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <input style="font-family: 'Euclid Square'"
               class="font-['Euclid Square'] w-full text-base leading-6 font-normal ml-[10px] text-gray-600"
               placeholder="Найти"
               v-model="filter"
        />
      </div>
    </div>

    <div class="container-2xl mx-[16px] sm:mx-[24px] pb-[78px] sm:pb-0">
      <div class="mt-[18px] flex flex-wrap gap-x-[12px] gap-y-[16px]">
        <div v-for="item in filteredTickers()" :key="item.id"  class="w-[456px]">
          <div :class="{ 'border-gray-900 border-[3px]': idForGraf===item.id}" @click="addGrah(item.id)"
               class="px-[20px] py-[16px] border border-gray-300 rounded-md bg-white">
            <div class="flex">
              <p class="w-full text-sm leading-5 font-medium text-gray-900">{{ item.name }}</p>
              <svg class="cursor-pointer" @click="delTicker(item)" xmlns="http://www.w3.org/2000/svg" width="20"
                   height="20" viewBox="0 0 20 20" fill="none">
                <path
                    d="M15.8335 5.83333L15.1107 15.9521C15.0484 16.8243 14.3227 17.5 13.4483 17.5H6.55203C5.67763 17.5 4.9519 16.8243 4.8896 15.9521L4.16683 5.83333M8.3335 9.16667V14.1667M11.6668 9.16667V14.1667M12.5002 5.83333V3.33333C12.5002 2.8731 12.1271 2.5 11.6668 2.5H8.3335C7.87326 2.5 7.50016 2.8731 7.50016 3.33333V5.83333M3.3335 5.83333H16.6668"
                    stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p style="font-family: 'Euclid Square'" class="p-0 text-4xl leading-10 font-normal text-gray-900">
              {{ item.price }}$
            </p>
          </div>
          <div v-if="graph.length && idForGraf==item.id"
               class="flex sm:hidden items-end h-[256px] p-[20px] bg-white rounded-lg mt-[16px]">
            <div
                v-for="(bar, idx) in normalizedGraph"
                :key="idx"
                :style="{ height: `${bar}%` }"
                class="bg-yellow-300 w-[34px]"
            ></div>
          </div>
        </div>

      </div>
      <div>
        <div v-if="graph.length" class="hidden sm:flex items-end h-[256px] p-[20px] bg-white rounded-lg mt-[16px]">
          <div
              v-for="(bar, idx) in normalizedGraph"
              :key="idx"
              :style="{ height: `${bar}%` }"
              class="bg-yellow-300 w-[34px]"
          ></div>
        </div>
      </div>
    </div>

    <div v-if="Allticker.length > 6" class="container-2xl mx-0 sm:mx-[24px] w-full fixed bottom-0 sm:relative sm:w-auto">
      <div>
        <div class="mt-[24px] h-[1px] bg-gray-200"></div>
        <div class="flex justify-between py-0 sm:py-[12px] bg-white sm:bg-gray-100">
          <p style="font-family: 'Euclid Square'" class="hidden sm:flex text-sm leading-5 font-normal">Показано {{ filteredTickers().length }}
            результатов из {{Allticker.length}}</p>
          <div class="flex justify-between w-full sm:w-[175px] px-[16px] py-[13px] sm:px-0 sm:py-0">
            <button @click="Dpage"
                    class="px-[17px] py-[9px] shadow-sm border border-gray-300 rounded-md bg-white text-sm leading-5 font-medium"
            >Назад
            </button>
            <button @click="Ipage"
                    class="ml-0 sm:ml-[12px] px-[17px] py-[9px] shadow-sm border border-gray-300 rounded-md bg-white text-sm leading-5 font-medium"
            >Вперед
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
import {ccStreamer} from "./api";
export default {
  name: "App",
  data() {
    return {
      ticker: '',
      Allticker: [],
      page: 1,
      filter: '',
      hasNextPage: true,
      idForGraf: null,
      graph: [],
    };
  },
  created() {
    ccStreamer.onmessage=(e)=>{
      this.addAllticker(JSON.parse(e.data))
      console.log(this.idForGraf)
      if(this.idForGraf){
        this.Allticker.forEach(item=>{
          if(item.id == this.idForGraf){
            this.graph.push(item.price)
          }
        })
      }
    }
    this.Allticker = JSON.parse(localStorage.getItem('Allticker'))? JSON.parse(localStorage.getItem('Allticker')) : []
  },
  mounted() {
    ccStreamer.onopen= (e)=>{
      this.Allticker.forEach(item=>{
        console.log(item.name)
        this.sub(item.name)
      })
    }
  },
  deactivated() {
    this.closeW()
  },
  methods: {
    addGrah(id){
      this.idForGraf = id
      console.log(this.idForGraf)
    },


    sub(name){
      let subRequest = {
        "action": "SubAdd",
        "subs": [`2~Coinbase~${name.toUpperCase()}~USD`]
      };
      ccStreamer.send(JSON.stringify(subRequest));
    },
    addAllticker(item){
      this.Allticker.map(e=>{
        if(e.name == item.FROMSYMBOL){
          e.price = item.PRICE
        }
      })
    },
    closeW(){
      console.log('close')
      ccStreamer.close()
    },
    filteredTickers() {
      const start = (this.page - 1) * 6;
      const end = this.page * 6;
      const filteredTickers = this.Allticker.filter(ticker => ticker.name.includes(this.filter));
      this.hasNextPage = filteredTickers.length > end;
      return filteredTickers.slice(start, end);
    },
    addTicker(){
      let subRequest = {
        "action": "SubAdd",
        "subs": [`2~Coinbase~${this.ticker.toUpperCase()}~USD`]
      };
      ccStreamer.send(JSON.stringify(subRequest));
      let te = {id: Date.parse(new Date()), name:this.ticker.toUpperCase(), price: 0}
      this.Allticker.push(te)
      localStorage.setItem('Allticker', JSON.stringify(this.Allticker))
    },
    delTicker(ticker){
      this.Allticker = this.Allticker.filter(item=>item.id !== ticker.id)
      localStorage.setItem('Allticker', JSON.stringify(this.Allticker))
      if(!this.Allticker.find(item=>item.name == ticker.name)){
        console.log(ticker)
        let subRequest = {
          "action": "SubRemove",
          "subs": [`2~Coinbase~${ticker.name.toUpperCase()}~USD`]
        };
        ccStreamer.send(JSON.stringify(subRequest));
      }
    },
    Ipage(){
      if(this.hasNextPage){
        this.page += 1
      }
    },
    Dpage(){
      this.page > 1? this.page -= 1 : this.page = 1
    },
  },
  computed:{
    normalizedGraph() {
      const maxValue = Math.max(...this.graph);
      const minValue = Math.min(...this.graph);
      if (maxValue === minValue) {
        return this.graph.map(() => 50);
      }
      return this.graph.map(
          price => 5 + ((price - minValue) * 95) / (maxValue - minValue)
      );
    },
  },
  watch: {
    filter(){
      this.page = 1
      console.log('filter',this.filter)
    },
    idForGraf(){
      this.graph = []
    }
  }
};

</script>
<style>

</style>
