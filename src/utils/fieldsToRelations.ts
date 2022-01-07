const checkSelections = (selections: any[], perfix?: string, includes?: string[]): any[] => {
  const feilds: any[] = []
  for (const selection of selections) {
    if (!selection?.arguments?.length) {
      if (includes?.includes(selection.name.value) || selection?.selectionSet?.selections?.length) {
        const name = perfix ? perfix + selection.name.value : selection.name.value
        feilds.push(name)
        if (selection?.selectionSet?.selections?.length) {
          feilds.push(...checkSelections(selection.selectionSet.selections, name + '.'))
        }
      }
    } else break
  }

  return feilds
}

export const fieldsToRelationsArgumentable = (info: any, includes?: string[]) => {
  const feilds: any[] = []
  info?.fieldNodes.map((fieldNode: any) => {
    if (fieldNode.selectionSet.selections.length) {
      feilds.push(...checkSelections(fieldNode.selectionSet.selections, undefined, includes))
    }
  })

  return feilds
}
