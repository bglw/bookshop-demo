/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./_scripts/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./_scripts/index.js":
/*!***************************!*\
  !*** ./_scripts/index.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_slabs_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte-slabs-renderer */ "./node_modules/svelte-slabs-renderer/index.js");

;

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

    svelte_slabs_renderer__WEBPACK_IMPORTED_MODULE_0__["renderSlabs"](usableApps, {
    })
  })
}());




/***/ }),

/***/ "./node_modules/svelte-slabs-renderer/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/svelte-slabs-renderer/index.js ***!
  \*****************************************************/
/*! exports provided: renderSlabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderSlabs", function() { return renderSlabs; });
/**
 * Find props for a slab based on the given propstring
 * @param  {String} propString String defining where to locate the svelte props
 * @return {Object}            Props ready to pass to svelte
 */
const resolveProps = (propString) => {
	if (!propString) return {};
	const [src, key] = propString.split(':');
	if (src === 'window') {
		if (!window.svelteSlabs) return {};
		return window.svelteSlabs[key] || {};
	} else if (src === 'endpoint') {
		console.warn('Endpoints not yet supported');
		return {};
	}
}

/**
 * Look for svelte tags on the page, and try render an app into them.
 * @param  {Object} apps    All svelte components available, keyed by name
 * @return {Object}         All svelte apps that were rendered on the page
 */
const renderSlabs = (apps, opts) => {
	opts = {
		hydrate: true,
		...opts
	}

	const renderTargets = document.querySelectorAll("[data-svelte-slab]");
	const renderedSlabs = [];

	for (const target of renderTargets) {
		const slabName = target.dataset.svelteSlab;
		const slabPropsKey = target.dataset.svelteSlabProps;

		const app = apps[slabName];
		if (app) {
			const slabProps = resolveProps(slabPropsKey);
			if (typeof opts.transformProps === 'function') {
				opts.transformProps(slabProps);
			}

			renderedSlabs.push(new app({target, props: slabProps, hydrate: opts.hydrate}));
		} else {
			console.warn(`WARN: Svelte slab "${slabName}" not found`)
		}
	}

	return renderedSlabs;
}

/***/ })

/******/ });
//# sourceMappingURL=app.js.map