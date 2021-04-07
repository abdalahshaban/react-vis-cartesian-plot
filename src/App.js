import { useState } from 'react'
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  LineMarkSeries,
  MarkSeries,
  CustomSVGSeries,
  Hint,
  Highlight,
  PolygonSeries,
  FlexibleWidthXYPlot
} from 'react-vis'

function App () {
  let dataValue = [
    // {
    //   x: 1,
    //   y: 5,
    //   customComponent: 'star',
    //   size: 30 //   style: { stroke: 'red', fill: 'orange' }
    // },
    // { x: 2, y: 4 }
    // { x: 3, y: 10 }
  ]
  const [data, setdata] = useState(dataValue)

  const onValueClickHandle = e => {
    if (e === null) return
    let xcoord = e.clientX
    let ycoord = e.clientY
    let xgridcoord = (xcoord - 65) / 42.5
    let xgridcoordFloor = Math.floor(xgridcoord)
    let xgridcoordCeil = Math.ceil(xgridcoord)
    let xgridcoordFinal =
      Math.abs(xgridcoord - xgridcoordFloor) <=
      Math.abs(xgridcoord - xgridcoordCeil)
        ? xgridcoordFloor
        : xgridcoordCeil
    let ygridcoord = 10 - (ycoord - 5) / 48
    let ygridcoordFloor = Math.floor(ygridcoord)
    let ygridcoordCeil = Math.ceil(ygridcoord)
    let ygridcoordFinal =
      Math.abs(ygridcoord - ygridcoordFloor) <=
      Math.abs(ygridcoord - ygridcoordCeil)
        ? ygridcoordFloor
        : ygridcoordCeil

    let existingPoint = data.find(
      data => data.x === xgridcoordFinal && data.y === ygridcoordFinal
    )
    if (
      existingPoint === undefined &&
      xgridcoordFinal > -1 &&
      ygridcoordFinal > -1
    ) {
      setdata([...data, { x: xgridcoordFinal, y: ygridcoordFinal }])
    }
  }
  return (
    <div className='plot_div'>
      <FlexibleWidthXYPlot
        dontCheckIfEmpty={true}
        onClick={e => onValueClickHandle(e)}
        width={500}
        height={500}
        yDomain={[0, 10]}
        xDomain={[0, 10]}
        style={{
          stroke: 'gray'
        }}
      >
        <HorizontalGridLines tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
        <VerticalGridLines tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
        <XAxis
          hideLine={false}
          hideTicks={false}
          //   tickTotal={1}
          title='X'
          style={{
            stroke: 'blue'
          }}
          // tickLabelAngle={1}
        />
        <YAxis
          title='Y'
          style={{
            stroke: 'green'
          }}
        />

        <LineSeries
          animation={true}
          // curve={'curveMonotoneX'}
          strokeStyle='solid'
          data={data}
          style={{
            stroke: 'red',
            fill: 'transparent',
            strokeWidth: '2px'
          }}
        />
        <MarkSeries data={data} opacity={1} fill='brown' />
      </FlexibleWidthXYPlot>
    </div>
  )
}

export default App
