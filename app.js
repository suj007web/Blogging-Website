//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to our daily journal blogging website, the perfect space to share your daily musings and connect with like-minded individuals. With an intuitive and user-friendly platform, you can easily create and publish your own posts, from personal reflections to thought-provoking essays. Our customizable templates and features allow you to create a unique and personalized blog that reflects your individual style and voice. Engage with other users by commenting on their posts and sharing your own feedback and insights. Join our vibrant community of writers and readers today by signing up and sharing your voice with the world.";
const aboutContent = "Our team is made up of passionate individuals who believe in the power of storytelling and creative expression. Our goal is to build a vibrant community of writers and readers who connect through the power of words. Whether you're new to blogging or a seasoned writer, our platform provides a space for you to express yourself, connect with others, and share your perspective with the world. Join us on this journey and discover the power of sharing your voice with others.";
const contactContent = " We re always here to help with any questions or concerns you may have about our daily journal blogging website.Our dedicated support team is available to assist you with any technical issues or help you navigate our platform. You can reach us by filling out the contact form on this page or by emailing us directly at asilikemega@gmail.com.We value your feedback and suggestions, so please don't hesitate to share them with us. We're constantly striving to improve our platform and provide the best possible experience for our users.Thank you for choosing our website as your platform for creative expression and community building. We look forward to hearing from you soon.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
