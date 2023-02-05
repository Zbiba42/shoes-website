import { createSlice } from '@reduxjs/toolkit'

const StoreMode = createSlice({
  name: 'StoreMode',
  initialState: {
    storeMode : 'user'
  } ,
  reducers: {
    SetStoreMode(state , action){
        if(action.payload.storeMode === 'user'){
            state.storeMode = 'user'
        }else if(action.payload.storeMode === 'seller'){
            state.storeMode = 'seller'
        }
    }
  },
})

export const { SetStoreMode } = StoreMode.actions

export default StoreMode.reducer