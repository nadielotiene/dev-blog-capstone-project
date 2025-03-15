import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

let blogPosts = [];

function fullDate() {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        // second: '2-digit',
        hour12: 'true',
    });
}

// Numeric date //
// const fullDate = `${
//     String(date.getMonth() + 1).padStart(2, '0')
//     }-${String(date.getDate()).padStart(2, '0')
//     }-${date.getFullYear()
// }`;

app.get("/", (req, res) => {
    res.render("index.ejs", { blogPosts });
});

app.post("/submit", (req, res) => {
    const { text, textarea } = req.body;
    const newPost = {
        id: uuidv4(),
        title: text,
        content: textarea,
        date: fullDate(),
    };

    blogPosts.unshift(newPost);
    res.redirect("/");
    // res.sendStatus(201);
});

app.put("/edit/:id", (req, res) => {
    const postId = req.params.id;
    const { text, textarea } = req.body;

    blogPosts = blogPosts.map(post =>
        post.id === postId
            ? { ...post, title: text, content: textarea }
            : post
    );

    res.redirect("/");
    // res.sendStatus(200);
});

app.delete("/delete/:id", (req, res) => {
    const postId = req.params.id;
    blogPosts = blogPosts.filter(post => post.id !== postId);
    res.json({ success: true, message: "Post deleted successfully" });
    // res.redirect("/");
    // res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
