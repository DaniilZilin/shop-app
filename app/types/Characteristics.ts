
export interface Characteristics {
  country: string,
  grant: string,
  type: Types
}

export enum Types {
  VideoCard = 'Видеокарта',
  Keyboard = 'UserActionTypes',
  Processor = 'UserActionTypes'
}

// export interface VideoCard<Types> {
//   type: ItemType.VideoCard,
//   PCI_lines_count: 2,
//   amount_of_cores: 24
// }