d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
.then(function(data) {
  
  const w = 800,
        h = 400,
        barWidth = w/275;
  
  const maxGDP = d3.max(data.data, (d) => d[1])
  const minDate = new Date(d3.min(data.data, (d) => d[0]))
  const maxDate = new Date(d3.max(data.data, (d) => d[0]))

  const tooltipFormat = (d) => {
        const onlyYear = d[0].slice(0, 4)
        const quarter = (d) => {
              switch(d[0].slice(5, 7)) {
                    case '01':
                      return 'Q1'
                    case '04':
                      return 'Q2'
                    case '07':
                      return 'Q3'
                    case '10':
                      return 'Q4'
              }
        }

        //return onlyYear + ' ' + quarter(d) + '<br/>'
        return `${onlyYear} ${quarter(d)} <br/> $${d[1]} Billion`
  }

  const xScale = d3.scaleTime()
                   .domain([minDate, maxDate])
                   .range([0, w])

  const yScale = d3.scaleLinear()
                   .domain([0, maxGDP])
                   .range([h, 0])

  const svg = d3.select('#svgContainer')
                .append('svg')
                .attr('width', w + 50)
                .attr('height', h + 50)

  const toolTip = d3.select('#svgContainer').append('div')
                    .attr('class', 'tooltip')
                    .attr('id', 'tooltip')
                    .style('opacity', 0)
  
  const xAxis = svg.append('g')
                   .attr('transform', 'translate(' + 40 + ',' + h + ')')
                   .call(d3.axisBottom(xScale))
                   .attr('id', 'x-axis')

  const yAxis = svg.append('g')
                   .call(d3.axisLeft(yScale))
                   .attr('transform', 'translate(40, 0)')
                   .attr('id', 'y-axis')

  const yLabel = svg.append('text')
                    .attr('class', 'yLabel')
                    .attr("transform", "rotate(-90)")
                    .attr('x', 0 - h/2)
                    .attr("y", 60)
                    .text('Gross Domestic Product')
                    

  svg.selectAll('rect')
     .data(data.data)
     .enter()
     .append('rect')
     .attr('transform', 'translate(' + 40 +', 0)')
     .attr('x', (d) => xScale(new Date(d[0])))
     .attr('y', (d) => yScale(d[1]))
     .attr('width', barWidth)
     .attr('height', (d) => h - yScale(d[1]))
     .attr('class', 'bar')
     .attr('data-date', (d) => d[0])
     .attr('data-gdp', (d) => d[1])
     .on('mouseover', function(d) {
         toolTip.attr('data-date', d[0])
         toolTip.transition()
                .duration(200)
                .style('opacity', .9)
         toolTip.html(tooltipFormat(d))
                .style('left', (d3.event.pageX + 25) + 'px')
                // Follow mouse height
                .style('top', (d3.event.pageY - 60) + 'px')
                // Fixed height
                //.style('bottom', '60px')
     })
     .on('mouseout', function() {
         toolTip.transition()
                .duration(500)
                .style('opacity', 0)
     })

})