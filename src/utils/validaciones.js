// 🛡️ Utilidades de validación para los módulos del sistema
// Centraliza las reglas de validación y los mensajes de error
// para que Clientes, Ventas, Lotes y Gastos usen las mismas reglas.

export function limpiarTexto(valor) {
  return (valor ?? '').toString().trim();
}

export function esNumero(valor) {
  return valor !== '' && valor !== null && valor !== undefined && !isNaN(Number(valor));
}

// ✅ Nombre de persona / lote / producto, etc.
export function validarNombre(valor, { minimo = 3, maximo = 60, campo = 'nombre' } = {}) {
  const texto = limpiarTexto(valor);
  if (!texto) return `El ${campo} es obligatorio`;
  if (texto.length < minimo) return `El ${campo} debe tener al menos ${minimo} caracteres`;
  if (texto.length > maximo) return `El ${campo} no puede superar los ${maximo} caracteres`;
  return null;
}

// ✅ Teléfono (7 a 10 dígitos; permite espacios y guiones al escribirlo)
export function validarTelefono(valor) {
  const texto = limpiarTexto(valor);
  if (!texto) return 'El teléfono es obligatorio';
  const soloDigitos = texto.replace(/[\s-]/g, '');
  if (!/^\d+$/.test(soloDigitos)) return 'El teléfono solo puede contener números';
  if (soloDigitos.length < 7 || soloDigitos.length > 10) {
    return 'El teléfono debe tener entre 7 y 10 dígitos';
  }
  return null;
}

// ✅ Número genérico (cantidad, valor unitario, abono, etc.)
export function validarNumero(
  valor,
  { minimo = 0, maximo = Infinity, entero = false, campo = 'valor', obligatorio = true } = {}
) {
  const texto = limpiarTexto(valor);
  if (!texto) {
    return obligatorio ? `El ${campo} es obligatorio` : null;
  }
  if (!esNumero(texto)) return `El ${campo} debe ser un número válido`;
  const numero = Number(texto);
  if (entero && !Number.isInteger(numero)) return `El ${campo} debe ser un número entero`;
  if (numero < minimo) return `El ${campo} no puede ser menor a ${minimo}`;
  if (numero > maximo) return `El ${campo} no puede ser mayor a ${maximo}`;
  return null;
}

// ✅ Fecha en formato yyyy-mm-dd
export function validarFecha(valor, { campo = 'fecha' } = {}) {
  const texto = limpiarTexto(valor);
  if (!texto) return `La ${campo} es obligatoria`;
  const fecha = new Date(texto);
  if (isNaN(fecha.getTime())) return `La ${campo} no es válida`;
  return null;
}

// ✅ Ejecuta varias validaciones y devuelve el primer error encontrado (o null si todo está bien)
export function primerError(...validaciones) {
  for (const err of validaciones) {
    if (err) return err;
  }
  return null;
}
