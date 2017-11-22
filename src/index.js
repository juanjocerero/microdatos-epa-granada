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

/** Comienza el programa */
const rawData = parseData(read('epa.csv'))

/** Ordena por ciclos en orden cronológico. Ciclo === 143 === T1-2007 */
const dataByCiclo = _.groupBy(_.clone(rawData), 'ciclo')

/** Cambiar ciclos por trimestres */
const dataByTrimestre = _.mapKeys(_.clone(dataByCiclo), (value, key) => trimestre.add(3, 'months').format('YYYY-qQ'))

/** Añadir año y trimestre a cada registro */
_.forOwn(dataByTrimestre, (data, trimestre) => {
  data.map(d => {
    d.year = +trimestre.split('-')[0]
    d.trimestre = trimestre.split('-')[1].slice(-1)
  })
})

/** Organizar por año */
let dataByYear = {
  2007: [], 2008: [], 2009: [], 2010: [], 2011: [], 2012: [], 2013: [], 2014: [], 2015: [], 2016: [], 2017: []
}

_.forOwn(dataByTrimestre, (data, trimestre) => {
  data.forEach(d => {
    let year = +trimestre.split('-')[0]
    dataByYear[year].push(d)
  })
})

/**
 * Porcentaje de encuestados que no han trabajado en el último año
 */
console.log('Porcentaje de encuestados que no han trabajado en el último año:')
const bag = {
  2007: [], 2008: [], 2009: [], 2010: [], 2011: [], 2012: [], 2013: [], 2014: [], 2015: [], 2016: [], 2017: []
}
_.forOwn(dataByYear, (data, year) => {
  const nt = data.filter(d => d.traant === 6 && d.edad5 > 16 && d.edad5 < 65)
  console.log(`${year}: ${((nt.length / data.length) * 100).toFixed(2)}%`)
  const ba = _.groupBy(nt, 'edad5')
  
  _.forOwn(ba, (data, edad) => {
    console.log(`${edad}: ${((data.length / nt.length) * 100).toFixed(2)}%`)
    bag[year][edad] = ((data.length / nt.length) * 100).toFixed(2)
  })
  console.log('------------------------------------------------')
  //console.table(bag)
})
