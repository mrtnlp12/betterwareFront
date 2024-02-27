export interface Product {
  codigo_barras: string;
  nombre: string;
  precio: number;
  cantidad: string;
  stock_minimo: string;
  tipo_producto: {
    nombre: string;
  };
}

export interface User {
  id: string
  username: string
  password: string
  role: string
}


