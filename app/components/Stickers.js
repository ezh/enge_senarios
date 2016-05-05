import React, { Compontent, PropTypes } from 'react'

export const STICKERS = [
  [ "starred", "glyphicon-star" ],
  [ "done", "glyphicon-ok" ],
  [ "ignore", "glyphicon-remove" ]
]

const Stickers = (props) => {
  return (
    <div className="btn-group" role="group">
    {STICKERS.map((sticker, index) => <button className="btn btn-default" key={index}><span className={"glyphicon " + sticker[1] } />{sticker[[0]]}</button>)}
    </div>
  )
}

export default Stickers
