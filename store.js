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

        const _2020 = { aded24: _2020Info.aded24 }, _2024 = { aded24: _2024Info.aded24 }, delta = {};
        _2020.pct = {
            dem: ((+_2020Info.biden20 / +_2020Info.totvote20) * 100).toFixed(2),
            gop: ((+_2020Info.trump20 / +_2020Info.totvote20) * 100).toFixed(2),
        }

        _2020.numVotes = {
            dem: +_2020Info.biden20,
            gop: +_2020Info.trump20,
            total: +_2020Info.totvote20
        }

        _2024.pct = {
            dem: ((+_2020Info.harris24 / +_2020Info.totvote24) * 100).toFixed(2),
            gop: ((+_2020Info.trump24 / +_2020Info.totvote24) * 100).toFixed(2),
        }

        _2024.numVotes = {
            dem: +_2024Info.harris24,
            gop: +_2024Info.trump24,
            total: +_2024Info.totvote24
        }

        delta.pct = {
            dem: _2024.pct.dem - _2020.pct.dem,
            gop: _2024.pct.gop - _2020.pct.gop
        }

        delta.numVotes = {
            dem: _2024.numVotes.dem - _2020.numVotes.dem,
            gop: _2024.numVotes.gop - _2020.numVotes.gop
        }

        this.hoveredDistricts = {
            _2020,
            _2024,
            delta
        }

        updateUI();
    }
}