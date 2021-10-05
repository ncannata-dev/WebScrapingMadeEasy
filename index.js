const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const PORT = 8000;
const URL = "https://www.repubblica.it/"; // <-- insert you url
const app = express();

axios(URL)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    let articles = [];

    $(".entry__title", html).each(function () {
      const title = $(this).text().trim("\n"); // Based on which info you want
      const url = $(this).find("a").attr("href"); // Based on which info you want
      articles = [...articles, { title, url }];
    });
    console.log(articles);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
