import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { Card, Button, Form, Input, InputNumber, Radio, Select } from "antd";
import Home from "./Home";

const { TextArea } = Input;

const Create = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [blogsItem, setBlogsItem] = useState({
    title: "",
    body: {
      description: "",
      links: "",
    },
    likes: "",
    approved: "",
    imageUrl: "",
    categories: "",
    isSensitive: "",
    tags: "",
    writer: {
      id: "",
      name: "",
      email: "",
      profileUrl: "",
      famousWorks: "",
    },
  });

  useEffect(() => {
    if (id) {
      fetchItem();
    }
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/blogs/getbyid/${id}`
      );
      const itemData = response.data.data;
      console.log(itemData);

      setBlogsItem({
        title: itemData.title,
        body: {
          description: itemData.body?.description || "",
          links: itemData.body?.links || "",
        },
        likes: itemData.likes || "",
        approved: itemData.approved.toString() || "",
        imageUrl: itemData.imageUrl || "",
        categories: itemData.categories || "",
        isSensitive: itemData.isSensitive.toString() || "",
        tags: itemData.tags || "",
        writer: {
          id: itemData.writer.id || "",
          name: itemData.writer.name || "",
          email: itemData.writer.email || "",
          profileUrl: itemData.writer.profileUrl || "",
          famousWorks: itemData.writer.famousWorks || "",
        },
      });

      form.setFieldsValue({
        title: itemData.title,
        body: itemData.body?.description || "",
        imageUrl: itemData.imageUrl,
        categories: itemData.categories,
        likes: itemData.likes,
        approved: itemData.approved.toString(),
        isSensitive: itemData.isSensitive.toString(),
        tags: itemData.tags,
        writerId: itemData.writer.id,
        writerName: itemData.writer.name,
        writerEmail: itemData.writer.email,
        writerProfile: itemData.writer.profileUrl,
      });
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    const updatedBlogsItem = {
      title: values.title,
      body: {
        description: values.body || "",
        links: "",
      },
      imageUrl: values.imageUrl || "",
      categories: values.categories || "",
      likes: values.likes || "",
      approved: values.approved || "",
      isSensitive: values.isSensitive || "",
      tags: values.tags || "",
      writer: {
        id: values.writerId || "",
        name: values.writerName || "",
        email: values.writerEmail || "",
        profileUrl: values.writerProfile || "",
        famousWorks: "",
      },
    };

    if (id) {
      handleUpdate(updatedBlogsItem);
    } else {
      handleAdd(updatedBlogsItem);
    }
  };

  const handleAdd = async (newBlogsItem) => {
    try {
      await axios.post("http://localhost:4000/blogs/create", newBlogsItem);
      navigate("/view");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleUpdate = async (updatedBlogsItem) => {
    try {
      await axios.patch(
        `http://localhost:4000/blogs/updatebyid/${id}`,
        updatedBlogsItem
      );
      navigate("/view");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <Home>
      <h2 style={{ margin: "auto" }}>{id ? "EDIT BLOG" : "ADD BLOG"}</h2>
      <Card
        style={{
          width: "1500",
          margin: 0,
          borderRadius: 10,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f7f7f7",
        }}
      >
        <Form
          form={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          style={{
            maxWidth: 600,
            alignContent: "center",
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name={"title"}
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input defaultValue={blogsItem.title} />
          </Form.Item>
          <Form.Item
            label="Body"
            name={"body"}
            rules={[{ required: true, message: "Please enter body" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="imageUrl" name={"imageUrl"}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Categories"
            name={"categories"}
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select>
              <Select.Option value="travel">travel</Select.Option>
              <Select.Option value="study">study</Select.Option>
              <Select.Option value="fitness">fitness</Select.Option>
              <Select.Option value="lifestyle">lifestyle</Select.Option>
              <Select.Option value="sports">sports</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="likes" name={"likes"}>
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Approved"
            name={"approved"}
            rules={[{ required: true, message: "Please mention approved" }]}
          >
            <Radio.Group>
              <Radio value="true"> true </Radio>
              <Radio value="false"> false </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="isSensitive"
            name={"isSensitive"}
            rules={[{ required: true, message: "Please specify sensitivity" }]}
          >
            <Radio.Group>
              <Radio value="true"> true </Radio>
              <Radio value="false"> false </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Writer-Id" name={"writerId"}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Writer-Name" name={"writerName"}>
            <Input />
          </Form.Item>
          <Form.Item label="Writer-Email" name={"writerEmail"}>
            <Input />
          </Form.Item>
          <Form.Item label="Writer-ProfilePicUrl" name={"writerProfile"}>
            <Input />
          </Form.Item>

          <Form.Item label="tags" name={"tags"}>
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button type="primary" htmlType="submit">
              ADD
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Home>
  );
};

export default Create;
