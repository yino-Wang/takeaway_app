import axios from "axios";

const { createSlice } = require("@reduxjs/toolkit");



const createStore = createSlice({
    name: 'foods',
    initialState: {
        // foods list
        foodsList: [],
        activeIndex: 0,
        cartList: []
    },
    reducers: {
        setFoodsList(state, action){
            state.foodsList = action.payload;
        },
        setActiveIndex(state,action){
            state.activeIndex = action.payload;
        },
        setCartList(state, action) {
            const item = state.cartList.find(i => i.id === action.payload.id);
            if (item) {
              item.count += 1;
            } else {
              // 初始化 count 为 1（关键点）
              state.cartList.push({ ...action.payload, count: 1 });
            }
          },
          
    // count增
    increCount (state, action) {
        // 关键点：找到当前要修改谁的count id
        const item = state.cartList.find(item => item.id === action.payload.id)
        item.count++
      },
      // count减
      decreCount (state, action) {
        // 关键点：找到当前要修改谁的count id
        const item = state.cartList.find(item => item.id === action.payload.id)
        if (item.count === 0) {
          return
        }
        item.count--
      },
      // 清除购物车 state表当前状态
      clearCart (state) {
        state.cartList = []
      }
    }
})

const{setFoodsList,setActiveIndex,setCartList, increCount, decreCount, clearCart } = createStore.actions;
const url = "http://localhost:3004/takeaway";
const fetchList = () => {
    return async (dispatch) => {
        const res = await axios.get(url);
        dispatch(setFoodsList(res.data));
    }
}

export { fetchList, setActiveIndex, setCartList, increCount, decreCount, clearCart}
const reducer = createStore.reducer;
export default reducer 