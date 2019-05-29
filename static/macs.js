'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactTable = window.ReactTable.default;

var DateComponent = function (_React$Component) {
	_inherits(DateComponent, _React$Component);

	function DateComponent(props) {
		_classCallCheck(this, DateComponent);

		var _this = _possibleConstructorReturn(this, (DateComponent.__proto__ || Object.getPrototypeOf(DateComponent)).call(this, props));

		_this.state = { datelist: [] };
		_this.onDateSelection = _this.onDateSelection.bind(_this);

		return _this;
	}

	_createClass(DateComponent, [{
		key: 'onDateSelection',
		value: function onDateSelection(e) {
			this.props.onDateSelection(e);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			//bulmaCalendar.attach('[id="my-element"]', options);

			axios.get('/smadates').then(function (response) {
				_this2.setState({
					datelist: response.data
				});
				_this2.calendars = bulmaCalendar.attach('[type="date"]', { 'type': 'date',
					'showHeader': 'false',
					'dateFormat': 'YYYY-MM-DD',
					// 'enableYearSwitch': false,
					'minDate': _this2.state.datelist[0],
					'disabledWeekDays': [0, 6] });

				// Loop on each calendar initialized
				for (var i = 0; i < _this2.calendars.length; i++) {
					// Add listener to date:selected event
					_this2.calendars[i].on('select', function (date) {
						_this2.onDateSelection(date.data.element.value);
					});
				}
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

			return React.createElement('input', { type: 'date', id: 'my-element', onChange: this.onDateSelection });
		}
	}]);

	return DateComponent;
}(React.Component);

var MovingAverageCrossoverTable = function (_React$Component2) {
	_inherits(MovingAverageCrossoverTable, _React$Component2);

	function MovingAverageCrossoverTable(props) {
		_classCallCheck(this, MovingAverageCrossoverTable);

		var _this3 = _possibleConstructorReturn(this, (MovingAverageCrossoverTable.__proto__ || Object.getPrototypeOf(MovingAverageCrossoverTable)).call(this, props));

		_this3.handleDateChange = _this3.handleDateChange.bind(_this3);
		_this3.state = { data: [] };
		return _this3;
	}

	_createClass(MovingAverageCrossoverTable, [{
		key: 'handleDateChange',
		value: function handleDateChange(e) {
			var _this4 = this;

			axios.get('/tsbyd2?red=' + e).then(function (response) {
				_this4.setState({
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
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this5 = this;

			axios.get('/msa').then(function (response) {
				_this5.setState({
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
				accessor: 'date_of_trade', // String-based value accessors!
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
				Header: 'Security Code',
				accessor: 'sc_code', // String-based value accessors!
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
				accessor: 'close_price', // String-based value accessors!
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
				accessor: 'buy',
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
				accessor: 'sell',
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

			return React.createElement(
				'div',
				null,
				React.createElement(DateComponent, {
					onDateSelection: this.handleDateChange }),
				React.createElement(ReactTable, {
					data: this.state.data,
					columns: columns,
					defaultPageSize: 10 })
			);
		}
	}]);

	return MovingAverageCrossoverTable;
}(React.Component);

var domContainer = document.querySelector('#macs');

ReactDOM.render(React.createElement(MovingAverageCrossoverTable, null), domContainer);