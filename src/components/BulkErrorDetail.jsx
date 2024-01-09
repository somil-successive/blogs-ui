import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Home from "./Home";

const BulkErrorDetail = () => {
  const { session_id } = useParams();

  const [bulkErrors, setBulkErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleApiResponse = async () => {
    try {
      const apiResponse = await axios.get(
        `http://localhost:4000/blogs/bulk-uploads-errors/${session_id}`
      );
      setBulkErrors(apiResponse.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleApiResponse();
  }, [session_id]);

  return (
    <Home>
      <div className="bulk-error-container">
        <div className="table-container">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Row </th>
                  <th> Detail</th>
                </tr>
              </thead>

              <tbody>
                {bulkErrors?.map((item) => (
                  <tr key={item.session_id}>
                    <td>{item.rowNumber}</td>
                    <td>{item.errorDetails}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Home>
  );
};

export default BulkErrorDetail;
