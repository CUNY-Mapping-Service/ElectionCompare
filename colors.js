//////////////////////////////////////////////////
//Config Color Scale///
//////////////////////////////////////////////////
const colorScale = [
    {
        pct: 80,
        color: "#00f",
        label: "Dem vote share 80%-100%"
    },
    {
        pct: 60,
        color: '#84f',
        label: "Dem vote share 60%-80%"
    },
    {
        pct: 50,
        color: '#b8f',
        label: "Dem vote share 50%-60%"
    },
    {
        pct: 40,
        color: '#f48',
        label: "GOP vote share 50%-60%"
    },
    {
        pct: 20,
        color: '#f24',
        label: "GOP vote share 60%-80%"
    },
    {
        pct: 0,
        color: '#f00',
        label: "GOP vote share 80%-100%"
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

