export function isEmpty(obj) {

  if (obj === null || obj === undefined) {
    return true;
  }
  for (let i in obj) {
    return false;
  }
  return true;
}