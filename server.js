// const http = require("http");
const PORT = process.env.PORT ||  3000;
const cors = require("cors");

const express = require("express");
const blogs = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
  {
    userId: 1,
    id: 4,
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
  },
  {
    userId: 1,
    id: 5,
    title: "nesciunt quas odio",
    body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
  },
];

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["https://your-frontend.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);

app.get("/", (req, res) => {
  res.send("backend is running ");
});

app.get("/blogs", (req, res) => {
  res.status(200).json({
    status: true,
    data: blogs,
  });
});

app.get("/blogs/:id", (req, res) => {
  const id = Number(req.params.id);
  const blog = blogs.find((b) => b.id == id);
  if (!blog) {
    return res.status(404).json({
      success: false,
      message: `Blog with id ${id} is not found`,
    });
  }
  res.status(200).json({
    success: true,
    data: blog,
  });
});

app.post("/blogs", (req, res) => {
  const { userId, title, body } = req.body;

  if (!userId || !title || !body) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  const newBlog = {
    id: blogs.length + 1,
    userId: Number(userId),
    title,
    body,
  };

  blogs.unshift(newBlog);

  res.status(201).json({
    success: true,
    message: "Blog created successfully.",
    data: newBlog,
  });

  res.status(404).json({
    success: false,
    message: "Enter Valid Detailes...!",
  });
});

app.patch("/blogs/:id", (req, res) => {
  const id = Number(req.params.id);

  const { title, body, userId } = req.body;

  if (!title || !body || !userId) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: `Blog with id ${id} not found.`,
    });
  }

  let updateBlog = {
    ...blogs[blog],
    ...res.body,
  };

  blogs[blog] = updateBlog;

  res.status(200).json({
    success: true,
    message: "Blog updated successfully.",
    data: blog,
  });
});

app.delete("/blogs/:id", (req, res) => {
  let id = Number(req.params.id);

  const blog = blogs.findIndex((b) => b.id === id);

  if (blog === -1) {
    return res.status(404).json({
      success: false,
      message: `Blog id is not found...`,
    });
  }

  let deleteBlog = blogs.splice(blog, 1);

  res.status(200).json({
    success: true,
    message: "Bloge delete Successfully...",
    data: deleteBlog[0],
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
