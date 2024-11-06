//////////////////////////////////////////////////
//Config Color Scale///
//////////////////////////////////////////////////
const colorScale = [
    {
        pct: 92,
        color: '#034E7B',
        label: "Dem vote share 92%-100%"
    },
    {
        pct: 85,
        color: '#4393C3',
        label: "Dem vote share 85%-92%"
    },
    {
        pct: 63,
        color: '#9ECAE1',
        label: "Dem vote share 63%-85%"
    },
    {
        pct: 45,
        color: '#EFD7FF',
        label: "GOP-leaning vote share 37%-63%"
    },
    {
        pct: 30,
        color: '#FF7F7F',
        label: "GOP vote share 55%-70%"
    },
    {
        pct: 0,
        color: '#E60000',
        label: "GOP vote share 70%-100%"
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
    fillExp24.push(['>', ["*", ["/", ["to-number", ['get', 'harris24'], 0], ["to-number", ['get', 'totvote24'], 0]], 100], colorScale[i].pct]);
    fillExp24.push(colorScale[i].color)
});
fillExp24.push('rgba(0,0,0,0)')

