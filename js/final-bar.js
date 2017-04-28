
var data = [
  {"calc": 1, "name":"gl/lb", "liters": 880},
  {"calc": 2, "name":"l/lb", "liters": 3330},
  {"calc": 3, "name":"l/kg", "liters": 7994},
  {"calc": 4, "name":"l/kg", "liters": 15000}

]
var visualization = d3plus.viz()
  .container("#viz")
  .data(data)
  .type("bar")
  .id("name")
  .x("calc")
  .y("liters")
  .draw()
