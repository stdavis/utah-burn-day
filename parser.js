var csvParse = require('csv-parse/lib/sync');
var moment = require('moment');

var COUNTIES = {
    'slc': 'Salt Lake',
    'bv': 'Davis',
    'utah': 'Utah',
    'weber': 'Weber',
    'boxelder': 'Box Elder',
    'cache': 'Cache',
    'tooele': 'Tooele',
    'washington': 'Washington',
    'p2': 'Carbon',
    'rs': 'Duchesne',
    'v4': 'Uintah'
};
var FIELDS = {
    Day: 'Day', // e.g. 2017-04-03
    County: 'County', // e.g. slc
    Severity: 'Severity', // possible values: good, ??
    Action: 'Action', // possible values: unrestricted, ??
    Message: 'Message' // ??
};
var COLORS = {
    good: 'green',
    '??': 'yellow',
    bad: 'red'
};

module.exports = (csvText, date, county) => {
    var records = csvParse(csvText, {
        columns: true
    });

    var data;
    var found = records.some((record) => {
        if (record[FIELDS.Day] === moment(date).format('YYYY-MM-DD') && COUNTIES[record[FIELDS.County]] === county) {
            data = record;
            return true;
        }
    });

    if (!found) {
        throw new Error('No matching record found!');
    }

    return {
        color: COLORS[data[FIELDS.Severity]]
    };
};
