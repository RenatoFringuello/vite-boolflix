import { reactive } from "vue"
import axios from 'axios'

export const store = reactive({
    dataRaw : [],
    filmList : [''],
    nPage : 0,
    apiUrl:'https://api.themoviedb.org/3/search/',
    apiKey:'12faac57c6ce385924debc3b88eae9d3',
    /**
     * 
     * @param {*} location movie | tv
     */
    getData(location, query){
        //usa postman ci sono problemi
        axios.get(this.apiUrl + location, {params:{
            api_key: this.apiKey,
            query : query
        }})
        .then((result)=>{
            store.dataRaw = result.data;
        })
        .catch((error)=>{
            console.error('something went wrong :/\n', error);
        })
        .then(()=>{
            //do something after load data
            this.filmList = this.dataRaw.results;
            this.nPage = this.dataRaw.page;
        })
    }
});