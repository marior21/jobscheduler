import express from "express";
import cors from "cors";
import ConfigurationRepository from "./infraestructure/repositories/configurationsRepository";
const app = express();
const port = 8081; // default port to listen

app.use(cors())

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.get("/configurations", async (req, res) => {
    const repository: ConfigurationRepository = new ConfigurationRepository();
    res.send(JSON.stringify(await repository.getConfigurations()));
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
