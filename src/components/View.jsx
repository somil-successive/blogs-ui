import React, { useEffect, useState } from "react";
import { Button, List, Modal, Spin } from "antd";
import axios from "axios";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

const View = () => {
  const [blog, setBlog] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 5;

  const [filterValue, setFilterValue] = useState("all");

  const [bid, setBid] = useState("");
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setIsModalOpen(true);
    setBid(id);
  };

  const handleSearch = () => {
    if (search.length > 0) {
      searchData();
      setSearch("");
    }
  };

  const deleteIt = async (bid) => {
    await axios.delete(`http://localhost:4000/blogs/${bid}`);
  };

  const handleOk = () => {
    deleteIt(bid);
    setIsModalOpen(false);
    setBlog((prevBlog) => prevBlog.filter((item) => item._id !== bid));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (bid) => {
    navigate(`/update/${bid}`);
  };
  const handleView = async (bid) => {
    navigate(`/details/${bid}`);
  };

  const getData = async () => {
    setLoading(true);
    const token =localStorage.getItem('token')
    const { data } = await axios.get(
      `http://localhost:4000/blogs/get?page=${page}&limit=${limit}`,{
        headers: {
          'Authorization': token
        },
      }
    );
    setBlog(data.data);
    setLoading(false);
  };

  const searchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:4000/blogs/search/${search}?page=${page}&limit=${limit}`
      );
      setBlog(data.data);
    } catch (err) {
      navigate("/other");
    } finally {
      setLoading(false);
    }
  };

  const filterData = async () => {
    const { data } = await axios.get(
      `http://localhost:4000/blogs/getbycategories/${filterValue}?page=${page}&limit=${limit}`
    );
    setBlog(data.data);
  };

  const handleFilter = async () => {
    setLoading(true);
    if (filterValue !== "all") {
      await filterData();
    }
    console.log(loading);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [page]);

  if (blog.length === 0) {
    return (
      <Home>
        <div>
          <p>No data available</p>
        </div>
      </Home>
    );
  }

  const handlePrevious = () => {
    setPage((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handleCreate = () => {
    navigate("/create");
  };

  return (
    <Home>
      <div
        style={{
          border: "2px solid black",
          height: 40,
          margin: 0,
          padding: 0,
        }}
      >
        <input
          type="text"
          placeholder="Search Here...."
          value={search}
          style={{
            border: "2px solid black",
            height: 30,
            margin: 0,
            padding: 0,
          }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <SearchOutlined
          onClick={handleSearch}
          data-testid="search-btn"
          style={{
            border: "2px solid black",
            height: 30,
            width: 30,
            margin: 4,
            padding: 2,
          }}
        />

        <select
          value={filterValue}
          style={{
            border: "2px solid black",
            height: 30,
            margin: 5,
            padding: 0,
          }}
          onChange={(e) => setFilterValue(e.target.value)}
        >
          <option value="all">All</option>
          <option value="travel">Travel</option>
          <option value="study">Study</option>
          <option value="fitness">Fitness</option>
          <option value="lifestyle">Lifestyle</option>
        </select>

        <FilterOutlined
          onClick={handleFilter}
          style={{
            border: "2px solid black",
            height: 30,
            width: 30,
            margin: 4,
            padding: 2,
          }}
        />
        <Button
        data-testid="create-btn"
          type="dashed"
          onClick={handleCreate}
          style={{
            border: "2px solid black",
            height: 30,
            width: 60,
            margin: "4px 4px 4px auto",
            padding: 2,
          }}
        >
          create
        </Button>
      </div>

      <Modal
        title="Confirmation "
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Do you want to delete</p>
      </Modal>
      {loading ? <Spin /> : null}

      <List
        itemLayout="vertical"
        size="large"
        dataSource={blog}
        renderItem={(item) => (
          <List.Item
            key={item?.title}
            extra={
              <img
                width={272}
                height={180}
                alt="logo"
                // src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                src={item?.imageUrl}
              />
            }
          >
            <List.Item.Meta
              title={item?.title}
              description={item?.categories}
            />

            {item?.body.description}
            <br />
            <br />

            <EyeOutlined
              onClick={() => handleView(item?._id)}
              style={{ marginRight: 40 }}
            />
            <EditOutlined
              onClick={() => handleEdit(item._id)}
              style={{ marginRight: 40 }}
            />
            <DeleteOutlined onClick={() => handleDelete(item?._id)} />
          </List.Item>
        )}
      />

      <footer>
        <button disabled={page === 1} onClick={handlePrevious}>
          Previous
        </button>
        <span>{`Page ${page}`}</span>
        <button onClick={handleNext}>Next</button>
      </footer>
    </Home>
  );
};

export default View;
