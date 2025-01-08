import { debounce as _debounce } from "lodash";


const WAIT_TIME = 1500;
const MAX_WAIT = 1;


export const debounce = (func)=>{
    return _debounce(func, WAIT_TIME, { maxWait: MAX_WAIT, leading:true });
}