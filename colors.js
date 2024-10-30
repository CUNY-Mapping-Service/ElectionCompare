//////////////////////////////////////////////////
//Config Color Scale///
//////////////////////////////////////////////////
const colorScale = [
    {
        pct: 90,
        color: '#00f'
    },
    {
        pct: 80,
        color: '#20a'
    },
    {
        pct: 70,
        color: '#408'
    },
    {
        pct: 60,
        color: "#606"
    },
    {
        pct: 50,
        color: '#804',
    },
    {
        pct: 40,
        color: '#a02',
    },
    {
        pct: 30,
        color: '#e00'
    }
]

fillExp = ['case'];
colorScale.forEach((f, i) => {
    fillExp.push(['>', ['get', 'dem'], colorScale[i].pct]);
    fillExp.push(colorScale[i].color)
});
fillExp.push('rgba(0,0,0,0)')

