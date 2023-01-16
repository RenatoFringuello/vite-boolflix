import { reactive } from "vue"
import axios from 'axios'

export const store = reactive({
    // api 
    apiUrl:'https://api.themoviedb.org/3/',
    apiKey:'12faac57c6ce385924debc3b88eae9d3',
    // raw response
    dataRaw : [],
    //configuration
    configData:[],
    //search/movie|tv
    filmData : {data:[],isLoaded:false,isImgLoaded:false, currentPage:1},
    tvData : {data:[],isLoaded:false,isImgLoaded:false, currentPage:1},
    
    /**
     * 
     * @param {*} location movie | tv
     */
    getData(location, query){
        //reset movie or tv object
        if(location === 'search/movie'){
            this.filmData = {data:[],isLoaded:false,isImgLoaded:false, currentPage:1};
        }
        else{
            this.tvData = {data:[],isLoaded:false,isImgLoaded:false, currentPage:1};        
        }
        //get call 
        axios.get(this.apiUrl + location, {params:{
            api_key: this.apiKey,
            //if there isn' a query = if it's configuration
            ...(query != '')&& {query : query}
        }})
        .then((result)=>{
            //save raw data
            store.dataRaw = result.data;
        })
        .catch((error)=>{
            console.error('something went wrong :/\n', error);
        })
        .then(()=>{
            //do something after load data
            console.log(this.dataRaw);
            //object to give to filmData | tvData
            const requestObj = {
                data: this.dataRaw.results,
                isLoaded : true,
                isImgLoaded: this.filmData.isImgLoaded,
                currentPage : this.dataRaw.page
            };
            //do someting based on what is location
            switch (location) {
                case 'search/movie':
                    this.filmData = requestObj;
                    break;
                case 'search/tv':
                    this.tvData = requestObj;
                    break;
                case 'configuration':
                    //get the configuration for the images base_url & sizes
                    this.configData = this.dataRaw;
                    break;
            }
        })
    }
});