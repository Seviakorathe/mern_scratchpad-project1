import axios from "axios";

const url = "http://localhost:5000";

export default class ScratchpadApi {
  static async getAll() {
    return await axios.get(`${url}/`);
  }

  static async getById(id) {
    return await axios.get(`${url}/id?id=${id}`);
  }
  static async add(scratchpad) {
    try {
      const response = await axios.post(
        `${url}/scratchpad?id=${id}`,
        scratchpad
      );
      // Check if the response is successful and return the data
      if (response.status === 201) {
        return response.data; // Successfully added scratchpad, return the data
      }
    } catch (error) {
      // Handle errors (e.g., network issues, server errors)
      console.error("Error adding scratchpad:", error);
      throw new Error("Failed to add scratchpad. Please try again later."); // Throw a custom error message
    }
  }

  static async edit(scratchpad, id) {
    return await axios.put(`${url}/scratchpads/${id}`, scratchpad);
  }

  static async delete(id) {
    if (!id) {
      throw new Error("ID is required for deletion"); // Ensure ID is provided
    }

    const data = { id }; // Use id instead of _id
    return await axios.delete(url, { data }); // Send ID in the request body
  }
}
