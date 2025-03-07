import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));

const date = new Date();

const fullDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    
    hour: '2-digit',
    minute: '2-digit',
    // second: '2-digit',
    hour12: 'true',
});

// Numeric date //
// const fullDate = `${
//     String(date.getMonth() + 1).padStart(2, '0')
//     }-${String(date.getDate()).padStart(2, '0')
//     }-${date.getFullYear()
// }`;

app.get("/", (req, res) => {
    res.render("index.ejs", { fullDate });
});

app.post("/post", (req, res) => {
    res.sendStatus(201);
});

app.put("/user/kenny", (req, res) => {
    res.sendStatus(200);
});

app.delete("/user/kenny", (req, res) => {
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
