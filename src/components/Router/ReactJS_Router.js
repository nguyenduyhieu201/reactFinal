import { Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from "./ReactJS_HomePage";
import PostsAPI from "../API/ReactHook_PostsAPI";
import Login from "../Login/ReactJS_Login";
import REACTJS_Detail from "../API/ReactHook_PostsAPIDetails";
import ReactJS_Profile from "../Profile/ReactJS_Profile";
import axios from "axios";


const REACTJS_ROUTER = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/postsAPI" element={<PostsAPI />} />
        <Route path="/postsAPI/:id" element={<REACTJS_Detail />} />  
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ReactJS_Profile />} />
      </Routes>
    </div>
  );
}

export default REACTJS_ROUTER;

// useEffect(() => {
//   let didCancel = false;
//   axios({
//     method: "GET",
//     url: `https://jsonplaceholder.typicode.com/posts/`,
//   })
//     .then(({ data }) => {
//       if (!didCancel) {
//         setPosts(data);
//         setLoading(false);
//       }
//     })
//     .catch((err) => {
//       if (!didCancel) {
//         console.error(err);
//         setLoading(false);
//         setError("Something went wronggg!");
//       }
//     });
//   return () => {
//     didCancel = true;
//   };
// }, []);