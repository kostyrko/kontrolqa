import React from 'react'
import './index.scss'

export const Tags = ({ tags, thumbnail }) => {
  const tagsArr = tags || []
  if (tagsArr) {
    return (
      <div className="tags">
        {tagsArr.map((tag, index) => {
          return (
            <span key={index} className={"tag" + (thumbnail ? ' thumbnail-tag' : '')}>
              {tag} 
            </span>
          )
        })}
      </div>
    )
  }
}