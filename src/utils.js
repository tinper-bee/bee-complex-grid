/**
 * @desc 语言locale转换为小写和中划线
 * @param {String} lang 输入语言
 */
 export function langTransform(lang) {
    if (!lang) return lang
    let reg = new RegExp('([a-zA-Z]{2})[_-]?([A-Za-z]+)', 'g')
    return lang.replace(reg, '$1-$2').toLowerCase()
}

/**
 * @desc 语言locale key map对象
 */
export const langMap = {
    'zh': 'zh-cn',
    'zh-cn': 'zh-cn',
    'en': 'en-us',
    'en-us': 'en-us',
    'zh-tw': 'zh-tw',
    'vi': 'vi-vn',
    'vi-vn': 'vi-vn'
}

/**
 * 获取locale的语言对象
 * @param localeVal
 * @param i18n
 */
export function getLangInfo(localeVal, i18n = {}) {
    let lang = '';
    if (typeof localeVal === "object") {
        if ('locale' in localeVal) {// 兼容antd语言包对象，对象中存在locale属性则直接获取语言类型即可
            lang = localeVal.locale;
        } else if ('lang' in localeVal) {// 兼容tinper的Locale组件语言包
            lang = localeVal.lang;
        } else {// 直接引入DataPicker组件语言包对象暂不提供支持
            console.error('暂不支持语言包对象，请使用locale="zh-cn"或locale="en"等语言标识');
        }
    } else if (typeof localeVal === "string") {// 4.x支持的语言标识
        lang = localeVal;
    }
    lang = langTransform(lang)
    lang = langMap[lang] ? langMap[lang] : lang; //  locale='en' 转换为 locale='en-us'
    // return {// 默认中文
    //     lang: lang || 'zh-cn', // 语言类型
    //     langMap: i18n[lang] || i18n // 语言关系包
    // }
    return i18n[lang] || i18n // 语言关系包
}