import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Confirm from './confirm';
// import { JsonToTable } from "react-json-to-table";

// const data = JSON.parse(axios.get('BACKEND_URL/api/v1/admin/list').data)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<BrowserRouter>
	<Routes>
	<Route path="/"> 
	<Route index element={<App device="iPad"/>}/> // Default Route
	<Route path="qr" element={<App device="QR" />} /> // QR code route
	<Route path="confirm" element={<Confirm />} /> // Confirm Screen route
	</Route>
	</Routes>
	</BrowserRouter>
);
