const formatValue = (value: number): string =>
  Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);

export default formatValue;
