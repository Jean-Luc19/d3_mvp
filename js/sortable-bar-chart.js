(function() {
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var formatPercent = d3.format(".0%");

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1, 1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")

    const colorScale = d3.scale.linear()
                        .domain([0, 16000])
                        .range(['steelblue', 'red']);


    var svg = d3.select("#bar-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv('./data/water_use.csv', function(error, data) {


      x.domain(data.map(function(d) { return d.id; }));
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
          .attr("x", function(d) { return x(d.id); })
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y(d.liters); })
          .attr("height", function(d) { return height - y(d.liters); })
          .attr("fill", 'steelblue');

      d3.select("input").on("change", change);

      var sortTimeout = setTimeout(function() {
        d3.select("input").property("checked", true).each(change);
      }, 2000);

      function change() {
        clearTimeout(sortTimeout);


        var x0 = x.domain(data.sort(this.checked
            ? function(a, b) { return a.liters - b.liters; }
            : function(a, b) { return d3.descending(a.liters, b.liters); })
            .map(function(d) { return d.liters; }))
            .copy();

        svg.selectAll(".bar")
            .sort(function(a, b) { return x0(a.liters) - x0(b.liters); });

        var transition = svg.transition().duration(1000),
            delay = function(d, i) { return i * 50; };

        transition.selectAll(".bar")
            .delay(delay)
            .attr('fill', d => colorScale(d.liters))
            .attr("x", function(d) { return x0(d.liters); })


        transition.select(".x.axis")
            .call(xAxis)
          .selectAll("g")
            .delay(delay);
      }
});






})();
