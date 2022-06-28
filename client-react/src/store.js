import { configureStore,createSlice } from '@reduxjs/toolkit'


let cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ]
})

let button = createSlice({
  name :'increase',
  initialState:{increase:0,decrease:0},
  reducers:{
    increase(state,number){
      state.increase+= number.payload
    },
    decrease(state,action){
      state.decrease+= action.payload
    },
  }
})

///쓸수있게 내보내주기 
export let{changeName,increase}=button.actions

export default configureStore({
  reducer: {
    button:button.reducer,
    cart:cart.reducer
   }
}) 