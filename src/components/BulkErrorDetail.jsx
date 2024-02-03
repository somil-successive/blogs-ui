import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Spin } from "antd";
import Home from "./Home";
import axios from "axios";
import { Base_API } from "../config/config";

const BulkErrorDetail = () => {
  const { session_id } = useParams();

  const [bulkErrors, setBulkErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myError, setMyError] = useState("");

  const handleApiResponse = async () => {
    try {
      const apiResponse = await axios.get(
        `${Base_API}/bulk-uploads-errors/${session_id}`
      );
      setBulkErrors(apiResponse.data.data);
    } catch (error) {
      console.log("Error fetching data:");

      setMyError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleApiResponse();
  }, [session_id]);

  const columns = [
    {
      title: "Row Number",
      dataIndex: "rowNumber",
      key: "rowNumber",
    },
    {
      title: "Error Detail",
      dataIndex: "errorDetails",
      key: "errorDetails",
    },
  ];

  if (loading) {
    return <Spin data-testid="spinner" size="large" />;
  }

  if (bulkErrors.length === 0) {
    return <h3>No Record Found!</h3>;
  }

  if (myError) {
    return <h3>Error fetching data</h3>;
  }

  return (
    <Home>
      <div className="bulk-error-container">
        <div className="table-container">
          <Table
            data-tesid="myTable"
            dataSource={bulkErrors}
            columns={columns}
            pagination={false}
          />
        </div>
      </div>
    </Home>
  );
};

export default BulkErrorDetail;
