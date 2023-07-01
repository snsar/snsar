const axios = require('axios');
const fs = require("fs");

const limit = 1;
const apiURL = `https://api.api-ninjas.com/v1/jokes?limit=${limit}`;

const getJoke = async () => {
  try {
    const response = await axios.get(apiURL, {
      headers: {
        'X-Api-Key': 'iemkezsN5DXWbWCaGxZU2g==VWckCXz0dmoeK9Ux'
      }
    })
    const joke = response.data[0].joke;


    console.log("new joke", `"${joke}"`);

    return {
      joke,
    };
  } catch (err) {
    console.error(err.message);
    return {};
  }
};

const generate = async () => {
  const { joke } = await getJoke();

  if (!joke) return;

  const heading = '# Hi, I\'m Snsar!';
  const imageMarkdown = '![Pepe Frog](https://acegif.com/wp-content/uploads/2021/4fh5wi/pepefrg-21.gif "Pepe Frog")';
  const readmeContent = `${heading} ${imageMarkdown} <br> <br> ${joke}`;

  fs.writeFileSync('README.md', readmeContent);
};

generate();
