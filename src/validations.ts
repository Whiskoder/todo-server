export const isNumber = (opts: {
  value: unknown;
  name: string;
  min?: number;
  max?: number;
  required?: boolean;
}): { error?: string; value?: number } => {
  const { name, min, max, required = true } = opts;

  if (!required && opts.value === undefined) return { value: undefined };

  const value = Number(opts.value);

  if (!value || typeof value !== "number")
    return { error: `'${name}' debe ser un número` };

  if (min && value < min)
    return { error: `'${name}' debe ser mayor o igual a ${min}` };
  if (max && value > max)
    return { error: `'${name}' debe ser menor o igual a ${max} ` };

  return { value };
};

export const isString = (opts: {
  value: unknown;
  name: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
}): { error?: string; value?: string } => {
  const { value, name, minLength, maxLength, required = true } = opts;

  if (!required && value === undefined) return { value: undefined };

  if (!value || typeof value !== "string")
    return { error: `'${name}' debe ser un string` };

  if (minLength && value.length < minLength)
    return { error: `'${name}' debe tener al menos ${minLength} caracteres` };
  if (maxLength && value.length > maxLength)
    return { error: `'${name}' debe tener menos de ${maxLength} caracteres` };
  return { value };
};

export const isEnum = (opts: {
  value: unknown;
  name: string;
  values: string[];
  required?: boolean;
}): { error?: string; value?: string } => {
  const { value, name, values, required = true } = opts;

  if (!required && value === undefined) return { value: undefined };

  if (!value || typeof value !== "string")
    return { error: `'${name}' debe ser un string` };

  if (!values.includes(value))
    return {
      error: `'${name}' debe ser uno de los siguientes: ${values.join(", ")}`,
    };

  return { value };
};
