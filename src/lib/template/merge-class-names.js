/**
 * Combine multiple string into one,
 * separated by spaces and filters out the empty strings
 *
 * @params {string} (Multiple) classname - Single classname
 * @returns {string} ClassNames - Combined classnames
 */
export default (...classNames) => [...classNames].filter((c) => !!c).join(" ");
