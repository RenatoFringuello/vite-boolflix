import { reactive } from "vue"
import axios from 'axios'

export const store = reactive({
    apiUrl:'https://api.themoviedb.org/3/search/',
    apiKey:'12faac57c6ce385924debc3b88eae9d3',
    dataRaw : [],
    filmData : {data:[],isLoaded:false,isImgLoaded:false, currentPage:1},
    tvData : {data:[],isLoaded:false,isImgLoaded:false, currentPage:1},
    /**
     * 
     * @param {*} location movie | tv
     */
    getData(location, query){
        if(location === 'movie'){
            this.filmData = {data:[],isLoaded:false,isImgLoaded:false, currentPage:1};
        }
        else{
            this.tvData = {data:[],isLoaded:false,isImgLoaded:false, currentPage:1};        
        }
        
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
            console.log(this.dataRaw)
            //do something after load data
            const requestObj = {
                data: this.dataRaw.results,
                isLoaded : true,
                isImgLoaded: this.filmData.isImgLoaded,
                currentPage : this.dataRaw.page
            };
            if(location === 'movie'){
                this.filmData = requestObj;
            }
            else{
                this.tvData = requestObj;
            }
        })
    }
});