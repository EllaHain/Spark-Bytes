import { useState, useContext, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import {
  message,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
} from "antd";
import CreateEvent from "../events/create";

const { Option } = Select;

function AdminControl() {
  return (
    <div
      style={{
        backgroundColor: "#eaf7f0",
        padding: "20px",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "75%",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "5%",
          left: "19%",
        }}
      >
        <h1 style={{ alignContent: "center", fontFamily: "Arial" }}>
          Create Event
        </h1>
        <CreateEvent />
      </div>
    </div>
  );
}
export default AdminControl;
