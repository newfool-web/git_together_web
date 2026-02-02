import {Outlet, useNavigate} from "react-router-dom";
import Navbar from './Navbar'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }        
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);


  return (
    <div>      
        <Navbar />
        <Outlet />        
    </div>
  )
}

export default Body