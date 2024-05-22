export const DEVICE_TYPES = [
  { slug: "display", name: "Монитор", characteristics: ["resolution"] },
  { slug: "printer", name: "Принтер", characteristics: ["printing_speed"]  }
]

export const CHARACTERISTICS = [
  { slug: "resolution", type:"choice", options: ["800x600", "1024x768"], group: "main" },
  { slug: "printing_speed", type: "integer", group: "main" }
]

export const CHARACTERISTICS_GROUPS = [
  { slug: "main", name: "Основные" }
]