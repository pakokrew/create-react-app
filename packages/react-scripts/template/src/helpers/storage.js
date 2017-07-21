const _get = localStorage.getItem.bind(localStorage);
const _set = localStorage.setItem.bind(localStorage);

const OFFLINE_CONFIG_KEY = 'offline-config';

const get = (key) => {
  try {
    const rawData = _get(key);
    return JSON.parse(rawData);
  } catch (e) {
    return null;
  }
};

const set = (key, data) => {
  try {
    const rawData = JSON.stringify(data);
    _set(key, rawData);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export function getOfflineConfig(key, defaultValue) {
  const config = get(OFFLINE_CONFIG_KEY) || {};
  if (key) {
    return config[key] || defaultValue || null;
  }
  return config;
}

export function setOfflineConfig(key, data) {
  const config = getOfflineConfig();
  config[key] = data;
  set(OFFLINE_CONFIG_KEY, config);
}
