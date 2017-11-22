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
