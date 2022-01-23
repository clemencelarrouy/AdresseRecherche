export default  function getJson(url) {
    return fetch(url)
      .then(function (resp) {
        return resp.json();
      })
      .catch(function (error) {
        console.error(error);
      });
  }