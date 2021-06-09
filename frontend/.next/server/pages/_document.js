/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function() {
var exports = {};
exports.id = "pages/_document";
exports.ids = ["pages/_document"];
exports.modules = {

/***/ "./pages/_document.js":
/*!****************************!*\
  !*** ./pages/_document.js ***!
  \****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ MyDocument; }\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/document */ \"./node_modules/next/document.js\");\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_10__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\n\n\n\n\n\n\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal[\"default\"].signature : function (a) {\n  return a;\n};\n\n\n\n\n\nvar MyDocument = /*#__PURE__*/function (_Document) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(MyDocument, _Document);\n\n  var _super = _createSuper(MyDocument);\n\n  function MyDocument() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, MyDocument);\n\n    return _super.apply(this, arguments);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(MyDocument, null, [{\n    key: \"getInitialProps\",\n    value: function () {\n      var _getInitialProps = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee(ctx) {\n        var sheet, originalRenderPage, initialProps;\n        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                sheet = new styled_components__WEBPACK_IMPORTED_MODULE_10__.ServerStyleSheet();\n                originalRenderPage = ctx.renderPage;\n                _context.prev = 2;\n\n                ctx.renderPage = function () {\n                  return originalRenderPage({\n                    enhanceApp: function enhanceApp(App) {\n                      return function (props) {\n                        return sheet.collectStyles( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default().createElement(App, props));\n                      };\n                    }\n                  });\n                };\n\n                _context.next = 6;\n                return next_document__WEBPACK_IMPORTED_MODULE_9___default().getInitialProps(ctx);\n\n              case 6:\n                initialProps = _context.sent;\n                return _context.abrupt(\"return\", _objectSpread(_objectSpread({}, initialProps), {}, {\n                  styles: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default().createElement((react__WEBPACK_IMPORTED_MODULE_8___default().Fragment), null, initialProps.styles, sheet.getStyleElement())\n                }));\n\n              case 8:\n                _context.prev = 8;\n                sheet.seal();\n                return _context.finish(8);\n\n              case 11:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, null, [[2,, 8, 11]]);\n      }));\n\n      function getInitialProps(_x) {\n        return _getInitialProps.apply(this, arguments);\n      }\n\n      return getInitialProps;\n    }()\n  }]);\n\n  return MyDocument;\n}((next_document__WEBPACK_IMPORTED_MODULE_9___default()));\n\n\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(MyDocument, \"MyDocument\", \"/Users/stefano.mezza/e-commerce/frontend/pages/_document.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udGVuZC8uL3BhZ2VzL19kb2N1bWVudC5qcz9lNzBkIl0sIm5hbWVzIjpbIk15RG9jdW1lbnQiLCJjdHgiLCJzaGVldCIsIlNlcnZlclN0eWxlU2hlZXQiLCJvcmlnaW5hbFJlbmRlclBhZ2UiLCJyZW5kZXJQYWdlIiwiZW5oYW5jZUFwcCIsIkFwcCIsInByb3BzIiwiY29sbGVjdFN0eWxlcyIsIkRvY3VtZW50IiwiaW5pdGlhbFByb3BzIiwic3R5bGVzIiwiZ2V0U3R5bGVFbGVtZW50Iiwic2VhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOztJQUVxQkEsVTs7Ozs7Ozs7Ozs7Ozs7aU1BQ25CLGlCQUE2QkMsR0FBN0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1FDLHFCQURSLEdBQ2dCLElBQUlDLGdFQUFKLEVBRGhCO0FBRVFDLGtDQUZSLEdBRTZCSCxHQUFHLENBQUNJLFVBRmpDO0FBQUE7O0FBS0lKLG1CQUFHLENBQUNJLFVBQUosR0FBaUI7QUFBQSx5QkFDZkQsa0JBQWtCLENBQUM7QUFDakJFLDhCQUFVLEVBQUUsb0JBQUNDLEdBQUQ7QUFBQSw2QkFBUyxVQUFDQyxLQUFEO0FBQUEsK0JBQ25CTixLQUFLLENBQUNPLGFBQU4sZUFBb0IsMkRBQUMsR0FBRCxFQUFTRCxLQUFULENBQXBCLENBRG1CO0FBQUEsdUJBQVQ7QUFBQTtBQURLLG1CQUFELENBREg7QUFBQSxpQkFBakI7O0FBTEo7QUFBQSx1QkFXK0JFLG9FQUFBLENBQXlCVCxHQUF6QixDQVgvQjs7QUFBQTtBQVdVVSw0QkFYVjtBQUFBLGlGQWFTQSxZQWJUO0FBY01DLHdCQUFNLGVBQ0osMEhBQ0dELFlBQVksQ0FBQ0MsTUFEaEIsRUFFR1YsS0FBSyxDQUFDVyxlQUFOLEVBRkg7QUFmUjs7QUFBQTtBQUFBO0FBc0JJWCxxQkFBSyxDQUFDWSxJQUFOO0FBdEJKOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE87Ozs7Ozs7Ozs7O0VBRHNDSixzRDs7Ozs7Ozs7Ozs7OzBCQUFuQlYsVSIsImZpbGUiOiIuL3BhZ2VzL19kb2N1bWVudC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRG9jdW1lbnQgZnJvbSAnbmV4dC9kb2N1bWVudCc7XG5pbXBvcnQgeyBTZXJ2ZXJTdHlsZVNoZWV0IH0gZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNeURvY3VtZW50IGV4dGVuZHMgRG9jdW1lbnQge1xuICBzdGF0aWMgYXN5bmMgZ2V0SW5pdGlhbFByb3BzKGN0eCkge1xuICAgIGNvbnN0IHNoZWV0ID0gbmV3IFNlcnZlclN0eWxlU2hlZXQoKVxuICAgIGNvbnN0IG9yaWdpbmFsUmVuZGVyUGFnZSA9IGN0eC5yZW5kZXJQYWdlXG5cbiAgICB0cnkge1xuICAgICAgY3R4LnJlbmRlclBhZ2UgPSAoKSA9PlxuICAgICAgICBvcmlnaW5hbFJlbmRlclBhZ2Uoe1xuICAgICAgICAgIGVuaGFuY2VBcHA6IChBcHApID0+IChwcm9wcykgPT5cbiAgICAgICAgICAgIHNoZWV0LmNvbGxlY3RTdHlsZXMoPEFwcCB7Li4ucHJvcHN9IC8+KSxcbiAgICAgICAgfSlcblxuICAgICAgY29uc3QgaW5pdGlhbFByb3BzID0gYXdhaXQgRG9jdW1lbnQuZ2V0SW5pdGlhbFByb3BzKGN0eClcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmluaXRpYWxQcm9wcyxcbiAgICAgICAgc3R5bGVzOiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIHtpbml0aWFsUHJvcHMuc3R5bGVzfVxuICAgICAgICAgICAge3NoZWV0LmdldFN0eWxlRWxlbWVudCgpfVxuICAgICAgICAgIDwvPlxuICAgICAgICApLFxuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzaGVldC5zZWFsKClcbiAgICB9XG4gIH1cbn0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_document.js\n");

/***/ }),

/***/ "../next-server/lib/constants":
/*!*********************************************************!*\
  !*** external "next/dist/next-server/lib/constants.js" ***!
  \*********************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/constants.js");;

/***/ }),

/***/ "../next-server/lib/document-context":
/*!****************************************************************!*\
  !*** external "next/dist/next-server/lib/document-context.js" ***!
  \****************************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/document-context.js");;

/***/ }),

/***/ "../next-server/lib/head-manager-context":
/*!********************************************************************!*\
  !*** external "next/dist/next-server/lib/head-manager-context.js" ***!
  \********************************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/head-manager-context.js");;

/***/ }),

/***/ "../next-server/lib/utils":
/*!*****************************************************!*\
  !*** external "next/dist/next-server/lib/utils.js" ***!
  \*****************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/utils.js");;

/***/ }),

/***/ "../next-server/server/get-page-files":
/*!*****************************************************************!*\
  !*** external "next/dist/next-server/server/get-page-files.js" ***!
  \*****************************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/server/get-page-files.js");;

/***/ }),

/***/ "../next-server/server/utils":
/*!********************************************************!*\
  !*** external "next/dist/next-server/server/utils.js" ***!
  \********************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/server/utils.js");;

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/***/ (function(module) {

"use strict";
module.exports = require("prop-types");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ "regenerator-runtime":
/*!**************************************!*\
  !*** external "regenerator-runtime" ***!
  \**************************************/
/***/ (function(module) {

"use strict";
module.exports = require("regenerator-runtime");;

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = require("styled-components");;

/***/ }),

/***/ "styled-jsx/server":
/*!************************************!*\
  !*** external "styled-jsx/server" ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = require("styled-jsx/server");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, ["vendors-node_modules_next_node_modules_babel_runtime_helpers_classCallCheck_js-node_modules_n-b54ff8","vendors-node_modules_babel_runtime_helpers_classCallCheck_js-node_modules_babel_runtime_helpe-d88b23","vendors-node_modules_next_node_modules_babel_runtime_helpers_getPrototypeOf_js-node_modules_n-db576a","vendors-node_modules_babel_runtime_helpers_asyncToGenerator_js-node_modules_babel_runtime_reg-98b57c"], function() { return __webpack_exec__("./pages/_document.js"); });
module.exports = __webpack_exports__;

})();