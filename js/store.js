const store = {
    hoveredDistricts: {
        ed: undefined,
        _2024: undefined,
        _2020: undefined,
        delta: undefined
    },
    setHoveredDistricts: function (_2020Info, _2024Info) {
        // this.hoveredDistricts._2020 = _2020Info;
        // this.hoveredDistricts._2024 = _2024Info;

        const noDataNote = 'No Data'
        const _2020 = { aded24: _2020Info.aded24 }, _2024 = { aded24: _2024Info.aded24 }, delta = {};
        if (+_2020Info.totvote20 < 10 || isNaN(+_2020Info.totvote20)) {
            _2020.pct = {
                dem: noDataNote,
                gop: noDataNote,
            }

            _2020.numVotes = {
                dem: noDataNote,
                gop: noDataNote,
                total: noDataNote
            }
        } else {
            _2020.pct = {
                dem: ((+_2020Info.biden20 / +_2020Info.totvote20) * 100).toFixed(1),
                gop: ((+_2020Info.trump20 / +_2020Info.totvote20) * 100).toFixed(1),
            }

            _2020.numVotes = {
                dem: +_2020Info.biden20,
                gop: +_2020Info.trump20,
                total: +_2020Info.totvote20
            }
        }

        if (+_2024Info.totvote24 < 10 || isNaN(+_2024Info.totvote24)) {
            _2024.pct = {
                dem: noDataNote,
                gop: noDataNote,
            }

            _2024.numVotes = {
                dem: noDataNote,
                gop: noDataNote,
                total: noDataNote
            }
        } else {

            _2024.pct = {
                dem: ((+_2024Info.harris24 / +_2024Info.totvote24) * 100).toFixed(1),
                gop: ((+_2024Info.trump24 / +_2024Info.totvote24) * 100).toFixed(1),
            }

            _2024.numVotes = {
                dem: +_2024Info.harris24,
                gop: +_2024Info.trump24,
                total: +_2024Info.totvote24
            }
        }
        
        if (+_2024Info.totvote24 < 10 || +_2020Info.totvote20 < 10 || isNaN(+_2024Info.totvote24) || isNaN(+_2020Info.totvote20)) {
            delta.pct = {
                dem: noDataNote,
                gop: noDataNote,
            }

            delta.numVotes = {
                dem: noDataNote,
                gop: noDataNote,
                total: noDataNote
            }
        } else {
            delta.pct = {
                dem: _2024.pct.dem - _2020.pct.dem,
                gop: _2024.pct.gop - _2020.pct.gop
            }

            delta.numVotes = {
                dem: _2024.numVotes.dem - _2020.numVotes.dem,
                gop: _2024.numVotes.gop - _2020.numVotes.gop
            }
        }
        this.hoveredDistricts = {
            ed: ''+_2020Info.aded24,
            _2020,
            _2024,
            delta
        }


        updateUI();
    }
}