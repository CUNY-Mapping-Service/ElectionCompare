const store = {
    hoveredDistricts: {
        _2024: undefined,
        _2020: undefined,
        delta: undefined
    },
    setHoveredDistricts: function (_2020Info, _2024Info) {
        // this.hoveredDistricts._2020 = _2020Info;
        // this.hoveredDistricts._2024 = _2024Info;
        const _2020 = {}, _2024 = {}, delta = {};
        _2020.pct = {
            dem: _2020Info.dem.toFixed(2),
            gop: _2020Info.gop.toFixed(2),
            other: ((100 - _2020Info.dem - _2020Info.gop)).toFixed(2)
        }

        _2020.numVotes = {
            dem: Math.round((_2020Info.dem / 100) * _2020Info.total),
            gop: Math.round((_2020Info.gop / 100) * _2020Info.total),
            other: Math.round(((100 - _2020Info.dem - _2020Info.gop) / 100) * _2020Info.total),
            total: _2020Info.total
        }

        _2024.pct = {
            dem: _2024Info.dem.toFixed(2),
            gop: _2024Info.gop.toFixed(2),
            other: (100 - _2024Info.dem - _2024Info.gop).toFixed(2)
        }

        _2024.numVotes = {
            dem: Math.round((_2024Info.dem / 100) * _2024Info.total),
            gop: Math.round((_2024Info.gop / 100) * _2024Info.total),
            other: Math.round(((100 - _2024Info.dem - _2024Info.gop) / 100) * _2024Info.total),
            total: _2024Info.total
        }

        delta.pct = {
            dem: _2024.pct.dem - _2020.pct.dem,
            gop: _2024.pct.gop - _2020.pct.gop,
            other: _2024.pct.other - _2020.pct.other
        }

        delta.numVotes = {
            dem: _2024.numVotes.dem - _2020.numVotes.dem,
            gop: _2024.numVotes.gop - _2020.numVotes.gop,
            other: _2024.numVotes.other - _2020.numVotes.other
        }

        this.hoveredDistricts = {
            _2020,
            _2024,
            delta
        }

        console.log(JSON.stringify(this.hoveredDistricts, null, 4))
    }
}