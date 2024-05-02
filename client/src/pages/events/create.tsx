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
import { API_URL } from "../../common/constants";
import { AuthContext } from "@/contexts/AuthContext";
import { ITag } from "@/common/interfaces";

const { Option } = Select;

function CreateEvent() {
  const router = useRouter();
  const { authState } = useContext(AuthContext);
  const [tags, setTags] = useState<ITag[]>([]);

  const handleCreateEvent = async (values: any) => {
    let { exp_time, description, qty, tags } = values;

    if (tags == undefined) {
      tags = [];
    }

    try {
      const response = await fetch(`${API_URL}/api/events/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState?.token}`,
        },
        body: JSON.stringify({
          exp_time,
          description,
          qty: qty.toString(),
          tags,
        }),
      });

      if (response.ok) {
        message.success("Event Successfully Created");
        router.push("/events");
        console.log(response);
      } else {
        if (response.status === 409) {
          message.error("Event not Successfully Created");
        } else if (response.status === 403) {
          message.error("You do not have permission to create events");
        }
      }
    } catch (error) {
      console.error("Error creating event:", error);
      message.error("Failed to create event. Please try again.");
    }
  };
  const getTags = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/tags/`, {
        headers: {
          Authorization: `Bearer ${authState?.token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch tags: ${response.statusText}`);
      }
      const data = await response.json();
      setTags(data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  }, [authState?.token]);

  useEffect(() => {
    getTags();
  }, [getTags]);

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
        <Form
          title="Create Event"
          style={{ width: "100%" }}
          onFinish={handleCreateEvent}
          layout="vertical"
        >
          <Form.Item
            label="Expiration Time"
            name="exp_time"
            rules={[
              { required: true, message: "Please enter an expiration time" },
            ]}
            style={{ width: "100%" }}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
            style={{ width: "100%" }}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="qty"
            rules={[{ required: true, message: "Please enter a quantity" }]}
            style={{ width: "100%" }}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item label="Tags" name="tags" style={{ width: "100%" }}>
            <Select mode="multiple" allowClear>
              {tags.map((tag) => (
                <Option key={tag.tag_id} value={tag.tag_id}>
                  {" "}
                  {tag.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item style={{ textAlign: "center", width: "100%" }}>
            <Button
              htmlType="submit"
              type="primary"
              style={{ textAlign: "center", width: "100%" }}
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default CreateEvent;