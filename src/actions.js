import { message } from 'antd';
import Promise from 'bluebird';
import Nedb from 'nedb';
import electron from 'electron';

const app = electron.remote.app;
const userData = app.getAppPath('userData');

const db = new Nedb({
  filename: `${userData}/datafile`,
  autoload: true,
});
const Cursor = db.find().constructor;
Promise.promisifyAll(Nedb.prototype);
Promise.promisifyAll(Cursor.prototype);

/**
 * @param {Promise}
 */
export const load = () => db.find().execAsync();

/**
 * @param {Object} values
 * @param {string} values.javCode
 * @param {string} values.javName
 * @param {string[]} values.tags
 * @return {Promise}
 */
export const create = values =>
  db
    .insertAsync(values)
    .then(() => {
      message.success('Success creating data.');
    })
    .catch((error) => {
      message.error(`Failed in create data, error: ${error.message}`);
    });

/**
 * @param {string} id
 * @param {Object} values
 * @param {string} values.javCode
 * @param {string} values.javName
 * @param {string[]} values.tags
 * @return {Promise}
 */
export const updateById = (id, values) =>
  db
    .updateAsync({ _id: id }, { $set: values }, {})
    .then(() => {
      message.success('Success updating data.');
    })
    .catch((error) => {
      message.error(`Failed in updating data, error: ${error.message}`);
    });

/**
 * @param {string} id
 * @return {Promise}
 */
export const remove = id =>
  db
    .removeAsync({ _id: id }, {})
    .then((numRemoved) => {
      // db.persistence.compactDatafile();
      if (numRemoved === 0) {
        message.warn('Nothing to be removed!');
        return;
      }
      message.success(`Success to remove, removed count: ${numRemoved}`);
    })
    .catch((error) => {
      if (error) {
        message.error('Failed to remove!');
      }
    });
