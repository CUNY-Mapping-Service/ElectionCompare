//////////////////////////////////////////////////
//Config Color Scale///
//////////////////////////////////////////////////
const colorScale = [
    {
        pct: 95,
        color: '#00f'
    },
    {
        pct: 90,
        color: '#20a'
    },
    {
        pct: 85,
        color: '#408'
    },
    {
        pct: 80,
        color: "#606"
    },
    {
        pct: 75,
        color: '#804',
    },
    {
        pct: 70,
        color: '#a02',
    },
    {
        pct: 65,
        color: '#e00'
    }
]

fillExp20 = ['case'];
colorScale.forEach((f, i) => {
    fillExp20.push(['>', ["*", ["/", ["to-number", ['get', 'biden20'], 0], ["to-number", ['get', 'totvote20'], 0]], 100], colorScale[i].pct]);
    fillExp20.push(colorScale[i].color)
});
fillExp20.push('rgba(0,0,0,0)')

fillExp24 = ['case'];
colorScale.forEach((f, i) => {
    fillExp24.push(['>', ["*", ["/", ["to-number", ['get', 'harris24'], 0], ["to-number", ['get', 'totvote20'], 0]], 100], colorScale[i].pct]);
    fillExp24.push(colorScale[i].color)
});
fillExp24.push('rgba(0,0,0,0)')

