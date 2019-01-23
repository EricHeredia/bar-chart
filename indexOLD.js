d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json',
function(data) {

  const minAmount = d3.min(data.data, (d) => d[1]);
  const maxAmount = d3.max(data.data, (d) => d[1]);
  const minDate = d3.min(data.data, (d) => d[0]).slice(0, 4)
  const maxDate = d3.max(data.data, (d) => d[0]).slice(0, 4)
  const getDate = (d) => d[0].slice(0, 4)

  const w = 800,
        h = 400,
        padding = 5,
        barWidth = w/275;

const svg = d3.select('body')
              .append('svg')
              .attr('width', w)
              .attr('height', h);

  const xScale = d3.scale.linear()
                   .domain([minDate, maxDate])
                   .range([0, 275]);

  const yScale = d3.scale.linear()
                   .domain([0, maxAmount])
                   .range([h - padding, padding])

  console.log(xScale(getDate(data.data[4])))
  svg.selectAll('rect')
     .data(data.data)
     .enter()
     .append('rect')
     .attr({
       'x': (d, i) => xScale(getDate(d)),
       'y': (d) => yScale(d[1]),
       'width': barWidth,
       'height': (d) => d[1],
       'fill': 'grey',
       'class': 'bar'
     })
     .append('title')
     .text((d) => '$' + d[1] + ' Billion')








})