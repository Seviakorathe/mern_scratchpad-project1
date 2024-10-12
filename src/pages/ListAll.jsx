import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import ScratchpadApi from "../journal/scratchpad-api";
import { Link } from "react-router-dom";
import { useColorMode } from "@chakra-ui/react";

export default function ListAll() {
  const [isLoading, setIsLoading] = useState(true);
  const [scratchpads, setScratchpads] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);
  const [error, setError] = useState(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const testResult = await ScratchpadApi.getAll();
      console.log("Raw data from API:", testResult);

      if (testResult && testResult.data) {
        console.log("testResult.data:", testResult.data);
        console.log(
          "Is testResult.data an array?",
          Array.isArray(testResult.data)
        );

        if (Array.isArray(testResult.data)) {
          setScratchpads(testResult.data);
        } else {
          console.error("testResult.data is not an array");
          setScratchpads([]);
        }
      } else {
        console.error("Unexpected data structure:", testResult);
        setScratchpads([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load scratchpads. Please try again later.");
      setScratchpads([]);
    } finally {
      setIsLoading(false);
    }
  }

  // ... (other functions remain the same)

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Table
          striped
          bordered
          hover
          variant={colorMode === "dark" ? "dark" : "light"}
          className="mx-auto mt-4"
          style={{ maxWidth: "90%" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {console.log("Current scratchpads state:", scratchpads)}
            {console.log(
              "Is scratchpads an array?",
              Array.isArray(scratchpads)
            )}
            {Array.isArray(scratchpads) && scratchpads.length > 0 ? (
              scratchpads.map((scratchpad) => (
                <tr key={scratchpad._id}>
                  <td>{scratchpad.title}</td>
                  <td>
                    <Link to={`/view/${scratchpad._id}`}>
                      <Button className="me-2" variant="success">
                        View
                      </Button>
                    </Link>
                    <Link to={`/edit/${scratchpad._id}`}>
                      <Button className="me-2" variant="primary">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      className="me-2"
                      variant="danger"
                      onClick={() => handleShow(scratchpad._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No scratchpads found</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* Modal code remains the same */}
    </>
  );
}
