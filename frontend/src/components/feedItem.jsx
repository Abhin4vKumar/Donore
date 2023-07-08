import { useSelector , useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserDetails } from "../actions/userAction";

function FeedItem(props){
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.userDetails);
    useEffect(()=>{
        dispatch(getUserDetails(props.data.user));
    },[dispatch , getUserDetails ,props.data.user ])
    return(
        <div className='feedItem'>
                            <div className='userInfo'>
                                <div className='avatar'>
                                    <img src={""}/>
                                </div>
                                <h5>{user.name}</h5>
                            </div>
                            <div className='requestItem'>
                                <div className='itemName'>
                                {props.data.name}
                                </div>
                                <p className='itemDesc'>
                                {props.data.description}
                                </p>
                                <p className='itemQuantity'>
                                    Quantity:{props.data.Quantity}
                                </p>
                                <p className='itemCategory'>
                                    {props.data.category}
                                </p>
                                <input className="donateButton" type='button' value={"donate"}/>
                            </div>
                        </div>
    )
}
export default FeedItem;