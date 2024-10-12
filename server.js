import express from "express";
import bodyParser from "body-parser"; // ES module import
import { MongoClient, ObjectId } from "mongodb"; // Combined MongoDB imports
import cors from "cors"; // Changed to ES module import
import path from "path";

const app = express();

const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(bodyParser.json());

// first go to front end then npm run build
// it will create a folder "dist"
//enter the below
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
// until here for deployment

const url =
  "mongodb+srv://johnfrancisdimailig:xQwz3mJny2CRsTJp@cluster0.rlg4c.mongodb.net/scratchpads?retryWrites=true&w=majority&appName=Cluster0";

// Use async/await for MongoDB connection
const connectDB = async () => {
  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true, // Ensure proper connection options
      useUnifiedTopology: true,
    });
    const db = client.db("scratch-pads-database");
    const scratchPadsCollection = db.collection("scratch-pads");

    // GET - Retrieve all scratch pads
    app.get("/", async (req, res) => {
      try {
        const scratchPads = await scratchPadsCollection.find({}).toArray();
        res.json(scratchPads);
      } catch (error) {
        console.error("Error retrieving scratch pads:", error);
        res.status(500).send("Error retrieving scratch pads");
      }
    });
    // GET - Retrieve scratch pad by ID
    app.get("/scratchpad", async (req, res) => {
      const id = req.query.id;
      try {
        const scratchPad = await scratchPadsCollection.findOne({
          _id: new ObjectId(id),
        });
        if (scratchPad) {
          res.json(scratchPad);
        } else {
          res.status(404).send("Scratch pad not found");
        }
      } catch (error) {
        res.status(500).send("Error retrieving scratch pad");
      }
    });

    // POST - Add new scratch pad
    app.post("/", async (req, res) => {
      const data = req.body;
      // Ensure title and detail fields are correctly referenced
      if (!data.title || !data.detail) {
        return res.status(400).send("Title or detail cannot be empty");
      }
      try {
        const saveResult = await scratchPadsCollection.insertOne(data);
        res.status(201).json(saveResult);
      } catch (error) {
        console.error("Error saving scratch pad:", error); // Log error details
        res.status(500).send("Error saving scratch pad");
      }
    });

    // PUT - Update scratch pad by ID
    app.put("/scratchpads/:id", async (req, res) => {
      const { id } = req.params; // Extract ID from request parameters
      const { title, detail } = req.body; // Extract fields from request body

      // Check if title and detail are provided
      if (!title || !detail) {
        return res.status(400).send("Title and detail are required.");
      }

      try {
        // Update the scratchpad in the collection
        const updateResult = await scratchPadsCollection.updateOne(
          { _id: new ObjectId(id) }, // Filter to find the correct document
          { $set: { title, detail } } // Update fields
        );

        if (updateResult.matchedCount === 0) {
          return res.status(404).send({ message: "Scratchpad not found." });
        }

        res.status(200).send({ message: "Scratchpad updated successfully." });
      } catch (error) {
        console.error("Failed to update scratchpad:", error);
        res
          .status(500)
          .send({ message: "Failed to update scratchpad.", error });
      }
    });

    // DELETE - Remove scratch pad by ID
    app.delete("/", async (req, res) => {
      const { id } = req.body; // Expecting the ID to come from the request body
      if (!id) {
        return res.status(400).send("ID is required"); // Respond with error if ID is not provided
      }

      try {
        const deleteResult = await scratchPadsCollection.deleteOne({
          _id: new ObjectId(id), // Convert to ObjectId
        });

        if (deleteResult.deletedCount === 0) {
          return res.status(404).send("Scratch pad not found");
        } else {
          return res.send("Scratch pad deleted successfully");
        }
      } catch (error) {
        console.error("Error during deletion:", error); // Log any errors
        return res.status(500).send("Error deleting scratch pad");
      }
    });

    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

// Call the connectDB function to start the application
connectDB();
