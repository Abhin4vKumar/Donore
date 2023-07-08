import React, { useState , useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import './dashStyle.css';
import { Fragment } from 'react';
import { getUserDetails, logout } from '../actions/userAction';
import FeedItem from './feedItem';
import { getProduct } from '../actions/productAction';
import RequestItem from './requestItem';
import AddRequest from './addRequest';
import RequestBox from './requestBox';

function DashBoardObj() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading, isAuthenticated , user} = useSelector(
        (state) => state.user
      );
    const {products} = useSelector((state) => state.products);
    useEffect(()=>{

        dispatch(getProduct(""));
    } , [dispatch , getProduct])
    console.log(products);
    // useEffect(()=>{
    //     if(isAuthenticated){
            
    //     }
    // })
    const [feedActive, setFeedActive] = useState(true);
    const [profileActive, setProfileActive] = useState(false);
    const [requestsActive, setRequestsActive] = useState(false);
    // const [donationsActive, setDonationsActive] = useState(false);
    // const [settingsActive , setSettingsActive] = useState(false);
    
    const handleFeed = (e) =>{
        setFeedActive(true);
        setProfileActive(false);
        setRequestsActive(false);
        // setDonationsActive(false);
        // setSettingsActive(false);
    };
    const handleProfile = (e) =>{
        setFeedActive(false);
        setProfileActive(true);
        setRequestsActive(false);
        // setDonationsActive(false);
        // setSettingsActive(false);
    };
    const handleRequest = (e) =>{
        setFeedActive(false);
        setProfileActive(false);
        setRequestsActive(true);
        // setDonationsActive(false);
        // setSettingsActive(false);
    };
    const handleDonation = (e) =>{
        setFeedActive(false);
        setProfileActive(false);
        setRequestsActive(false);
        // setDonationsActive(true);
        // setSettingsActive(false);
    };
    const handleSettings = (e) =>{
        setFeedActive(false);
        setProfileActive(false);
        setRequestsActive(false);
        // setDonationsActive(false);
        // setSettingsActive(true);
    };
    const handleLogOut = (e) =>{
        dispatch(logout())
        navigate("/");
    }
    return (
        <Fragment>
        {loading? <Loader/> : 
        <div className='dashContainer'>
            <div className='leftPanel'>
                <ul>
                    <li className={feedActive?"active":""} onClick={handleFeed}>Feed</li>
                    <li className={profileActive?"active":""} onClick={handleProfile}>Profile</li>
                    <li className={requestsActive?"active":""} onClick={handleRequest}>My Requests</li>
                    {/* <li className={donationsActive?"active":""} onClick={handleDonation}>My Donations</li> */}
                    {/* <li className={settingsActive?"active":""} onClick={handleSettings}>Settings</li> */}
                    <li><Link to={"/"}>Home</Link></li>
                    <li><a href={"https://forms.gle/327X8ZyjfnYM6e2Y8"}>Donate to Donore</a></li>
                    <li className="logout" onClick={handleLogOut}>LogOut</li>
                </ul>
            </div>
            <div className='rightPanel'>
                {feedActive?<section id='feed'>
                    <h1>Feeling Generous ?</h1>
                    <div id="feedBox">
                        {products && products.map(product=>(
                            <FeedItem data={product}/>

                        ))}
                    </div>
                </section>:<></>}
                {profileActive?<section id='profile'>
                    <h1>My Profile</h1>
                    <div id="ProfileBox">
                        <div className='avatar'>
                            <img src={""}/>
                        </div>
                        <h3>Name : {user.name}</h3>
                        <h4>E-mail : {user.email}</h4>
                        <h4>Phone Number : {user.phoneNumber}</h4>
                    </div>
                </section>:<></>}
                {requestsActive?<section id='request'>
                    <h1>My Requests</h1>
                    <RequestBox user={user}/>
                </section>:<></>}
                {/* {donationsActive?<section id='donation'>
                    <h1>My Donations</h1>
                </section>:<></>}
                {settingsActive?<section id='settings'>
                    <h1>Settings</h1>
                </section>:<></>} */}
                
            </div>
        </div>
    }
        </Fragment>
    )
};

export default DashBoardObj;