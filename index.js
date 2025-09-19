import express from "express"

const port = 3000;
const app = express();

var allPosts = [];

class PostData {
    constructor(title, content, author, date) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.date = date;
    }   
}


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {allPosts: allPosts} );
});


app.post("/post", (req, res) => {
    var d = new Date();
    var post = new PostData(req.body.title, req.body.content, req.body.author, d.toLocaleDateString());
    allPosts.push(post);
    res.render("allPosts",{allPosts: allPosts} );
});

app.post("/delete", (req, res) => {
    const index = parseInt(req.body.index);
    allPosts.splice(index, 1);
    // alert("Post Deleted Successfully");
    res.render("allPosts",{allPosts: allPosts} );
});

app.post("/edit", (req, res) => {
    const index = parseInt(req.body.index);
    const postToUpdate = allPosts[index];
    // alert("Post Edited Successfully");
    res.render("index",{postToUpdate: postToUpdate, toUpdate: true, index: index} );
});

app.post(("/updatedData"), (req, res) => {
    const index = parseInt(req.body.index);
    allPosts[index].title = req.body.title;
    allPosts[index].content = req.body.content;
    allPosts[index].author = req.body.author;
    res.render("allPosts",{allPosts: allPosts} );
});
    

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});