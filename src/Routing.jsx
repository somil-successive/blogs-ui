import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Create from "./components/Create";
import Login from "./components/account/Login";
import View from "./components/View";
import DetailedView from "./components/DetailedView";
import BulkUpload from "./components/BulkUpload";
import BulkUploadListing from "./components/BulkUploadListing";
import BulkErrorDetail from "./components/BulkErrorDetail";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/view" element={<View />} />
          {/* <Route path="/create" element={<Create />} /> */}
          <Route path="/details/:id" element={<DetailedView />} />
          <Route path="/update/:id" element={<Create />} />
          <Route path="/upload" element={<BulkUpload />} />
          <Route path="/bulk-list" element={<BulkUploadListing />} />
          <Route
            path="/bulk-errors/:session_id"
            element={<BulkErrorDetail />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
