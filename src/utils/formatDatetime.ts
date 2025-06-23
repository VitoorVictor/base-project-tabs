export function formatDatetime(datetime: string) {
  const data = new Date(datetime);

  // Formatar para "dd/mm/yyyy HH:MM:SS"
  const dia = String(data.getUTCDate()).padStart(2, "0");
  const mes = String(data.getUTCMonth() + 1).padStart(2, "0"); // Meses começam do zero
  const ano = data.getUTCFullYear();
  const horas = String(data.getUTCHours()).padStart(2, "0");
  const minutos = String(data.getUTCMinutes()).padStart(2, "0");
  const segundos = String(data.getUTCSeconds()).padStart(2, "0");

  const dataFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
  return dataFormatada;
}
