import * as svelteSlabs from "svelte-slabs-renderer";
import THEME_COMPONENTS from "./**/*.svelte";

/**
 * Convert a component path (like in bookshop) to a component name.
 * Removes duplicate file/folder name, stops at components folder or dotpath.
 * @param  {String} filepath Raw filepath that was imported
 * @return {String}          Component name, as per bookshop conventions
 */
const rewriteSvelteComponent = (filepath) => {
  const fp = filepath.toLowerCase().split('/').reverse();
  const componentName = [fp[0].replace(/\..*$/, '')];
  const startAt = fp[1] === componentName[0] ? 2 : 1;
  for (let i = startAt; i < fp.length; i++) {
    if (fp[i] === 'components') break;
    if (/\./.test(fp[i])) break;
    componentName.unshift(fp[i]);
  }
  return componentName.join('/');
};

/**
 * Turn a raw import-glob-keyed object into a map of components
 * @param  {Object} importedObj Output from import-glob-keyed
 * @param  {Object} appObj      Object to insert components into
 */
const mapSvelteFiles = (importedObj, appObj) => {
	for (let [file, component] of Object.entries(importedObj)) {
		file = rewriteSvelteComponent(file);
		appObj[file] = component.default ? component.default : component;
	}
}

(function() {
  import(/* webpackIgnore: true */ "/assets/site/components.js").then(m => {
    const usableApps = {};
    if (window.bookshop_components) mapSvelteFiles(window.bookshop_components.default, usableApps);
    if (typeof THEME_COMPONENTS !== 'undefined') mapSvelteFiles(THEME_COMPONENTS, usableApps);

    svelteSlabs.renderSlabs(usableApps, {
    })
  })
}());


