//  Compare object with required fields
const obj = (object: any, requiredFields: string[]) => {
  for (const field of requiredFields) {
    if (!object[field]) {
      return false;
    } else {
      return true;
    }
  }
};

//  Validate an array's length
const arr = (array: any[], length: number[]) => {
  const [min, max] = length;

  if (array.length < min || array.length > max) {
    return false;
  } else {
    return true;
  }
};

const match = {
  obj,
  arr,
};

export default match;
