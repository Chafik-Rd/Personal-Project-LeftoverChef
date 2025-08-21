export const unitsLabel = (unit,datasRef) => {
    const a = datasRef.filter((data) => data.unit.value === unit)
    return a[0].unit.label

}