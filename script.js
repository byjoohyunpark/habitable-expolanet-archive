let habitable = [];

let margin = {
        top: 20,
        right: 100,
        bottom: 20,
        left: 100
    },
    width = document.querySelector(".container").getBoundingClientRect().width - margin.left - margin.right,
    height = window.innerHeight * 0.65 - margin.top - margin.bottom;

let svg = d3.select(".container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

const init = (data) => {
    let x = d3.scaleLinear()
        .domain(d3.extent(data, function (d) {
            return d.st_dist;
        }))
        .range([0, width]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "axis")
        .call(d3.axisBottom(x));

    // Add a scale for bubble size
    //    let z = d3.scaleLinear()
    //        .domain(d3.extent(data, function (d) {
    //            return d.pl_radj;
    //        }))
    //        .range([10, 40]);

    // planets
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "planets")
        .attr("cx", function (d) {
            return x(d.st_dist);
        })
        .attr("cy", window.innerHeight / 2)
        .attr("r", function (d) {
            return d.pl_radj * 200;
        })
        .style("fill", "none")
        .style("opacity", "0.7")
        .attr("stroke", "black");

    // earth
    svg.append('g')
        .append("circle")
        .attr("class", "earth")
        .attr("cx", 0)
        .attr("cy", window.innerHeight / 2)
        .attr("r", 20)
        .style("fill", "blue")
        .style("opacity", "0.7")
        .attr("stroke", "black");
}


fetch('https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&format=json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        //        console.log(data);
        data.forEach((val) => {
            list.forEach(el => {
                if (val.pl_name == el) {
                    habitable.push(val);
                }
            });
        });
//        console.log(habitable);
        init(habitable);
    })
    .catch(err => {
        console.log(err);
    });


const resize = () => {
    width = document.querySelector(".container").getBoundingClientRect().width - margin.left - margin.right;
    height = window.innerHeight * 0.65 - margin.top - margin.bottom;

    x = d3.scaleLinear()
        .domain(d3.extent(habitable, function (d) {
            return d.st_dist;
        }))
        .range([0, width]);

    d3.selectAll(".axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    d3.selectAll(".planets")
        .attr("cx", function (d) {
            return x(d.st_dist);
        })
        .attr("cy", window.innerHeight / 2);

    d3.select(".earth")
        .attr("cx", 0)
        .attr("cy", window.innerHeight / 2);
}

window.addEventListener("resize", resize);
