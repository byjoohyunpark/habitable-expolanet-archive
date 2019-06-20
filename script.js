var margin = {
        top: 20,
        right: 40,
        bottom: 20,
        left: 40
    },
    width = document.querySelector(".container").getBoundingClientRect().width - margin.left - margin.right,
    height = window.innerHeight * 0.7 - margin.top - margin.bottom;

var svg = d3.select(".container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("./data.csv").then(function (data) {

    var x = d3.scaleLinear()
        .domain(d3.extent(data, function (d) {
            return d["P. Mean Distance (AU)"];
        }))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add a scale for bubble size
    var z = d3.scaleLinear()
        .domain(d3.extent(data, function (d) {
            return d["P. Radius (EU)"];
        }))
        .range([2, 40]);

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return x(d["P. Mean Distance (AU)"]);
        })
        .attr("cy", height * 0.8)
        .attr("r", function (d) {
            return Math.random() * 20;
        })
        .style("fill", "#69b3a2")
        .style("opacity", "0.7")
        .attr("stroke", "black");

});


const list = [
"Teegarden b",
"K2-72 e",
"GJ 3323 b",
"TRAPPIST-1 d",
"TRAPPIST-1 e",
"GJ 667 C f",
"Proxima Cen b",
"Kepler-442 b",
"GJ 273 b",
"Wolf 1061 c",
"GJ 667 C c",
"tau Cet e",
"Kepler-1229 b",
"GJ 667 C e",
"TRAPPIST-1 f",
"Kepler-62 f",
"Teegarden c",
"TRAPPIST-1 g",
"Kepler-186 f",
"Kepler-452 b",
"Kepler-62 e",
"Kepler-1652 b",
"Kepler-1544 b",
"K2-3 d",
"Kepler-296 e",
"Kepler-283 c",
"Kepler-1410 b",
"Kepler-1638 b",
"K2-296 b",
"Kepler-296 f",
"Kepler-705 b",
"Kepler-440 b",
"Kepler-1653 b",
"GJ 832 c",
"Kepler-1606 b",
"Kepler-1090 b",
"Kepler-61 b",
"Kepler-443 b",
"K2-18 b",
"Kepler-22 b",
"K2-9 b",
"Kepler-26 e",
"Kepler-1552 b",
"Kepler-1540 b",
"LHS 1140 b",
"Kepler-1632 b",
"HD 40307 g",
"GJ 163 c",
"Kepler-298 d",
"K2-288 B b",
"GJ 3293 d",
"Kepler-174 d"
];


fetch('https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&format=json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        let habitable = [];
        data.forEach((val) => {
            list.forEach(el => {
                if (val.pl_name == el) {
                    habitable.push(val);
                }
            });
        });
        console.log(habitable);

    })
    .catch(err => {
        console.log(err);
    });
