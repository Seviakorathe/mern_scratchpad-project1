import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Col } from "react-bootstrap";

const Edit = ({ refreshList }) => {
  // Accept refreshList as a prop
  const { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    const fetchScratchpad = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/scratchpad?id=${id}`
        ); // Ensure endpoint is correct
        if (response.ok) {
          const scratchpad = await response.json();
          setTitle(scratchpad.title);
          setDetails(scratchpad.detail);
        } else {
          console.error("Failed to fetch scratchpad:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching scratchpad:", error);
      }
    };

    fetchScratchpad();
  }, [id]);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    if (form.checkValidity() === true) {
      const updatedScratchpad = { id, title, detail: details };

      try {
        const response = await fetch(
          `http://localhost:5000/scratchpads/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedScratchpad),
          }
        );

        if (response.ok) {
          console.log("Scratchpad updated successfully!");
          setTitle("");
          setDetails("");
          setValidated(false);
          alert("Scratchpad updated successfully!");
          refreshList(); // Refresh the list after updating
        } else {
          const errorData = await response.json();
          console.error(
            "Failed to update scratchpad:",
            response.statusText,
            errorData
          );
        }
      } catch (error) {
        console.error("Error updating scratchpad:", error);
      }
    }
  };

  return (
    <Form
      className="p-3"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}>
      <Form.Group as={Col} controlId="txtTitle">
        <Form.Label>Edit scratchpad</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" as={Col} controlId="txtDetails">
        <Form.Label>Details</Form.Label>
        <Form.Control
          rows={5}
          as="textarea"
          required
          type="text"
          placeholder="Start typing here..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>

      <Button type="submit">Save changes</Button>
    </Form>
  );
};

export default Edit;
