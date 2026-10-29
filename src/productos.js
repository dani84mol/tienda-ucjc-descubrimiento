// Datos de prueba del catálogo (más adelante vendrán de un API)
export const CATEGORIAS = [
  { id: 'ropa', nombre: 'Ropa' },
  { id: 'deporte', nombre: 'Deporte' },
  { id: 'material', nombre: 'Material' },
  { id: 'regalos', nombre: 'Regalos' },
];

export const TALLAS = ['XS', 'S', 'M', 'L', 'XL'];

export const PRODUCTOS = [
  { id: 'prod-101', nombre: 'Camiseta Técnica UCJC', categoria: 'deporte', precio: 19.99, tallas: ['S', 'M', 'L', 'XL'] },
  { id: 'prod-102', nombre: 'Sudadera con capucha', categoria: 'ropa', precio: 39.95, tallas: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 'prod-103', nombre: 'Chaqueta cortavientos', categoria: 'ropa', precio: 45.0, tallas: ['M', 'L', 'XL'] },
  { id: 'prod-104', nombre: 'Equipación oficial fútbol', categoria: 'deporte', precio: 55.0, tallas: ['S', 'M', 'L'] },
  { id: 'prod-105', nombre: 'Mochila UCJC', categoria: 'material', precio: 29.9, tallas: [] },
  { id: 'prod-106', nombre: 'Cuaderno A4', categoria: 'material', precio: 4.5, tallas: [] },
  { id: 'prod-107', nombre: 'Taza de graduación', categoria: 'regalos', precio: 9.95, tallas: [] },
  { id: 'prod-108', nombre: 'Llavero metálico', categoria: 'regalos', precio: 5.0, tallas: [] },
];
