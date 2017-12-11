import uniqBy from 'lodash.uniqby';

const filterOverlappingDrop = (xScale, dropDate) =>
    d => uniqBy(d.data, data => Math.round(xScale(dropDate(data))));

export default (config, xScale) =>
    selection => {
        const {
            drop: {
                color: dropColor,
                radius: dropRadius,
                date: dropDate,
            },
        } = config;

        const drops = selection
            .selectAll('.drop')
            .data(filterOverlappingDrop(xScale, dropDate));

        drops
            .enter()
            .append('circle')
            .classed('drop', true)
            .attr('r', dropRadius)
            .attr('fill', dropColor)
            .merge(drops)
            .attr('cx', d => xScale(dropDate(d)));

        drops.exit().remove();
    };
