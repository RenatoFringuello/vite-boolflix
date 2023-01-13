import { reactive } from "vue"
import axios from 'axios'

export const store = reactive({
    apiUrl:'https://api.themoviedb.org/3/search/',
    apiKey:'12faac57c6ce385924debc3b88eae9d3',
    dataRaw : [],
    filmList : [''],
    nPage : 0,
    isLoaded:false,
    /**
     * 
     * @param {*} location movie | tv
     */
    getData(location, query){
        this.isLoaded = false;
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
            this.isLoaded = true;
        })
    }
});