import { useState , useEffect} from "react";
import { useSelector , useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { deleteProduct, updateProduct } from "../actions/productAction";
import { getAllUsers, getUserDetails } from "../actions/userAction";
function RequestItem(props){
    const dispatch = useDispatch();
    const alert = useAlert();
    const {userDetails } = useSelector(state => state.userDetails);
    const [itemName , setItemName] = useState(props.data.name ? props.data.name : "");
    const [itemDesc , setItemDesc] = useState(props.data.description ? props.data.description : "");
    const [quantity , setQuantity] = useState(props.data.Quantity ? props.data.Quantity : "");
    const [category , setCategory] = useState(props.data.category ? props.data.category : "");
    const [donatedBy , setDonatedBy] = useState("");
    const [check , setCheck] = useState(props.data.status ? props.data.status : false);
    const [edit , setEdit] = useState(false);
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
    const handleCheck = (e)=>{
        setCheck(e.target.checked);
    }
    const handleDonatedBy = (e)=>{
        setDonatedBy(e.target.value);

    }
    const handleDel=()=>{
        dispatch(deleteProduct(props.data._id));
        alert.info("Deleted !!");
    }
    const handleUpdate=()=>{
        if(!check){
            const myForm = new FormData();

            myForm.set("name" , itemName);
            myForm.set("description" , itemDesc);
            myForm.set("Quantity" , quantity);
            myForm.set("category" , category);
            dispatch(updateProduct(myForm));
        }else{
            dispatch(getAllUsers(donatedBy));
            const requestForm = new FormData();
            requestForm.set("name" , itemName);
            requestForm.set("description" , itemDesc);
            requestForm.set("Quantity" , quantity);
            requestForm.set("category" , category);
            requestForm.set("user" , props.data.user);
            requestForm.set("createdAt" , props.data.createdAt);
            const myForm = new FormData();
            myForm.set("requestedUserID" , props.data.user);
            myForm.set("requestInfo" , requestForm);
            myForm.set("user" , userDetails);
        }
        console.log("deleted");
    }
    const handleEdit=()=>{
        alert.info("Edit Enabled !!");
        setEdit(!edit);
    }
    return(
        <div className="requestItem">
                        <div className="topPanel">

                            <div className="requestName"><input type="text" value={itemName} placeholder="Name" onChange={handleName} required disabled={!edit}/></div>
                            <div className="requestDesc"><input type="text" value={itemDesc} placeholder="Description" onChange={handleDesc} required disabled={!edit}/></div>
                            <div className="requestQuan"><input type="number" value={quantity} placeholder="Quantity" onChange={handleQ} required disabled={!edit}/></div>
                            <div className="requestCateg"><input type="text" value={category} placeholder="Category" onChange={handleC} required disabled={!edit}/></div>
                        </div>
                        <div className="bottomPanel">
                            <div className="requestDon">Donated ? <input type="checkbox" checked={check} onChange={handleCheck} required disabled={!edit}/> </div>
                            <div className="requestEmail"><input type="text" value={donatedBy} placeholder="E-mail" onChange={handleDonatedBy} required={check} disabled={!check || !edit} /></div>
                            <div className='options'>
                                <i class="uil uil-pen" onClick={handleEdit}></i>
                                <i class="uil uil-check" onClick={handleUpdate}></i>
                                <i class="uil uil-times" onClick={handleDel}></i>
                            </div>
                        </div>
        </div>
    )
}

export default RequestItem;
