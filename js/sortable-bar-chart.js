(function() {
    const margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    const formatPercent = d3.format(".0%");

    const x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1, 1);

    const y = d3.scale.linear()
        .range([height, 0]);

    const xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")


    const yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")



    const colorScale = d3.scale.linear()
                        .domain([0, 16000])
                        .range(['steelblue', 'red']);


    const svg = d3.select("#bar-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv('https://gist.githubusercontent.com/Jean-Luc19/64017ff75d36d92ce00919b211ef26d1/raw/920eeaccf64a5a93edd89ce0cff027d1d383f8bf/water.csv', function(error, data) {
        const ticks = data.map(d => Number(d.liters));
        const tickLabels = data.map(d => d.id)
     xAxis.tickValues(ticks)
         .tickFormat((data, i) => tickLabels[i])

      x.domain(data.map(d => d.id));
      y.domain([0, 16000]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Liters per kg");

      svg.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", d => x(d.id))
          .attr("width", x.rangeBand())
          .attr("y", d => y(d.liters))
          .attr("height", d => height - y(d.liters))
          .attr("fill", 'steelblue');

      d3.select("input").on("change", change);

      const sortTimeout = setTimeout(function() {
        d3.select("input").property("checked", true).each(change);
      }, 2000);

      function change() {
        clearTimeout(sortTimeout);
        const x0 = x.domain(data.sort(this.checked
            ? (a, b) => a.liters - b.liters
            : (a, b) => d3.descending(a.liters, b.liters))
            .map(d => d.liters))
            .copy();

        svg.selectAll(".bar")
            .sort(function(a, b) { return x0(a.liters) - x0(b.liters); });

        const transition = svg.transition().duration(1000),
            delay = function(d, i) { return i * 50; };

        transition.selectAll(".bar")
            .delay(delay)
            .attr('fill', d => colorScale(d.liters))
            .attr("x", function(d) { return x0(d.liters); })


        transition.select(".x.axis")
            .call(xAxis)
          .selectAll("g")
            .delay(delay)

      }
});






})();
