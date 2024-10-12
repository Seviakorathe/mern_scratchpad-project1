import { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";

const Add = () => {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = async (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    if (form.checkValidity() === true) {
      const newScratchpad = { title, detail: details }; // Update field names to match server-side code

      try {
        const response = await fetch(`http://localhost:5000/`, {
          // Update endpoint to match server-side code
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newScratchpad),
        });
        alert("New scratchpad added successfully!");

        if (response.ok) {
          console.log("New scratchpad added successfully!");
          setTitle("");
          setDetails("");
          setValidated(false);
        } else {
          const errorData = await response.json();
          console.error(
            "Failed to add scratchpad:",
            response.statusText,
            errorData
          );
        }
      } catch (error) {
        console.error("Error adding scratchpad:", error);
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
        <Form.Label>Add new scratchpad</Form.Label>
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
          placeholder="Start typing here..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>

      <Button type="submit">Create</Button>
    </Form>
  );
};

export default Add;
