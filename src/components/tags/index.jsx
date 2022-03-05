import React from 'react'
import './index.scss'

export const Tags = ({ tags }) => {
  const tagsArr = tags || []
  if (tagsArr) {
    return (
      <div className="tags">
        {tagsArr.map((tag, index) => {
          return (
            <span key={index} className="tag">
              {tag}
            </span>
          )
        })}
      </div>
    )
  }
}