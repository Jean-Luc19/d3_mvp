(function() {
    const width = 600,
          height = 500;

        const xScale = d3.scaleLinear()
                        .range([0, width]);

        const yScale = d3.scaleLinear()
                        .domain([58, 16000])
                        .range([0, height - 10]);

        const colorScale = d3.scaleLinear()
                            .domain([0, 16000])
                            .range(['blue', 'red']);


        const yAxis = d3.axisLeft(yScale)
        const xAxis = d3.axisBottom(xScale)


        const svg = d3.select('#bar-chart')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(40, 0)')
            .call(yAxis)

    d3.queue()
        .defer(d3.csv, './data/water_use.csv')
        .await(ready)

    function ready(error, datapoints) {
        datapoints.sort((a, b) => a.liters - b.liters)

        const bars = svg.selectAll('rect')
            .data(datapoints)
            .enter().append('rect')
            .attr('width', width / datapoints.length)
            .attr('height', d => yScale(d.liters))
            .attr('x', (d, i) => i * (width / datapoints.length) - 40)
            .attr('y', d => height - yScale(d.liters))
            .attr('fill', d => colorScale(d.liters))
            .append("title")
            .text(d => d.id)
    }
})();
