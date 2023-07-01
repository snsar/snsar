const axios = require('axios');
const fs = require('fs');

const limit = 1;
const apiURL = `https://api.api-ninjas.com/v1/jokes?limit=${limit}`;

const getQuote = async () => {
  try {
    const response = await axios.get(apiURL, {
      headers: {
        'X-Api-Key': 'YOUR_API_KEY'
      }
    });
    const joke = response.data[0].joke;

    console.log('new joke', `"${joke}"`);

    return {
      joke
    };
  } catch (err) {
    console.error(err.message);
    return {};
  }
};

const generate = async () => {
  const { joke } = await getQuote();

  if (!joke) return;

  const heading = '# Hi, I\'m Snsar!';
  const imageMarkdown = '![Pepe Frog](https://acegif.com/wp-content/uploads/2021/4fh5wi/pepefrg-21.gif "Pepe Frog")';
  const readmeContent = `${heading} ${imageMarkdown} <br> <br> ${joke}`;

  fs.writeFileSync('README.md', readmeContent);
};

generate();
