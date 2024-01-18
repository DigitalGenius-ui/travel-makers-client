export const setStorage = ({ item, key }) => {
  return localStorage.setItem(key, JSON.stringify(item));
};

export const getStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
