import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link, Outlet, useNavigate } from "react-router-dom";

const REACTJS_Detail = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiEndPoint = `https://jsonplaceholder.typicode.com/posts`;
  const { id } = useParams();
  const redirectViewDetail = useNavigate();

  useEffect(() => {
    let didCancel = false;
    axios({
      method: "GET",
      url: `${apiEndPoint}/${parseInt(id)}`,
    })
      .then(({ data }) => {
        if (!didCancel) {
          setPosts(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!didCancel) {
          console.error(err);
          setLoading(false);
          setError("Something went wronggg!");
        }
      });
    return () => {
      didCancel = true;
    };
  }, []);

  if (loading) return (<div>Loading....</div>)
  if (error) console.log(error)
  
  return (
    <div>
      <h4>Id: {posts.id}</h4>
      <h4>Title: {posts.title} </h4>
      <h4>Body: {posts.body} </h4>
      <div>
        <Link style={{ display: "block", margin: "1rem 0" }} to={`/postsAPI`}>
          <button
            className="col-3 btn-primary"
            onClick={() => {
              redirectViewDetail(`/`);
            }}
          >
            Go back to Posts
          </button>
        </Link>
      </div>
    </div>
  );
};

export default REACTJS_Detail;
