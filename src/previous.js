/** Número total de elementos */
console.log(`Elementos: ${rawData.length}`)

/** Número de ciclos */
console.log(`Ciclos: ${_.size(dataByCiclo)}`)

/** Número de encuestados en cada ciclo, útil para medias */
_.forOwn(dataByTrimestre, (data, trimestre) => {
  console.log(`Ciclo: ${trimestre} | Encuestados: ${data.length}`)
})

/** ¿Cuántos menores de 35 realizan trabajos no remunerados en empresas familiares desde 2007? */
_.forOwn(dataByTrimestre, (data, trimestre) => {
  const encuestados = data.length
  const menoresDe35 = data.filter(d => d.edad5 < 35)
  const trabajanEnEmpresasFamiliares = menoresDe35.filter(d => d.ayudfa === 1)
  console.log(`Ciclo: ${trimestre} | Trabajo no remunerado en empresas familiares: ${((trabajanEnEmpresasFamiliares.length / menoresDe35.length) * 100).toFixed(1)}%`)
})

/**
 * ¿Cuántos menores de 30 compaginan trabajo y estudios? ¿Cómo ha evolucionado?
 * trarem === 1 && cursr === 1 && edad5 < 35
 */
console.log('Menores de 30 que estudian y trabajan sobre total de menores de 30:')
_.forOwn(dataByTrimestre, (data, trimestre) => {
  const menoresDe30 = data.filter(d => d.edad5 < 35)
  console.log(menoresDe30.length)
  const queTrabajanEstudiando = menoresDe30.filter(d => d.trarem === 1 && d.cursr === 1)
  console.log(queTrabajanEstudiando.length)
  console.log(`${trimestre}: ${((queTrabajanEstudiando.length / menoresDe30.length) * 100).toFixed(2)}%`)
})

/** ¿Qué porcentaje de los menores de 30 está cursando estudios? */
console.log('Porcentaje de los menores de 30 que están cursando estudios:')
_.forOwn(dataByYear, (data, year) => {
  const m = data.filter(d => d.edad5 < 35)
  const e = m.filter(d => d.cursr === 1)
  console.log(`${year}: ${((e.length / m.length) * 100).toFixed(2)}%`)
})

/** ¿Qué porcentaje de los menores de 30 pasa directamente de buscar trabajo? */
console.log('Porcentaje de menores de 30 que no busca trabajo:')
_.forOwn(dataByYear, (data, year) => {
  const m = data.filter(d => d.edad5 < 35)
  const p = data.filter(d => d.busca === 6)
  console.log(`${year}: ${((p.length / m.length) * 100).toFixed(2)}%`)
})

console.log('Porcentaje de menores de 30 que no quiere trabajo:')
_.forOwn(dataByYear, (data, year) => {
  const m = data.filter(d => d.edad5 < 35)
  const p = data.filter(d => d.desea === 6)
  console.log(`${year}: ${((p.length / m.length) * 100).toFixed(2)}%`)
})

/** ¿Cuántos de entre 40 y 55 se encuentran estudiando (previsiblemente por reciclaje profesional)?
 * edad5 >= 40 && <= 50
 * trarem === 1 || trarem === 6
 * cursr === 1 || cursnr === 1
 */
console.log('Personas de entre 40 y 55 años que trabajan y estudian:')
_.forOwn(dataByYear, (data, year) => {
  const e = data.filter(d => d.edad5 >= 40 && d.edad5 <= 50)
  const te = data.filter(d => d.trarem === 1 && (d => d.edad5 >= 40 && d.edad5 <= 50) && (d.cursr === 1 || d.cursnr === 1))
  debugger
  console.log(`${year}: te: ${((te.length / e.length) * 100).toFixed(2)}%`)
})

console.log('Personas de entre 40 y 55 años que no trabajan y estudian:')
_.forOwn(dataByYear, (data, year) => {
  const e = data.filter(d => d.edad5 >= 40 && d.edad5 <= 50)
  const nte = data.filter(d => d.trarem === 6 && (d => d.edad5 >= 40 && d.edad5 <= 50) && (d.cursr === 1 || d.cursnr === 1))
  console.log(`${year}: nte: ${((nte.length / e.length) * 100).toFixed(2)}%`)
})

console.log('Personas de entre 40 y 55 años que estudian:')
_.forOwn(dataByYear, (data, year) => {
  const e = data.filter(d => d.edad5 >= 40 && d.edad5 <= 50)
  const est = data.filter(d => (d.cursr === 1 || d.cursnr === 1) && (d => d.edad5 >= 40 && d.edad5 <= 50))
  console.log(`${year}: est: ${((est.length / e.length) * 100).toFixed(2)}%`)
})

/** Porcentaje de solteros entre los menores de 40 */
console.log('Porcentaje de solteros entre los menores de 40 años:')
_.forOwn(dataByYear, (data, year) => {
  const m = data.filter(d => d.edad5 < 40)
  const s = data.filter(d => d.eciv1 === 1 && d.edad5 < 40)
  console.log(`${year}: ${((s.length / m.length) * 100).toFixed(2)}%`)
})

/** Porcentaje de separados o divorciados entre 25 y 50 años: */
console.log('Porcentaje de separados o divorciados entre personas de entre 25 y 50 años:')
_.forOwn(dataByYear, (data, year) => {
  const m = data.filter(d => d.edad5 >= 25 && d.edad5 < 50)
  const s = data.filter(d => d.eciv1 === 4 && (d.edad5 >= 25 && d.edad5 < 50))
  console.log(`${year}: ${((s.length / m.length) * 100).toFixed(2)}%`)
})

/** Porcentaje de mayores de 40 con estudios secundarios (+FP) */
console.log('Porcentaje de mayores de 40 con estudios secundarios (+FP)')
_.forOwn(dataByYear, (data, year) => {
  const m = data.filter(d => d.edad5 > 35)
  const fp = data.filter(d => (d.edad5 > 35) && d.nforma2 === 'SP')
  console.log(`${year}: ${((fp.length / m.length) * 100).toFixed(2)}%`)
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
})

_.forOwn(dataByYear, (data, year) => {
  const an = data.filter(d => d.nforma2 === 'AN' && d.edad5 >= 20 && d.edad5 < 65)
  const pi = data.filter(d => d.nforma2 === 'P1' && d.edad5 >= 20 && d.edad5 < 65)
  const pr = data.filter(d => d.nforma2 === 'P2' && d.edad5 >= 20 && d.edad5 < 65)
  const s = data.filter(d => d.nforma2 === 'S1' && d.edad5 >= 20 && d.edad5 < 65)
  const sg = data.filter(d => d.nforma2 === 'SG' && d.edad5 >= 20 && d.edad5 < 65)
  const sp = data.filter(d => d.nforma2 === 'SG' && d.edad5 >= 20 && d.edad5 < 65)
  const su = data.filter(d => d.nforma2 === 'SU' && d.edad5 >= 20 && d.edad5 < 65)
  console.log(`
    ${year}:
      Analfabetos: ${((an.filter(d => d.trarem === 1).length / an.length) * 100).toFixed(2)}%
      Primaria Incompleta: ${((pi.filter(d => d.trarem === 1).length / pi.length) * 100).toFixed(2)}%
      Primaria: ${((pr.filter(d => d.trarem === 1).length / pr.length) * 100).toFixed(2)}%
      Secundaria 1ª Etapa: ${((s.filter(d => d.trarem === 1).length / s.length) * 100).toFixed(2)}%
      Secundaria 2ª Etapa: ${((sg.filter(d => d.trarem === 1).length / s.length) * 100).toFixed(2)}%
      Secundaria + FP: ${((sp.filter(d => d.trarem === 1).length / sp.length) * 100).toFixed(2)}%
      Universidad+: ${((su.filter(d => d.trarem === 1).length / su.length) * 100).toFixed(2)}%
  `)
})

/** Porcentaje de trabajadores que cobran horas extra no remuneradas */
_.forOwn(dataByYear, (data, year) => {
  const t = data.filter(d => d.trarem === 1)
  const e = t.filter(d => d.extra === 1 && d.extpag === 0 || d.extpag === 0)
  console.log(`${year}: ${((e.length / t.length) * 100).toFixed(2)}%`)
})

/** Porcentaje de menores de 35 en búsqueda activa de empleo */
_.forOwn(dataByYear, (data, year) => {
  const b = data.filter(d => d.edad5 < 35 && d.trarem === 6 && d.busca === 1)
  const e = data.filter(d => d.edad5 < 35)
  console.log(`${year}: ${((b.length / e.length) * 100).toFixed(2)}%`)
})

/** Porcentaje de menores de 35 que trabajan */
_.forOwn(dataByYear, (data, year) => {
  const b = data.filter(d => d.edad5 < 35 && d.trarem === 1)
  const e = data.filter(d => d.edad5 < 35)
  console.log(`${year}: ${((b.length / e.length) * 100).toFixed(2)}%`)
})

/** Porcentaje de menores de 35 sobre el total de encuestados */
_.forOwn(dataByYear, (data, year) => {
  const e = data.filter(d => d.edad5 < 35)
  console.log(`${year}: ${((e.length / data.length) * 100).toFixed(2)}%`)
})

/** ¿Cuánto dura de media la búsqueda de empleo? */
_.forOwn(dataByYear, (data, year) => {
  const i = data.filter(d => d.trarem === 6 && d.itbu)
  const menosUnMes = data.filter(d => d.trarem === 6 && d.itbu === 1)
  const hastaTresMeses = data.filter(d => d.trarem === 6 && d.itbu === 2)
  const hastaSeisMeses = data.filter(d => d.trarem === 6 && d.itbu === 3)
  const hastaUnAño = data.filter(d => d.trarem === 6 && d.itbu === 4)
  const hastaAñoMedio = data.filter(d => d.trarem === 6 && d.itbu === 5)
  const hastaDosAños = data.filter(d => d.trarem === 6 && d.itbu === 6)
  const hastaCuatroAños = data.filter(d => d.trarem === 6 && d.itbu === 7)
  const masDeCuatroAños = data.filter(d => d.trarem === 6 && d.itbu === 8)
  console.log(`${year}:
    menosUnMes: ${((menosUnMes.length / i.length) * 100).toFixed(2)}%
    hastaTresMeses: ${((hastaTresMeses.length / i.length) * 100).toFixed(2)}%
    hastaSeisMeses: ${((hastaSeisMeses.length / i.length) * 100).toFixed(2)}%
    hastaUnAño: ${((hastaUnAño.length / i.length) * 100).toFixed(2)}%
    hastaAñoMedio: ${((hastaAñoMedio.length / i.length) * 100).toFixed(2)}%
    hastaDosAños: ${((hastaDosAños.length / i.length) * 100).toFixed(2)}%
    hastaCuatroAños: ${((hastaCuatroAños.length / i.length) * 100).toFixed(2)}%
    masDeCuatroAños: ${((masDeCuatroAños.length / i.length) * 100).toFixed(2)}%
  `)
})
