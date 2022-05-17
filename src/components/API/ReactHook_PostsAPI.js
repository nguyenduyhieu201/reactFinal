import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function PostsAPI() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sortName, setSortName] = useState("");
  const apiEndPoint = `https://jsonplaceholder.typicode.com/posts`;

  const redirectViewDetail = useNavigate();

  useEffect(() => {
    let didCancel = false;
    axios({
      method: "GET",
      url: `https://jsonplaceholder.typicode.com/posts/`,
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

  const postFilter = posts.filter((post) =>
    JSON.stringify(post.title).includes(searchText)
  );

  const handleDelete = (post) => {
    axios.delete(apiEndPoint + "/" + post.id + post);
    console.log(apiEndPoint + "/" + post.id + post);
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const getPostsSorted = () => {
    if (sortName === null) return postFilter;
    if (sortName === "ASC")
      return postFilter.sort((postsA, postsB) => {
        if (postsA.title.toLowerCase() < postsB.title.toLowerCase()) return -1;
        if (postsA.title.toLowerCase() > postsB.title.toLowerCase()) return 1;
        return 0;
      });
    if (sortName === "DES")
      return postFilter.sort((posts, postsB) => {
        if (posts.title.toLowerCase() < postsB.title.toLowerCase()) return 1;
        if (posts.title.toLowerCase() > postsB.title.toLowerCase()) return -1;
        return 0;
      });
  };
  getPostsSorted();

  const handleSortName = () => {
    setSortName((current) => {
      if (current === null) return "ASC";
      if (current === "ASC") return "DES";
      return null;
    });
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p> {error}</p>;

  return (
    <div>
      <div className="input-group rounded mt-2">
        <input
          type="text"
          className="form-control rounded"
          value={searchText}
          placeholder="Search"
          onChange={(evt) => setSearchText(evt.target.value)}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th onClick={handleSortName} scope="col">
              Title
            </th>
            <th scope="col">Body</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {postFilter.map((post) => {
            return (
              <tr key={post.id}>
                <td>{JSON.stringify(post.id)}</td>
                <td className="col-sm-3">{JSON.stringify(post.title)}</td>
                <td className="col-sm-7">{JSON.stringify(post.body)}</td>
                <td className="row">
                  <div>
                    <Link
                      style={{ display: "block", margin: "1rem 0" }}
                      to={`/postsAPI/${post.id}`}
                    >
                      <button
                        className="col-6 btn-primary"
                        onClick={() => {
                          redirectViewDetail(`/${post.id}`);
                        }}
                      >
                        View Details
                      </button>
                    </Link>
                  </div>
                  <button
                    className="col-6 btn-danger"
                    onClick={() => handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
