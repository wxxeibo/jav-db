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
 * @param {Promise}
 */
export const save = (javCode, javName) =>
  db
    .insertAsync({ javCode, javName })
    .then(() => {
      message.success('Success saving data.');
    })
    .catch((error) => {
      message.error(`Failed in save data, error: ${error.message}`);
    });

/**
 * @param {Promise}
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
