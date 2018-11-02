const DATA = [];
const TIMEOUT = 1000;

function fakeRequest(fn, ms) {
  return new Promise((resolve, reject) => setTimeout(async () => {
    try {
      resolve(fn());
    } catch (e) {
      reject(e);
    }
  }, ms));
}
function _retreiveData () {
  try {
    const savedData = JSON.parse(global.localStorage.getItem('fakebackend'));
    savedData.forEach(item => DATA.push(item));
  } catch (e) {}
}

function _saveData () {
  global.localStorage.setItem('fakebackend', JSON.stringify(DATA));
}

function _create (data) {
  const id = DATA.length;
  const newData = {
    ...data,
    id,
  };
  DATA.push(newData);
  _saveData();
  return newData;
}

function _update (id, data) {
  const prevDataIndex = DATA.findIndex(item => item.id === id);;

  if (prevDataIndex === -1) throw new Error('not found');

  const newData = {
    ...data,
    id,
  };
  DATA.splice(prevDataIndex, 1, newData);
  _saveData();
  return newData;
}

function _delete (id) {
  const prevDataIndex = DATA.findIndex(item => item.id === id);;

  if (prevDataIndex === -1) throw new Error('not found');

  DATA.splice(prevDataIndex, 1);
  _saveData();
  return id;
}

function _get (id) {
  const item = DATA.find(item => item.id === id);

  if (!item) throw new Error('not found');

  return item;
}

function _getAll () {
  return DATA.map(item => ({ ...item }));
}

_retreiveData();

export const create = data => fakeRequest(() => _create(data), TIMEOUT);
export const update = (id, data) => fakeRequest(() => _update(id, data), TIMEOUT);
export const get = id => fakeRequest(() => _get(id), TIMEOUT);
export const getAll = () => fakeRequest(_getAll, TIMEOUT);
export const remove = id => fakeRequest(() => _delete(id), TIMEOUT);
