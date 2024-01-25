import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Spin } from "antd";
import Home from "./Home";

const BulkUploadListing = () => {
  const [bulkUploads, setBulkUploads] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleViewBulkUploadErrors = (session_id) => {
    navigate(`/bulk-errors/${session_id}`);
  };

  const fetchApiResponse = async () => {
    try {
      const apiResponse = await axios.get(
        `http://localhost:4000/blogs/bulk-uploads-list`
      );
      setBulkUploads(apiResponse.data.data);
    } catch (error) {
      alert("Error fetching data:");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiResponse();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  const columns = [
    {
      title: "Bulk Uploads Details",
      dataIndex: "details",
      key: "details",
      render: (text, record) => (
        <div className="record-details" data-testid="record-details">
          <div>Records Processed: {record.recordsProcessed}</div>
          <div>Errors: {record.totalErrors}</div>
          <div>Time Taken: {record.timeTaken}</div>
          <div>Uploaded At: {new Date(record.createdAt).toLocaleString()}</div>
          <div>Session Id: {record.session_id}</div>
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div className="view-errors">
          <Button
            data-testid="view-error"
            onClick={() => handleViewBulkUploadErrors(record.session_id)}
          >
            View Errors
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Home>
      <div className="bulk-upload-container">
        <Table dataSource={bulkUploads} columns={columns} />
      </div>
    </Home>
  );
};

export default BulkUploadListing;
