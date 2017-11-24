import { csvParse, csvParseRows, dsvFormat } from 'd3-dsv'
import { mean, median, quantile, variance, deviation } from 'd3-array'
import moment from 'moment'
import _ from 'lodash'
import * as path from 'path'
import * as fs from 'fs'

/** Preparar datos */
let trimestre = moment('2006-10-01', 'YYYY-MM-DD')

const read = file => fs.readFileSync(path.join(__dirname, `./../${file}`), 'utf-8')

/** Convertir datos en numéricos y manejar strings */
const parseData = string => csvParse(string, d => {
  for (let prop in d) {
    d[prop].length > 0 ? (isNaN(+d[prop]) ? d[prop] = d[prop] : d[prop] = +d[prop]) : (d[prop] = null)
  }
  return d
})

/** Preparar el set de datos */
const rawData = parseData(read('epa.csv'))

const dataByCiclo = _.groupBy(_.clone(rawData), 'ciclo')

const dataByTrimestre = _.mapKeys(_.clone(dataByCiclo), (value, key) => trimestre.add(3, 'months').format('YYYY-qQ'))

_.forOwn(dataByTrimestre, (data, trimestre) => {
  data.map(d => {
    d.year = +trimestre.split('-')[0]
    d.trimestre = trimestre.split('-')[1].slice(-1)
  })
})

const dataByYear = {
  2007: [], 2008: [], 2009: [], 2010: [], 2011: [], 2012: [], 2013: [], 2014: [], 2015: [], 2016: [], 2017: []
}
_.forOwn(dataByTrimestre, (data, trimestre) => {
  data.forEach(d => {
    let year = +trimestre.split('-')[0]
    dataByYear[year].push(d)
  })
})

/** Operaciones */

