//context creation 
//provider
//consumer (but it is lengthy process so replaced by context hook)
//useContext hook
import React, { useContext } from "react";
import { useReducer,useEffect } from "react";
import reducer from "./reducer";

let API="https://hn.algolia.com/api/v1/search?";
const initialState={
  isLoading:true,
  query:"javascript",
  nbPages:0,
  page:0,
  hits:[],
};

const AppContext=React.createContext();

//create a provider function
const AppProvider=({children})=>{

    const [state, dispatch] = useReducer(reducer,initialState);
   
   
    const fetchApiData=async (url)=>{
        dispatch(({type:"SET_LOADING"}));
        try{
            const res=await fetch(url);
            const data=await res.json();
            console.log(data);
            dispatch({type:"GET_STORIES",
                      payload:{
                        hits:data.hits,
                        nbPages:data.nbPages
                      },
                    });
        }
        catch(error)
        {
            console.log(error)
        }
    };
    //to remove the post
    const removePost=(post_ID)=>{
        dispatch({type:"Remove_Post",payload:post_ID});

    };
    //search 
    const searchPost=(searchQuery)=>{
        dispatch({type:"Search_Query",
       payload:searchQuery,});
    }
    //pagination
    const getNextPage=()=>{
        dispatch({
            type:"Next_Page",
        });
    }
    const getPrevPage=()=>{
        dispatch({
            type:"Prev_Page",
        });
    }
    useEffect(()=>{
        fetchApiData(`${API}query=${state.query}&page=${state.page}`); 
    },[state.query,state.page]);
    return(
        <AppContext.Provider value={{...state,removePost,searchPost,getNextPage,getPrevPage}}>
            {children}
        </AppContext.Provider>
    )
};
//custom hook using use keyword
const useGlobalContext=()=>{
    return useContext(AppContext);
};

export {AppContext,AppProvider,useGlobalContext};