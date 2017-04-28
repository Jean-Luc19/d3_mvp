(function() {
    const width = 1200,
          height = 900;
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

    const forceXSeparate = d3.forceX(d => d.Type === 'Animal' ? 300 : 900).strength(0.075);
    const forceXCombine = d3.forceX(d => (width / 2)).strength(0.075);

    const forceY = d3.forceY(d => height/2).strength(0.075);
    const forceCollide = d3.forceCollide(d => radiusScale(d.liters_kg) + .5);

    const simulation = d3.forceSimulation()
        .force("x", forceXCombine)
        .force("y", forceY)
        .force("collide", forceCollide)

    d3.queue()
        .defer(d3.csv, 'https://gist.githubusercontent.com/Jean-Luc19/1ca1721138fd9e6ab38a0bbf129fe884/raw/9a6ee4bd68d652d5b6181dcecbfaedc898bb7fff/water_use.csv')
        .await(ready)

    function ready (error, datapoints) {
        defs.selectAll(".food-pattern")
            .data(datapoints)
            .enter().append("pattern")
            .attr("class", "food-pattern")
            .attr("id", d => d.id.toLowerCase().replace(/ /g, "-"))
            .attr("height", "100%")
            .attr("width", "100%")
            .attr("patternContentUnits", "objectBoundingBox")
            .append("image")
            .attr("height", 1)
            .attr("width", 1)
            .attr("preserveAspectRatio", "none")
            .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
            .attr("xlink:href", d => `./${d.image_path}`)

        const circles = svg.selectAll(".artist")
            .data(datapoints)
            .enter().append("circle")
            .attr("class", "artist")
            .attr("r", d => radiusScale(d.liters_kg))
            .attr("fill", 'steelblue')
            .on('click', d => {
                svg.selectAll(".artist")
                    .attr('fill', d => `url(#${d.id.toLowerCase().replace(/ /g, "-")})`)
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
