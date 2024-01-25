import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Home from "./Home";
import "./DetailedView.css";
import { Image } from "antd";

const DetailedView = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/blogs/getbyid/${id}`);
      setData(res?.data?.data);
    } catch (err) {
      navigate("/other");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Home>
      <div className="blog-details-container">
        <Image src={data?.imageUrl} alt="logo" className="blog-image" />
        <h1 className="blog-title" style={{ fontStyle: "italic" }}>
          {data?.title}
        </h1>
        <div className="blog-content">
          <p>{data?.body?.description}</p>
          <div className="blog-metadata">
            <p>
              <strong>Category:</strong>
              {data?.categories}
            </p>
            <p>
              <strong>Sensitive:</strong>
              {data?.isSensitive ? "true" : "false"}
            </p>
            <p>
              <strong>Approved:</strong>
              {data?.approved ? "true" : "false"}
            </p>
            <p>
              <strong>Likes: </strong>
              {data?.likes}
            </p>
            <p>
              <strong>Tags:</strong>
              {data?.tags}
            </p>
            <p>
              <strong>Created At:</strong>
              {data?.createdAt}
            </p>
            <p>
              <strong>Last Updated:</strong>
              {data?.updatedAt}
            </p>
          </div>
          <div className="writer-details">
            <div className="writer-about">
              <strong>About Writer</strong>
            </div>
            <img
              src={data?.writer?.profilePicUrl}
              alt="pic"
              className="writer-image"
            />
            <div className="writer-info">
              <p>
                <strong>Id:</strong> {data?.writer?.id}
              </p>
              <p>
                <strong>Name:</strong> {data?.writer?.name}
              </p>
              <p>
                <strong>Email:</strong> {data?.writer?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Home>
  );
};

export default DetailedView;
