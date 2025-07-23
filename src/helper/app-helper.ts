import { v4 as uuIdv4 } from 'uuid';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

/**
 * Making random string
 * @param {int} limit
 * @return {string}
 */
export const makeRandomString = (limit: number = 8) => {
    return (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).slice(-limit);
};

/**
 * description :- triggerToast
 * created_at:- 12/12/2023 17:34:39
 * @param {{ type?: keyof typeof toast; msg: any }} param0
 * @return {*}
 */
export const triggerToast = ({ type, msg }: { type?: keyof typeof toast; msg: any }) => {
    /**
     * Get the message from the param object
     * @type {string}
     */
    const message = msg?.data?.message ?? msg?.response?.data?.message ?? msg?.message ?? msg;
    /**
     * Get the toast function from the toast object based on the type
     * @type {import("sonner").ToastFunction}
     */
    const toastFn = type ? toast[type] : toast;
    /**
     * Call the toast function with the message
     */
    return toastFn(message);
};

/**
 * description :- nFormatter
 * created_at:- 12/12/2023 17:38:40
 */
export const nFormatter = (n: any) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
};

/**
 * description :- getBrowserUniqueID
 * created_at:- 01/01/2024 12:42:05
 */
export const getBrowserUniqueID = () => {
    let browserUniqueID = Cookies.get('browserUniqueID');
    if (!browserUniqueID) {
        browserUniqueID = uuIdv4() + '===' + navigator.userAgent;
        Cookies.set('browserUniqueID', browserUniqueID);
    }
    return browserUniqueID;
};

/**
 * description :- deviceInfo
 * created_at:- 01/01/2024 12:45:19
 * @returns {object} - An object containing various information about the current device.
 * @property {boolean} isDesktop - Whether the device is a desktop machine.
 * @property {boolean} isTablet - Whether the device is a tablet.
 * @property {boolean} isMobile - Whether the device is a mobile phone.
 * @property {boolean} isMobileOrTab - Whether the device is a mobile phone or a tablet.
 * @property {boolean} isLandscape - Whether the device is currently in landscape orientation.
 * @property {boolean} isPortrait - Whether the device is currently in portrait orientation.
 * @property {string} userAgent - The user agent string of the browser.
 */
export const getDeviceInfo = (navigator: any) => {
    const ua = navigator ? navigator.userAgent : window.navigator.userAgent;
    const userAgent = ua.toLowerCase();
    const isTablet =
        // Check if the device is a tablet.
        // This is done by checking the user agent for certain keywords.
        // The regex is a bit complex, so let's break it down:
        // - `ipad` is the user agent string for an iPad.
        // - `tablet` is the user agent string for a tablet (but not an iPad).
        // - `android(?!.*mobile)` is the user agent string for an Android device,
        //   but not a mobile phone.
        // - `windows(?!.*phone)(.*touch)` is the user agent string for a Windows
        //   device with touch capabilities, but not a Windows phone.
        // - `kindle` is the user agent string for a Kindle device.
        // - `playbook` is the user agent string for a PlayBook device.
        // - `silk` is the user agent string for an Amazon Silk browser.
        // - `puffin(?!.*(IP|AP|WP))` is the user agent string for a Puffin browser,
        //   but not a Puffin browser on an iOS or Android device.
        /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
            userAgent
        ) ||
        // Check if the device is a Macintosh with touch capabilities.
        // This is done by checking the user agent for the string "macintosh"
        // and verifying that the "ontouchend" event is supported.
        (/macintosh/.test(userAgent) && 'ontouchend' in document);

    const isMobile = /mobile|iphone|ipod|android.*mobile|blackberry|iemobile|opera mini/.test(userAgent) && !isTablet;
    const isDesktop = !isMobile && !isTablet;
    const isLandscape = window.matchMedia('(orientation: landscape)').matches;
    const isPortrait = window.matchMedia('(orientation: portrait)').matches;

    return {
        isDesktop,
        isTablet,
        isMobile,
        isLandscape,
        isPortrait,
        userAgent,
    };
};

/**
 * Converts a given string to title case.
 * @param {string} title - The string to be converted to title case.
 * @returns {string} The string in title case.
 */
export const covertItToTitleCase = (title: string | undefined): string => {
    if (!title) return '';
    return title
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

/**
 * Capitalizes the first word of sentences.
 * @param {string} text - The text to be modified.
 * @returns {string} The modified text with the first word of each sentence capitalized.
 */
export const capSentences = (text: string | undefined): string => {
    if (!text) return '';
    // The regex matches the start of a sentence (either the start of the string
    // or one of the punctuation characters .!? followed by optional whitespace
    // and a lowercase letter. The match is replaced with the separator and the
    // character capitalized.
    return text.replace(/([.!?]\s*|^)(\p{Ll})/gu, (_, sep, char) => sep + char.toUpperCase());
};
