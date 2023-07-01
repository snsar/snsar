const axios = require('axios');
const fs = require("fs");

const limit = 1;
const apiURL = `https://api.api-ninjas.com/v1/facts?limit=${limit}`;

const getFact = async () => {
  try {
    const response = await axios.get(apiURL, {
      headers: {
        'X-Api-Key': 'iemkezsN5DXWbWCaGxZU2g==VWckCXz0dmoeK9Ux'
      }
    })
    const fact = response.data[0].fact;


    console.log("new fact", `"${fact}"`);

    return {
      fact,
    };
  } catch (err) {
    console.error(err.message);
    return {};
  }
};

const generate = async () => {
  const { fact } = await getFact();

  if (!fact) return;

  const heading = '# Hi, I\'m Snsar!';
  const imageMarkdown = '<img src="https://acegif.com/wp-content/uploads/2021/4fh5wi/pepefrg-21.gif" alt="drawing"  height = "100"/>';
  const readmeContent = `${heading} ${imageMarkdown} <br> <br> ${fact}`;

  fs.writeFileSync('README.md', readmeContent);
};

generate();
