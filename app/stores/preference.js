import { extend, has, clone } from 'lodash';

import electron from 'electron';
const ipc = electron.ipcRenderer;

import userStore from './user';
import ls from '../services/ls';

export default {
    storeKey: '',

    state: {
        volume: 7,
        notify: true,
        repeatMode: 'NO_REPEAT',
        showExtraPanel: true,
        confirmClosing: false,
        equalizer: {
            preamp: 0,
            gains: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        artistsViewMode: null,
        albumsViewMode: null,
    },

    /**
     * Init the store.
     *
     * @param  {Object} user The user whose preferences we are managing.
     */
    init(user = null) {
        if (!user) {
            user = userStore.current;
        }

        this.storeKey = `preferences_${user.id}`;
        extend(this.state, ls.get(this.storeKey, this.state));

        this.updateMainProcess();
    },

    set(key, val) {
        this.state[key] = val;
        this.save();
    },

    get(key) {
        return has(this.state, key) ? this.state[key] : null;
    },

    save() {
        ls.set(this.storeKey, this.state);

        this.updateMainProcess();
    },

    /**
     * Update Electron's main process about the user's preferences.
     */
    updateMainProcess() {
        // We send the preferences to the main process as a cloned object, as the original is filled with
        // getters/setters due to Vue's reactivity and can't be JSON-serialized.
        ipc.send('PreferenceSaved', clone(this.state));
    },
};
