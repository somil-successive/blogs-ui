import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./BulkList.css";
import Home from "./Home";

const BulkUploadListing = () => {
  const [bulkUploads, setBulkUploads] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const handleViewBulkUploadErrors = (session_id) => {
    navigate(`/bulk-errors/${session_id}`);
  };

  const fetchApiResponse = async () => {
    const apiResponse = await axios.get(
      `http://localhost:4000/blogs/bulk-uploads-list`
    );
    console.log(apiResponse);
    setBulkUploads(apiResponse.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchApiResponse();
  }, []);
  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <Home>
      <div className="bulk-upload-container">
        <table>
          <thead>
            <tr>
              <th>Bulk Uploads Details</th>
            </tr>
          </thead>

          <tbody>
            {bulkUploads?.map((item) => (
              <tr key={item._id} className="table-row">
                <td>
                  <div className="record-details">
                    <div>Records Processed: {item.recordsProcessed}</div>
                    <div>Errors: {item.totalErrors}</div>
                    <div>Time Taken: {item.timeTaken}</div>
                    <div>
                      Uploaded At: {new Date(item.createdAt).toLocaleString()}
                    </div>
                    <div>Session Id: {item.session_id}</div>
                  </div>
                  <div className="view-errors">
                    <button
                      onClick={() =>
                        handleViewBulkUploadErrors(item.session_id)
                      }
                    >
                      View Errors
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Home>
  );
};

export default BulkUploadListing;
