// Datos de prueba del catálogo (más adelante vendrán de un API)
export const CATEGORIAS = [
  { id: 'ropa', nombre: 'Ropa' },
  { id: 'deporte', nombre: 'Deporte' },
  { id: 'material', nombre: 'Material' },
  { id: 'regalos', nombre: 'Regalos' },
];

export const TALLAS = ['XS', 'S', 'M', 'L', 'XL'];

export const PRODUCTOS = [
  { id: 'prod-101', nombre: 'Camiseta Técnica UCJC', categoria: 'deporte', precioEUR: 19.99, precioUSD: 21.99, tallas: ['S', 'M', 'L', 'XL'] },
  { id: 'prod-102', nombre: 'Sudadera con capucha', categoria: 'ropa', precioEUR: 39.95, precioUSD: 43.95, tallas: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 'prod-103', nombre: 'Chaqueta cortavientos', categoria: 'ropa', precioEUR: 45.0, precioUSD: 49.50, tallas: ['M', 'L', 'XL'] },
  { id: 'prod-104', nombre: 'Equipación oficial fútbol', categoria: 'deporte', precioEUR: 55.0, precioUSD: 60.50, tallas: ['S', 'M', 'L'] },
  { id: 'prod-105', nombre: 'Mochila UCJC', categoria: 'material', precioEUR: 29.9, precioUSD: 32.89, tallas: [] },
  { id: 'prod-106', nombre: 'Cuaderno A4', categoria: 'material', precioEUR: 4.5, precioUSD: 4.95, tallas: [] },
  { id: 'prod-107', nombre: 'Taza de graduación', categoria: 'regalos', precioEUR: 9.95, precioUSD: 10.95, tallas: [] },
  { id: 'prod-108', nombre: 'Llavero metálico', categoria: 'regalos', precioEUR: 5.0, precioUSD: 5.50, tallas: [] },
];
