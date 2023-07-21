import React, { ChangeEvent } from 'react'

import { Item } from '../../../../types'

export interface Props {
  item: Item;
  checked: boolean;
  onChange(checked: boolean, item: Item): void;
}

export default function CheckBoxItem({ onChange, item, checked }: Props) {
  const handleChange = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked, item)
  }, [ onChange ])

  return (
    <>
      <input type='checkbox' onChange={handleChange} checked={checked} />
    </>
  )
}