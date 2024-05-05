const blessed = require('blessed')
const contrib = require('blessed-contrib')
const screen = blessed.screen()


const creatEmptyList = (length, val) => Array.from({
  length
}, _ => val)

const getEmptyCoordinates = () => ({
  x: creatEmptyList(10, ' '),
  y: creatEmptyList(10, 1),
})
class Ui {
  line = contrib.line({
    label: 'Response Time (MS)',
    showLegend: true,
    xLabelPadding: 3,
    xPadding: 5,
    style: {
      line: 'yellow',
      text: 'green',
      baseline: 'black',
    },
    xOffset: 0,
  })
  getRequest = {
    ...getEmptyCoordinates(),
    title: 'GET /people',
    style: {
      line: 'yellow',
    }
  }
  
  postRequest = {
    ...getEmptyCoordinates(),
    title: 'POST /people',
    style: {
      line: 'green'
    }
  }

  constructor() {
    this.screen = screen
    this.screen.append(this.line)
    this.renderGraph()
  }

  renderGraph() {
    this.line.setData([
      this.getRequest,
      this.postRequest,
    ])

    this.screen.render()
  }
  updateGraph(method, value) {
    const target = method  === "GET" ?
      this.getRequest :
      this.postRequest

    target.y.shift()
    target.y.push(value)

    this.renderGraph()
  }
}


module.exports = Ui