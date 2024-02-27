

export type LoginDTO = {
  username: string;
  password: string;
}


export type ProductDTO = {
  codigo_barras: string,
  color?: string
  tamano?: string
  precio_venta: number
  nombre: string
  precio: number | null | undefined
  cantidad: number
  stock_minimo: number
  tipo_producto: string
}

export type UserDTO = {
  username: string
  password: string
}

export type ProductSaleDTO = {
  id_producto: string
  nombre: string
  precio: number
  cantidad: number
}

export type SaleDTO = {
  fecha: Date
  total: number
  productos: ProductSaleDTO[]
}