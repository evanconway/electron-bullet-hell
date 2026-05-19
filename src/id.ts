let id = 0;

export const getId = () => {
  const result = id;
  id += 1;
  return result;
};
