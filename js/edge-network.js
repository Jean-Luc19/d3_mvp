const data = [
    {"name": "1lb Beef", "size": 880},
    {"name": "Cow", "size": 404943},
    {"name": "Soy1", "size": 85590},
    {"name": "Corn1", "size": 51000},
    {"name": "Drinking1", "size": 590},
    {"name": "Month1", "size": 137180},
    {"name": "Soy2", "size": 85590},
    {"name": "Corn2", "size": 51000},
    {"name": "Drinking2", "size": 634},
    {"name": "Month2", "size": 137224},
    {"name": "Soy3", "size": 85590},
    {"name": "Corn3", "size": 51000},
    {"name": "Drinking3", "size": 720},
    {"name": "Month3", "size": 137310}
]

const positions = [
    {"name": "1lb Beef", "x": 12, "y": 24},
    {"name": "Cow", "x": 20, "y": 20},
    {"name": "Soy1", "x": 13, "y": 2},
    {"name": "Corn1", "x": 17, "y": 0},
    {"name": "Drinking1", "x": 20, "y": 2},
    {"name": "Month1", "x": 17, "y": 14},
    {"name": "Soy2", "x": 25, "y": 8},
    {"name": "Corn2", "x": 28, "y": 8},
    {"name": "Drinking2", "x": 31, "y": 11},
    {"name": "Month2", "x": 24, "y": 15},
    {"name": "Soy3", "x": 34, "y": 14},
    {"name": "Corn3", "x": 39, "y": 18},
    {"name": "Drinking3", "x": 42, "y": 24},
    {"name": "Month3", "x": 28, "y": 24},

]

const connections = [
    {"source": "Cow", "target": "1lb Beef"},
    {"source": "Soy1", "target": "Month1"},
    {"source": "Corn1", "target": "Month1"},
    {"source": "Drinking1", "target": "Month1"},
    {"source": "Month1", "target": "Cow"},
    {"source": "Soy2", "target": "Month2"},
    {"source": "Corn2", "target": "Month2"},
    {"source": "Drinking2", "target": "Month2"},
    {"source": "Month2", "target": "Cow"},
    {"source": "Soy3", "target": "Month3"},
    {"source": "Corn3", "target": "Month3"},
    {"source": "Drinking3", "target": "Month3"},
    {"source": "Month3", "target": "Cow"},

]
var visualization = d3plus.viz()
  .container("#viz")
  .type("network")
  .data(data)
  .nodes(positions)
  .edges(connections)
  .edges({"arrows": true})
  .size("size")
  .id("name")
  .draw()


  /*
    3 months
    3lbs corn + 3bs soy per day
    corn: 570 gallons/lb -> 1712 gallons/day -> 51,000 corn water/month
    Soy: 951 gallons/lb -> 2853 gallons/day -> 85,590 soy water/ month


    month 1 weight: 984 -> 19.68 gallon/day -> 590 gallons/month
    month 2 weight: 1056 lbs -> 21.2 gallon/day -> 633.6 gallons/month
    month 3 wieght: 1,128lbs -> 24 gallons/day -> 720 month
    2 gallons per 100lbs body weight
    gain 2.4 lbs per day

    total water for cow = 153,000 corn, 255,000 soy, 1954 drinking water = 404,943 / 490lbs beef per cow= 880 gallons per lb

    const data = []

  */
