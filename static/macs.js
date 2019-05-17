'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactTable = window.ReactTable.default;

var MovingAverageCrossoverTable = function (_React$Component) {
	_inherits(MovingAverageCrossoverTable, _React$Component);

	function MovingAverageCrossoverTable(props) {
		_classCallCheck(this, MovingAverageCrossoverTable);

		var _this = _possibleConstructorReturn(this, (MovingAverageCrossoverTable.__proto__ || Object.getPrototypeOf(MovingAverageCrossoverTable)).call(this, props));

		_this.state = { data: [] };
		return _this;
	}

	_createClass(MovingAverageCrossoverTable, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			axios.get('/msa').then(function (response) {
				_this2.setState({
					data: response.data
				});
			}).catch(function (error) {
				// handle error
				console.log(error);
			}).finally(function () {
				// always executed
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var columns = [{
				Header: 'Date',
				accessor: 'Date', // String-based value accessors!
				Cell: function Cell(props) {
					return React.createElement(
						'div',
						{ style: { textAlign: 'center' } },
						React.createElement(
							'span',
							null,
							props.value
						)
					);
				}
			}, {
				Header: 'Close Price',
				accessor: 'Close Price', // String-based value accessors!
				Cell: function Cell(props) {
					return React.createElement(
						'div',
						{ style: { textAlign: 'center' } },
						React.createElement(
							'span',
							{ className: 'number' },
							props.value
						)
					);
				}
			}, {
				Header: 'Buy',
				accessor: 'Buy',
				width: 200,
				Cell: function Cell(props) {
					return React.createElement(
						'div',
						{ style: {
								//width: `${props.value}%`,
								height: '100%',
								backgroundColor: props.value > 0 ? '#85cc00' : '#FFFFFF',
								borderRadius: '2px',
								textAlign: 'center'
							}
						},
						React.createElement(
							'span',
							{ className: 'number' },
							props.value
						)
					);
				} // Custom cell components!
			}, {
				Header: 'Sell',
				accessor: 'Sell',
				width: 200,
				Cell: function Cell(props) {
					return React.createElement(
						'div',
						{ style: {
								// width: `${props.value}%`,
								height: '100%',
								backgroundColor: props.value < 0 ? '#ff2e00' : '#ffffff',
								borderRadius: '2px',
								textAlign: 'center'
							}
						},
						React.createElement(
							'span',
							{ className: 'number' },
							props.value
						)
					);
				} // Custom cell components!
			}];

			return React.createElement(ReactTable, { data: this.state.data, columns: columns,
				defaultPageSize: 10 });
		}
	}]);

	return MovingAverageCrossoverTable;
}(React.Component);

var domContainer = document.querySelector('#macs');

ReactDOM.render(React.createElement(MovingAverageCrossoverTable, null), domContainer);