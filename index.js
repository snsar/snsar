const axios = require('axios');
const fs = require("fs");

const limit = 1;
const category = "knowledge"
const apiURL = `https://api.api-ninjas.com/v1/quotes?category=${category}`;

const getQuote = async () => {
  try {
    const response = await axios.get(apiURL, {
      headers: {
        'X-Api-Key': 'iemkezsN5DXWbWCaGxZU2g==VWckCXz0dmoeK9Ux'
      }
    })
    const quote = response.data[0].quote;
    const author = response.data[0].author;

    console.log("new quote", `"${quote}" .... ${author}`);

    return {
      quote,
      author
    };
  } catch (err) {
    console.error(err.message);
    return {};
  }
};

const generate = async () => {
  const { quote, author } = await getQuote();

  if (!quote) return;

  const heading = '<h1>Hi, I\'m Snsar!</h1>';
  const imageMarkdown = '<img src="https://acegif.com/wp-content/uploads/2021/4fh5wi/pepefrg-21.gif" alt="drawing"  height = "100"/>';
  const readmeContent = `${heading} ${imageMarkdown} <br> <br> <p>${quote}</p> <br> <p>${author}</p>`;

  fs.writeFileSync('README.md', readmeContent);
};

generate();
