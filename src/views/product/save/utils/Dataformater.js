export const colorFormater = (res) => {
  const color = []
  for (var i = 0; i < res.data.result.length; i++) {
    const t = res.data.result[i]
    color.push({ id: t.id, name: t.name, createBy: t.create_by, rowVersion: t.row_version })
  }
  return color
}

export const SupCatFormate = (data) => {
  var result = null
  if (data.length > 0) {
    result = []
  }
  for (var i = 0; i < data.length; i++) {
    result.push({
      value: data[i].pkey,
      label: data[i].name,
      children: SupCatFormate(data[i].children)
    })
  }
  return result
}
