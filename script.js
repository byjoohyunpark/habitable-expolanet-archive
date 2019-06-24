let margin = {
        top: 20,
        right: 40,
        bottom: 20,
        left: 40
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
        //        console.log(data);
        let habitable = [];
        data.forEach((val) => {
            list.forEach(el => {
                if (val.pl_name == el) {
                    habitable.push(val);
                }
            });
        });
        console.log(habitable);
        init(habitable);
    })
    .catch(err => {
        console.log(err);
    });



 window.addEventListener("resize", ()=>{console.log('resized')});
