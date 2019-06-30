let habitable = [];
let radiusScaler = 200;
let maxY;

let margin = {
    top: 100,
    right: 100,
    bottom: 200,
    left: 100
};
let width = document.querySelector(".container").getBoundingClientRect().width - margin.left - margin.right;
let height = window.innerHeight - margin.top - margin.bottom;

let svg = d3.select(".container")
    .append("svg")
    .attr("class", "svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "pink")
    .on("mousemove", function (d) {
        console.log(d3.mouse(this)[0])
    });


const init = (data) => {
    let x = d3.scaleLinear()
        .domain(d3.extent(data, function(d) {
            return d.st_dist;
        }))
        .range([0, width]);

     maxY = d3.max(data, function(d) {
        return d.st_teff
    });
    
    let y = d3.scaleLinear()
        .domain([255, maxY])
        //        .domain(d3.extent(data, function (d) {
        //            return d.st_teff;
        //        }))
        .range([height, 0]);


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
        .attr("cy", function (d) {
            return y(d.st_teff);
        })
        //        .attr("cy", window.innerHeight / 2)
        .attr("r", function (d) {
            return d.pl_radj * radiusScaler;
        })
        .style("fill", "transparent")
        .style("opacity", "0.7")
        .attr("stroke", "black")
        .on("mouseover", function (d) {
            d3.select(this).style("fill", "orange")
        })
        .on("mouseout", function () {
            d3.select(this).style("fill", "transparent");
        });

    // earth
    svg.append('g')
        .append("circle")
        .attr("class", "earth")
        .attr("cx", 0)
        .attr("cy", y(255))
        //        .attr("cy", window.innerHeight / 2)
        .attr("r", 0.089 * radiusScaler)
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
        console.log(habitable);
        init(habitable);
    })
    .catch(err => {
        console.log(err);
    });


const resize = () => {
    width = document.querySelector(".container").getBoundingClientRect().width - margin.left - margin.right;
    height = window.innerHeight - margin.top - margin.bottom;

    d3.select(".svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    d3.select(".background")
        .attr("width", width)
        .attr("height", height);


    x = d3.scaleLinear()
        .domain(d3.extent(habitable, function (d) {
            return d.st_dist;
        }))
        .range([0, width]);
    
       y = d3.scaleLinear()
        .domain([255, maxY])
        //        .domain(d3.extent(data, function (d) {
        //            return d.st_teff;
        //        }))
        .range([height, 0]);


    d3.selectAll(".axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    d3.selectAll(".planets")
        .attr("cx", function (d) {
            return x(d.st_dist);
        })
        .attr("cy", function (d) {
            return y(d.st_teff);
        });

    d3.select(".earth")
        .attr("cx", 0)
        .attr("cy", function (d) {
            return y(255);
        })
}

window.addEventListener("resize", resize);
