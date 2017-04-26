function getData() {
  let endpoint = `https://gist.githubusercontent.com/Jean-Luc19/c5f50fbd7b8aaad44abf623c60af2835/raw/826f1f63cb0cd5dfe3e576d3b07e0af7d8bc0370/water.json`;
  fetch(endpoint)
  .then(res => {
    return res.json();
  })
  .then(data => {
      console.log(data)
    d3plus.viz()
        .container("#viz")
        .data(data)
        .type("pie")
        .id("id")
        .size("liters_kg")
        .draw()
    d3plus.viz()
      .container("#viz2")
      .data(data)
      .type("bar")
      .id("Type")
      .x("id")
      .y("liters_kg")
      .draw()
  });
}

$(() => {
    getData();
});
