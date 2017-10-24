'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUiIcons = require('material-ui-icons');

var _colors = require('material-ui/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var styles = {
  editable: {
    cursor: 'pointer'
  }
};

var defaultValues = [1, 2, 3, 4, 5];

var Ch = function Ch(props) {
  var checked = props.checked,
      hovered = props.hovered,
      _props$readOnly = props.readOnly,
      readOnly = _props$readOnly === undefined ? false : _props$readOnly,
      p = _objectWithoutProperties(props, ['checked', 'hovered', 'readOnly']);

  var st = readOnly ? {} : styles.editable;
  if (checked) return _react2.default.createElement(_materialUiIcons.Star, _extends({ style: st, color: _colors.orange['500'] }, p));else if (hovered) return _react2.default.createElement(_materialUiIcons.StarBorder, _extends({ style: st, color: _colors.orange['500'] }, p));else return _react2.default.createElement(_materialUiIcons.StarBorder, _extends({ style: st, color: _colors.grey['500'] }, p));
};

var Rating = function (_React$Component) {
  _inherits(Rating, _React$Component);

  function Rating(props) {
    _classCallCheck(this, Rating);

    var _this = _possibleConstructorReturn(this, (Rating.__proto__ || Object.getPrototypeOf(Rating)).call(this, props));

    _this.state = {
      hoveredIndex: 0,
      checkedIndex: props.value
    };
    return _this;
  }

  _createClass(Rating, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ checkedIndex: nextProps.value });
    }
  }, {
    key: 'onCheck',
    value: function onCheck(i, e) {
      this.setState({ checkedIndex: i });
      if (this.props.onChange) this.props.onChange(i);
    }
  }, {
    key: 'onMouseEnter',
    value: function onMouseEnter(i, e) {
      this.setState({ hoveredIndex: i });
    }
  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave(i, e) {
      this.setState({ hoveredIndex: 0 });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          hoveredIndex = _state.hoveredIndex,
          checkedIndex = _state.checkedIndex;
      var _props = this.props,
          readOnly = _props.readOnly,
          _props$values = _props.values,
          values = _props$values === undefined ? defaultValues : _props$values;

      return _react2.default.createElement(
        'div',
        { style: {} },
        values.map(function (i) {
          var onClick = readOnly ? undefined : _this2.onCheck.bind(_this2, i),
              onMouseEnter = readOnly ? undefined : _this2.onMouseEnter.bind(_this2, i),
              onMouseLeave = readOnly ? undefined : _this2.onMouseLeave.bind(_this2, i),
              checked = i <= checkedIndex,
              hovered = i <= hoveredIndex;

          if (hoveredIndex > 0 && checkedIndex > 0 && i > hoveredIndex && i <= checkedIndex) {
            checked = false;
            hovered = true;
          }

          return _react2.default.createElement(Ch, {
            checked: checked,
            key: i,
            hovered: hovered,
            readOnly: readOnly,
            onClick: onClick,
            onMouseEnter: onMouseEnter,
            onMouseLeave: onMouseLeave
          });
        })
      );
    }
  }]);

  return Rating;
}(_react2.default.Component);

Rating.defaultProps = {
  onChange: function onChange(value) {
    return console.log('Rated with value ' + value + '! Add onChange prop to hook into this event');
  },
  value: 0,
  readOnly: false
};
exports.default = Rating;
