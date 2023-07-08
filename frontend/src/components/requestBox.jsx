const { Fragment } = require("react");
const { default: AddRequest } = require("./addRequest");
const { default: RequestItem } = require("./requestItem");
import { useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { getMyProduct, getProduct } from "../actions/productAction";
function RequestBox(props){
    const dispatch = useDispatch();
    const {products} = useSelector((state) => state.products);
    console.log(products);
    useEffect(()=>{
        dispatch(getMyProduct(props.user._id));
    },[dispatch , getMyProduct , props.user._id])
    return(
        <div id="requestBox">
            {products && products.map(product=>(
                            <RequestItem data={product}/>

                        ))}
            <AddRequest/>
        </div>
    )
}
export default RequestBox;