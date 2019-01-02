import { createStore } from "redux";
import rootReducer from "./index";
const store = createStore(rootReducer);
const dispatch = store.dispatch;
export { dispatch };
export default store;
