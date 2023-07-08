import { useState , useEffect} from "react";
import { useSelector , useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { createProduct } from "../actions/productAction";
function AddRequest(){
    const dispatch = useDispatch();
    const alert = useAlert();
    // useEffect(()=>{},[dispatch , createProduct]);
    const [itemName , setItemName] = useState("");
    const [itemDesc , setItemDesc] = useState("");
    const [quantity , setQuantity] = useState( "");
    const [category , setCategory] = useState("");
    const [donatedBy , setDonatedBy] = useState("");
    const [check , setCheck] = useState(false);
    const handleName = (e)=>{
        setItemName(e.target.value);
    }
    const handleDesc = (e)=>{
        setItemDesc(e.target.value);
    }
    const handleQ = (e)=>{
        setQuantity(e.target.value);
    }
    const handleC = (e)=>{
        setCategory(e.target.value);
    }
    const handleDel=()=>{
        setItemName("");
        setItemDesc("");
        setQuantity("");
        setCategory("");
        alert.info("Fields Cleared !!")
    }
    const handleUpdate=()=>{
        const myForm = new FormData();

        myForm.set("name" , itemName);
        myForm.set("description" , itemDesc);
        myForm.set("Quantity" , quantity);
        myForm.set("category" , category);
        dispatch(createProduct(myForm));
        alert.info("Created Request !!");
    }
    return(
        <div className="requestItem">
                            <h3>Add Request</h3>
                            <div><input type="text" value={itemName} placeholder="Name" onChange={handleName} required /></div>
                            <div><input type="text" value={itemDesc} placeholder="Description" onChange={handleDesc} required /></div>
                            <div><input type="number" value={quantity} placeholder="Quantity" onChange={handleQ} required /></div>
                            <div><input type="text" value={category} placeholder="Category" onChange={handleC} required /></div>
                            <div className='options'>
                                <i class="uil uil-check" onClick={handleUpdate}></i>
                                <i class="uil uil-times" onClick={handleDel}></i>
                            </div>
        </div>
    )
}
export default AddRequest;