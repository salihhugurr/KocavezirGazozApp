export const formatDate = (date: string) => {
  const splittedDate = date.split('-');
  const day = splittedDate[2];
  const month = splittedDate[1];
  const year = splittedDate[0];
  return `${day}.${month}.${year}`;
};

export const formatDateWithoutSlash = (date: Date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${day}${month}${year}`;
};

export const formatDateForBackend = (date: Date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${year}-${month}-${day}`;
};

export const formatDateSKT = (d: string) => {
  const date = new Date(d);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `${month}/${year}`;
};
