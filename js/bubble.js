(function() {
    const width = 1200,
          height = 700;
    const svg = d3.select("#chart")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        .append("g")
        .attr("transform", "translate(0.0)")

        const defs = svg.append("defs")


    const radiusScale = d3.scaleSqrt()
                            .domain([58, 16000])
                            .range([5, 150])
    // the simulation is a collection of forces about where we want our circles to go and how we want our circels to interact
    // step 1: get circles to the middle
    // step 2: don't have them collide!

    const forceXSeparate = d3.forceX(d => d.type === 'Animal' ? 200 : 900).strength(0.075);
    const forceXCombine = d3.forceX(d => (width / 2)).strength(0.075);

    const forceY = d3.forceY(d => height/2).strength(0.05);
    const forceCollide = d3.forceCollide(d => radiusScale(d.liters) + 1);

    const simulation = d3.forceSimulation()
        .force("x", forceXCombine)
        .force("y", forceY)
        .force("collide", forceCollide)

    d3.queue()
        .defer(d3.csv, 'https://gist.githubusercontent.com/Jean-Luc19/64017ff75d36d92ce00919b211ef26d1/raw/920eeaccf64a5a93edd89ce0cff027d1d383f8bf/water.csv')
        .await(ready)

    function ready (error, datapoints) {
        defs.selectAll(".artist-pattern")
            .data(datapoints)
            .enter().append("pattern")
            .attr("class", "artist-pattern")
            .attr("id", d => d.id.toLowerCase().replace(/ /g, "-"))
            .attr("height", "100%")
            .attr("width", "100%")
            .attr("patternContentUnits", "objectBoundingBox")
            .append("image")
            .attr("height", 1)
            .attr("width", 1)
            .attr("preserveAspectRatio", "none")
            .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
            .attr("xlink:href", './images/beef.png')

        const circles = svg.selectAll(".artist")
            .data(datapoints)
            .enter().append("circle")
            .attr("class", "artist")
            .attr("r", d => radiusScale(d.liters))
            .attr("fill", 'steelblue')
            .on('click', d => {
                svg.selectAll(".artist")
                    .attr('fill', 'url(#beef)')
            })


        d3.select("#decades").on("click", () => {
            simulation
                .force("x", forceXSeparate)
                .alphaTarget(0.25)
                .restart()
        })
        d3.select("#combine").on("click", () => {

            simulation
                .force("x", forceXCombine)
                .alphaTarget(0.25)
                .restart()
        })

        simulation.nodes(datapoints)
            .on('tick', ticked)

        function ticked() {
            circles
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
        }
    }
})();
