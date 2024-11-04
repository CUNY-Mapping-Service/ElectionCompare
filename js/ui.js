///////////////////////////////////////////////////
//Opacity Slider
///////////////////////////////////////////////////
/*const opSlider = document.getElementById('opacity-container');
if(opSlider){
    opSlider.addEventListener('input', (v) => {
        _2024.setPaintProperty('2024_results', 'fill-opacity', (+v.target.value / 100))
        _2020.setPaintProperty('2020_results', 'fill-opacity', (+v.target.value / 100))
    })
}
*/

///////////////////////////////////////////////////
//Legend
///////////////////////////////////////////////////
/*const legend = document.getElementById('legend');
if (legend) {
    for (let i = 0; i < colorScale.length; i++) {
        legend.innerHTML += `
    <div class="legend-item">
        <span style="display:inline-block;width:16px; height:16px;background-color:${colorScale[i].color}"></span>
        <span class="pct">${colorScale[i].label}</span >
    </div > `
    }
}*/

///////////////////////////////////////////////////
//Update UI
///////////////////////////////////////////////////
function updateUI() {
    const no2020Data = isNaN(store.hoveredDistricts._2020.pct.dem) || isNaN(store.hoveredDistricts._2020.pct.gop);
    const no2024Data = isNaN(store.hoveredDistricts._2024.pct.dem) || isNaN(store.hoveredDistricts._2024.pct.gop);
    const noDeltaData = isNaN(store.hoveredDistricts.delta.pct.dem) || isNaN(store.hoveredDistricts.delta.pct.gop);

    const noDataNote = 'No Data'
    ////////////////////////////////////////////////
    const pctBiden2020 = document.querySelector("#percents #biden-2020");
    pctBiden2020.innerHTML = getInnerHtml('Biden', no2020Data ? noDataNote : store.hoveredDistricts._2020.pct.dem, true)

    const pctTrump2020 = document.querySelector("#percents #trump-2020");
    pctTrump2020.innerHTML = getInnerHtml('Trump', no2020Data ? noDataNote : store.hoveredDistricts._2020.pct.gop, true)

    ////////////////////////////////////////////////

    const pctHarris2024 = document.querySelector("#percents #harris-2024");
    pctHarris2024.innerHTML = getInnerHtml('Harris', no2024Data ? noDataNote : store.hoveredDistricts._2024.pct.dem, true)

    const pctTrump2024 = document.querySelector("#percents #trump-2024");
    pctTrump2024.innerHTML = getInnerHtml('Trump', no2024Data ? noDataNote : store.hoveredDistricts._2024.pct.gop, true)

    ////////////////////////////////////////////////

    const demDeltaPct = document.querySelector("#percents #dem-delta");
    demDeltaPct.innerHTML = getInnerHtml('DEM', noDeltaData ? noDataNote : store.hoveredDistricts.delta.pct.dem.toFixed(1), true)
    if (!noDeltaData) { 
        demDeltaPct.style.backgroundColor = +store.hoveredDistricts.delta.pct.dem > 0 ? '#9f9' : '#f99'; 
    }else{
        demDeltaPct.style.backgroundColor = 'white';
    }


    const gopDeltaPct = document.querySelector("#percents #gop-delta");
    gopDeltaPct.innerHTML = getInnerHtml('GOP', noDeltaData ? noDataNote : store.hoveredDistricts.delta.pct.gop.toFixed(1), true)
    if (!noDeltaData) {
        gopDeltaPct.style.backgroundColor = +store.hoveredDistricts.delta.pct.gop > 0 ? '#9f9' : '#f99';
    }else{
        gopDeltaPct.style.backgroundColor = 'white';
    }
    ////////////////////////////////////////////////

    const numBiden2020 = document.querySelector("#numbers #biden-2020");
    numBiden2020.innerHTML = getInnerHtml('Biden', no2020Data ? noDataNote : Math.round(store.hoveredDistricts._2020.numVotes.dem, false))

    const numTrump2020 = document.querySelector("#numbers #trump-2020");
    numTrump2020.innerHTML = getInnerHtml('Trump', no2020Data ? noDataNote : Math.round(store.hoveredDistricts._2020.numVotes.gop, false))

    ////////////////////////////////////////////////

    const numHarris2024 = document.querySelector("#numbers #harris-2024");
    numHarris2024.innerHTML = getInnerHtml('Harris', no2024Data ? noDataNote : Math.round(store.hoveredDistricts._2024.numVotes.dem, false))

    const numTrump2024 = document.querySelector("#numbers #trump-2024");
    numTrump2024.innerHTML = getInnerHtml('Trump', no2024Data ? noDataNote : Math.round(store.hoveredDistricts._2024.numVotes.gop, false))

    ////////////////////////////////////////////////

    const demDelta = document.querySelector("#numbers #dem-delta");
    demDelta.innerHTML = getInnerHtml('DEM', noDeltaData ? noDataNote : store.hoveredDistricts.delta.numVotes.dem.toFixed(1))

    const gopDelta = document.querySelector("#numbers #gop-delta");
    gopDelta.innerHTML = getInnerHtml('GOP', noDeltaData ? noDataNote : store.hoveredDistricts.delta.numVotes.gop.toFixed(1))


    ////////////////////////////////////////////////
    const total2020Num = document.querySelector("#numbers #total-2020");
    total2020Num.innerHTML = getInnerHtml('Total', no2020Data ? noDataNote : Math.round(store.hoveredDistricts._2020.numVotes.total, false))

    const total2024Num = document.querySelector("#numbers #total-2024");
    total2024Num.innerHTML = getInnerHtml('Total', no2024Data ? noDataNote : Math.round(store.hoveredDistricts._2024.numVotes.total, false))

    const totalDeltaNum = document.querySelector("#numbers #total-delta");
    totalDeltaNum.innerHTML = getInnerHtml('Total', no2020Data || no2024Data ? noDataNote : Math.round(store.hoveredDistricts._2024.numVotes.total + store.hoveredDistricts._2020.numVotes.total, false))

    const edContainers = Array.from(document.getElementsByClassName('ed'))

    // edContainers.forEach(el => el.innerHTML = `(District ${parseInt(store.hoveredDistricts.ed.substring(0, 2))}-${parseInt(store.hoveredDistricts.ed.substring(2, 5))})`)
    edContainers.forEach(el => el.innerHTML = `(ED ${parseInt(store.hoveredDistricts.ed.substring(2, 5))} in AD ${parseInt(store.hoveredDistricts.ed.substring(0, 2))})`)
}

function getInnerHtml(title, value, _pct) {
    return `<span style="float:left" > ${title}</span > <span style="float:right">${value.toLocaleString()}</span>`
}