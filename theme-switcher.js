export class ThemeSwitcher {
    constructor(options = {}) {
        this.config(options);
        this.init();
    }

    config(options) {
        const defaults = {
            storage: globalThis.localStorage,
            storageKeyName: 'color-scheme',
            button: null,
            classPrefix: 'theme-'
        }
        this.settings = Object.assign({}, defaults, options);
        this.storage = this.settings.storage;
        this.button = this.settings.button;
    }

    getStorageValue() {
        return this.storage.getItem(this.settings.storageKeyName);
    }

    setStorageValue(value) {
        this.storage.setItem(this.settings.storageKeyName, value);
        return this;
    }

    isDarkByDefault() {
        return window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    isLightByDefault() {
        return !this.isDarkByDefault();
    }

    isDark() {
        const storage = this.getStorageValue();
        if (storage) {
            return storage === 'dark';
        }
        return this.isDarkByDefault();
    }

    isLight() {
        const storage = this.getStorageValue();
        if (storage) {
            return storage === 'light';
        }
        return this.isLightByDefault();
    }

    setDark() {
        return this.setValue('dark')
    }

    setLight() {
        return this.setValue('light')
    }

    setValue(value) {
        const curr = this.getStorageValue();
        this.setStorageValue(value);
        document.documentElement
            .classList[this.isDark() ? 'add' : 'remove'](`${this.settings.classPrefix}dark`);

        document.documentElement
            .classList[this.isLight() ? 'add' : 'remove'](`${this.settings.classPrefix}light`)
    }

    toggle() {
        const isDark = this.isDark();
        const newValue = isDark ? 'light' : 'dark';
        this.setValue(newValue);
    }

    initButton() {
        if (this.button) {
            this.button.addEventListener('click', () => {
                this.toggle()
            })
        }
    }

    init() {
        this.setValue(this.isDark() ? 'dark' : 'light');
        this.initButton();
    }
}
