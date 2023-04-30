

const reducer=(state,action)=>{
    
    switch(action.type){
        case "SET_LOADING":
            return {
                ...state,
                isLoading:true,
            }
        case "GET_STORIES":
             return {
               ...state,
               isLoading:false,
            hits:action.payload.hits,
            nbPages:action.payload.nbPages
             };
        case "Remove_Post":
            return{
                ...state,
                hits:state.hits.filter(
                (curElem)=>curElem.objectID !=action.payload
                ),
            };
        case "Search_Query":
            return {
                ...state,
                query:action.payload,
            };
        case "Next_Page":
           let  pageNuminc=state.page+1;
             if(pageNuminc>=state.nbPages)
             {
                pageNuminc=0;
             }
             

            return{
              ...state,
               page:pageNuminc,

                };
        case "Prev_Page":
            let pageNum=state.page-1;
            if(pageNum<=0)
            {
                pageNum=0;
            }
           
            return{
           ...state,
           page:pageNum,
             };
          default:
            return {
                ...state,
            }

    }
    return state;
};

export default reducer;