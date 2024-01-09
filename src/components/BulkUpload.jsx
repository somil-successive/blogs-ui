import React, { useState } from "react";
import axios from "axios";
import Home from "./Home";
import { Card, Progress } from "antd";

const BulkUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    setUploading(true);
    setUploadProgress(0);
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:4000/blogs/bulk-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(progress);
        },
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
      alert("File uploaded successfully.");
    }
  };

  return (
    <Home>
      {uploading ? (
        <div>
          <Progress percent={uploadProgress} status="active" />
        </div>
      ) : null}

      <h2 style={{ margin: "auto" }}> UPLOAD CSV FILE </h2>
      <Card
        style={{
          height: 200,
          width: 400,
          margin: "auto",
          padding: 20,
          marginTop: 10,
          borderRadius: 10,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f7f7f7",
        }}
      >
        <div className="upload-file-container">
          <input type="file" accept=".csv" onChange={handleFileChange} />
          <br />
          <br />
          <button
            className="upload-button"
            style={{
              backgroundColor: "#3498db",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: 5,
              cursor: "pointer",
              border: "none",
              fontSize: 16,
            }}
            onClick={handleFileUpload}
            disabled={!file}
          >
            Upload
          </button>
        </div>
      </Card>
    </Home>
  );
};

export default BulkUpload;
