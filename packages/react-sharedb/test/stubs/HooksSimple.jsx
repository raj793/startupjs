import React, { useLayoutEffect } from 'react'
import { observer } from '../..'
import isArray from 'lodash/isArray'

export default useFn => {
  let renderCount = 0
  return observer(props => {
    useLayoutEffect(() => {
      renderCount = 0
    }, [])
    useLayoutEffect(() => {
      renderCount++
    })

    let [items] = useFn(props)
    if (items == null) items = []
    // Handle situation when subscribing to one doc instead of query
    if (!isArray(items)) items = [items]
    let names = items.map(i => i.name).join(',')
    let colors = items
      .filter(i => i.showColor)
      .map(i => i.color)
      .join(',')
    if (typeof DEBUG !== 'undefined') {
      console.log(`RENDER ${renderCount}:`, names)
      console.log('  colors:', colors)
      console.log('  props:', props || '')
    }

    return (
      <div className='root' title={'' + renderCount}>
        <div className='items'>{names}</div>
        <div className='colors'>{colors}</div>
      </div>
    )
  })
}
