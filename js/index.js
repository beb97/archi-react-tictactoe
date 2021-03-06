'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Stateless functionnal component
function Square(props) {
  return React.createElement(
    'button',
    { className: 'square', onClick: function onClick() {
        return props.onClick();
      } },
    props.value
  );
}

var Board = function (_React$Component) {
  _inherits(Board, _React$Component);

  function Board() {
    _classCallCheck(this, Board);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
    return _this;
  }

  Board.prototype.renderSquare = function renderSquare(i) {
    var _this2 = this;

    return React.createElement(Square, { value: this.state.squares[i], onClick: function onClick() {
        return _this2.handleClick(i);
      } });
  };

  Board.prototype.handleClick = function handleClick(i) {
    var squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  };

  Board.prototype.render = function render() {
    var winner = calculateWinner(this.state.squares);
    var status = undefined;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next turn: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'status' },
        status
      ),
      React.createElement(
        'div',
        { className: 'board-row' },
        this.renderSquare(0),
        this.renderSquare(1),
        this.renderSquare(2)
      ),
      React.createElement(
        'div',
        { className: 'board-row' },
        this.renderSquare(3),
        this.renderSquare(4),
        this.renderSquare(5)
      ),
      React.createElement(
        'div',
        { className: 'board-row' },
        this.renderSquare(6),
        this.renderSquare(7),
        this.renderSquare(8)
      )
    );
  };

  return Board;
}(React.Component);

var Game = function (_React$Component2) {
  _inherits(Game, _React$Component2);

  function Game() {
    _classCallCheck(this, Game);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Game.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'game' },
      React.createElement(
        'div',
        { className: 'game-board' },
        React.createElement(Board, null)
      ),
      React.createElement(
        'div',
        { className: 'game-info' },
        React.createElement('div', null),
        React.createElement('ol', null)
      )
    );
  };

  return Game;
}(React.Component);

// ========================================

ReactDOM.render(React.createElement(Game, null), document.getElementById('container'));

function calculateWinner(squares) {
  var lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (var i = 0; i < lines.length; i++) {
    var _lines$i = lines[i];
    var a = _lines$i[0];
    var b = _lines$i[1];
    var c = _lines$i[2];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}