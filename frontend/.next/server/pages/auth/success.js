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
exports.id = "pages/auth/success";
exports.ids = ["pages/auth/success"];
exports.modules = {

/***/ "./components/Success.js":
/*!*******************************!*\
  !*** ./components/Success.js ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Header */ \"./components/Header.js\");\n/* harmony import */ var _components_styles_MessageStyles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/styles/MessageStyles */ \"./components/styles/MessageStyles.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\n\n\n\n\n\n\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal[\"default\"].signature : function (a) {\n  return a;\n};\n\n\n\n\n\nvar Success = /*#__PURE__*/function (_Component) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(Success, _Component);\n\n  var _super = _createSuper(Success);\n\n  function Success(props) {\n    var _this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Success);\n\n    _this = _super.call(this, props);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), \"fetchData\", function () {\n      fetch(\"\".concat(\"http://localhost:8090\", \"/auth/api/success\"), {\n        method: 'POST',\n        headers: {\n          'Accept': 'application/json',\n          'Content-Type': 'application/json'\n        },\n        credentials: 'include'\n      }).then(function (res) {\n        return res.json();\n      }).then(function (resData) {\n        _this.setState({\n          name: resData.userName\n        });\n      })[\"catch\"](function (err) {\n        return console.log(err);\n      });\n    });\n\n    _this.state = {\n      name: ''\n    };\n    _this.fetchData = _this.fetchData.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));\n    return _this;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Success, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      this.fetchData();\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default().createElement((react__WEBPACK_IMPORTED_MODULE_7___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default().createElement(_components_Header__WEBPACK_IMPORTED_MODULE_8__.default, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default().createElement(_components_styles_MessageStyles__WEBPACK_IMPORTED_MODULE_9__.default, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default().createElement(\"h1\", null, \"Thank You \", this.state.name.toUpperCase(), \" For Your Order! \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default().createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default().createElement(\"br\", null), \" If You Have Any Question Please Send Us An Email On: \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default().createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default().createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default().createElement(\"strong\", null, \"myshop@customerservice.com\"))));\n    }\n  }, {\n    key: \"__reactstandin__regenerateByEval\",\n    value: // @ts-ignore\n    function __reactstandin__regenerateByEval(key, code) {\n      // @ts-ignore\n      this[key] = eval(code);\n    }\n  }]);\n\n  return Success;\n}(react__WEBPACK_IMPORTED_MODULE_7__.Component);\n\nvar _default = Success;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(Success, \"Success\", \"/Users/stefano.mezza/e-commerce/frontend/components/Success.js\");\n  reactHotLoader.register(_default, \"default\", \"/Users/stefano.mezza/e-commerce/frontend/components/Success.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udGVuZC8uL2NvbXBvbmVudHMvU3VjY2Vzcy5qcz82MmNlIl0sIm5hbWVzIjpbIlN1Y2Nlc3MiLCJwcm9wcyIsImZldGNoIiwicHJvY2VzcyIsIm1ldGhvZCIsImhlYWRlcnMiLCJjcmVkZW50aWFscyIsInRoZW4iLCJyZXMiLCJqc29uIiwicmVzRGF0YSIsInNldFN0YXRlIiwibmFtZSIsInVzZXJOYW1lIiwiZXJyIiwiY29uc29sZSIsImxvZyIsInN0YXRlIiwiZmV0Y2hEYXRhIiwiYmluZCIsInRvVXBwZXJDYXNlIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUE7QUFDQTs7SUFFTUEsTzs7Ozs7QUFFRixtQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNmLDhCQUFNQSxLQUFOOztBQURlLDBMQWFQLFlBQU07QUFFZEMsV0FBSyxXQUFJQyx1QkFBSix3QkFBd0Q7QUFFekRDLGNBQU0sRUFBRSxNQUZpRDtBQUl6REMsZUFBTyxFQUFFO0FBRUwsb0JBQVUsa0JBRkw7QUFHTCwwQkFBZ0I7QUFIWCxTQUpnRDtBQVd6REMsbUJBQVcsRUFBRTtBQVg0QyxPQUF4RCxDQUFMLENBZUNDLElBZkQsQ0FlTSxVQUFBQyxHQUFHLEVBQUk7QUFFVCxlQUFPQSxHQUFHLENBQUNDLElBQUosRUFBUDtBQUVILE9BbkJELEVBcUJDRixJQXJCRCxDQXFCTSxVQUFBRyxPQUFPLEVBQUk7QUFFYixjQUFLQyxRQUFMLENBQWM7QUFBRUMsY0FBSSxFQUFFRixPQUFPLENBQUNHO0FBQWhCLFNBQWQ7QUFFSCxPQXpCRCxXQTJCTyxVQUFBQyxHQUFHO0FBQUEsZUFBSUMsT0FBTyxDQUFDQyxHQUFSLENBQVlGLEdBQVosQ0FBSjtBQUFBLE9BM0JWO0FBNkJILEtBNUNrQjs7QUFHZixVQUFLRyxLQUFMLEdBQWE7QUFFVEwsVUFBSSxFQUFFO0FBRkcsS0FBYjtBQU1BLFVBQUtNLFNBQUwsR0FBaUIsTUFBS0EsU0FBTCxDQUFlQyxJQUFmLDRGQUFqQjtBQVRlO0FBV2xCOzs7O1dBbUNELDZCQUFvQjtBQUVoQixXQUFLRCxTQUFMO0FBRUg7OztXQUVELGtCQUFTO0FBRUwsMEJBQ1IsdUlBQ1ksMkRBQUMsdURBQUQsT0FEWixlQUdZLDJEQUFDLHFFQUFELHFCQUVJLHFGQUFlLEtBQUtELEtBQUwsQ0FBV0wsSUFBWCxDQUFnQlEsV0FBaEIsRUFBZixvQ0FBOEQsc0VBQTlELGVBQXVFLHNFQUF2RSx5RUFBc0ksc0VBQXRJLGVBQStJLHNFQUEvSSxlQUNBLHdHQURBLENBRkosQ0FIWixDQURRO0FBY0g7Ozs7Ozs7Ozs7O0VBdEVpQkMsNEM7O2VBMEVQckIsTztBQUFmLCtEQUFlOzs7Ozs7Ozs7OzBCQTFFVEEsTyIsImZpbGUiOiIuL2NvbXBvbmVudHMvU3VjY2Vzcy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBIZWFkZXIgZnJvbSAnLi4vY29tcG9uZW50cy9IZWFkZXInO1xuaW1wb3J0IE1lc3NhZ2VTdHlsZXMgZnJvbSAnLi4vY29tcG9uZW50cy9zdHlsZXMvTWVzc2FnZVN0eWxlcyc7XG5cbmNsYXNzIFN1Y2Nlc3MgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcblxuICAgICAgICAgICAgbmFtZTogJycsXG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmV0Y2hEYXRhID0gdGhpcy5mZXRjaERhdGEuYmluZCh0aGlzKTtcblxuICAgIH1cblxuICAgIGZldGNoRGF0YSA9ICgpID0+IHtcblxuICAgICAgICBmZXRjaChgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUElfVVJMfS9hdXRoL2FwaS9zdWNjZXNzYCwge1xuXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcblxuICAgICAgICAgICAgaGVhZGVyczoge1xuXG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgLnRoZW4ocmVzID0+IHtcblxuICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG5cbiAgICAgICAgfSlcblxuICAgICAgICAudGhlbihyZXNEYXRhID0+IHtcblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG5hbWU6IHJlc0RhdGEudXNlck5hbWUgfSk7XG5cbiAgICAgICAgfSlcblxuICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpO1xuXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG5cbiAgICAgICAgdGhpcy5mZXRjaERhdGEoKTtcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKFxuPD5cbiAgICAgICAgICAgIDxIZWFkZXIgLz5cblxuICAgICAgICAgICAgPE1lc3NhZ2VTdHlsZXM+XG5cbiAgICAgICAgICAgICAgICA8aDE+VGhhbmsgWW91IHt0aGlzLnN0YXRlLm5hbWUudG9VcHBlckNhc2UoKX0gRm9yIFlvdXIgT3JkZXIhIDxicj48L2JyPjxicj48L2JyPiBJZiBZb3UgSGF2ZSBBbnkgUXVlc3Rpb24gUGxlYXNlIFNlbmQgVXMgQW4gRW1haWwgT246IDxicj48L2JyPjxicj48L2JyPlxuICAgICAgICAgICAgICAgIDxzdHJvbmc+bXlzaG9wQGN1c3RvbWVyc2VydmljZS5jb208L3N0cm9uZz48L2gxPlxuXG4gICAgICAgICAgICA8L01lc3NhZ2VTdHlsZXM+XG5cbjwvPlxuICAgICAgICApXG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3VjY2VzczsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/Success.js\n");

/***/ }),

/***/ "./pages/auth/success.js":
/*!*******************************!*\
  !*** ./pages/auth/success.js ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_Success__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Success */ \"./components/Success.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal[\"default\"].signature : function (a) {\n  return a;\n};\n\n\n\n\nvar successPage = function successPage() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Success__WEBPACK_IMPORTED_MODULE_1__.default, null);\n};\n\nvar _default = successPage;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(successPage, \"successPage\", \"/Users/stefano.mezza/e-commerce/frontend/pages/auth/success.js\");\n  reactHotLoader.register(_default, \"default\", \"/Users/stefano.mezza/e-commerce/frontend/pages/auth/success.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udGVuZC8uL3BhZ2VzL2F1dGgvc3VjY2Vzcy5qcz80MDY3Il0sIm5hbWVzIjpbInN1Y2Nlc3NQYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUE7O0FBRUEsSUFBTUEsV0FBVyxHQUFHLFNBQWRBLFdBQWMsR0FBTTtBQUV0QixzQkFBTywyREFBQyx3REFBRCxPQUFQO0FBRUgsQ0FKRDs7ZUFNZUEsVztBQUFmLCtEQUFlOzs7Ozs7Ozs7OzBCQU5UQSxXIiwiZmlsZSI6Ii4vcGFnZXMvYXV0aC9zdWNjZXNzLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IFN1Y2Nlc3MgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9TdWNjZXNzJztcblxuY29uc3Qgc3VjY2Vzc1BhZ2UgPSAoKSA9PiB7XG5cbiAgICByZXR1cm4gPFN1Y2Nlc3MgLz5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBzdWNjZXNzUGFnZTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/auth/success.js\n");

/***/ }),

/***/ "fuse.js":
/*!**************************!*\
  !*** external "fuse.js" ***!
  \**************************/
/***/ (function(module) {

"use strict";
module.exports = require("fuse.js");;

/***/ }),

/***/ "../next-server/lib/router-context":
/*!**************************************************************!*\
  !*** external "next/dist/next-server/lib/router-context.js" ***!
  \**************************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router-context.js");;

/***/ }),

/***/ "../next-server/lib/router/utils/get-asset-path-from-route":
/*!**************************************************************************************!*\
  !*** external "next/dist/next-server/lib/router/utils/get-asset-path-from-route.js" ***!
  \**************************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router/utils/get-asset-path-from-route.js");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ "react-cookies":
/*!********************************!*\
  !*** external "react-cookies" ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = require("react-cookies");;

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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, ["vendors-node_modules_next_node_modules_babel_runtime_helpers_classCallCheck_js-node_modules_n-b54ff8","vendors-node_modules_babel_runtime_helpers_classCallCheck_js-node_modules_babel_runtime_helpe-d88b23","vendors-node_modules_next_link_js-node_modules_react-icons_fa_index_esm_js","components_Header_js","components_styles_MessageStyles_js"], function() { return __webpack_exec__("./pages/auth/success.js"); });
module.exports = __webpack_exports__;

})();