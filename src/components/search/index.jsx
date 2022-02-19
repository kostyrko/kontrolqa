import React from 'react'
import './index.scss'

export const Search = ({ searchQuery, setSearchQuery }) => {
  return (
    <form action="/" method="get" autoComplete="off" className="search-form">
      <label htmlFor="header-search">
        <span className="visually-hidden">Search blog posts</span>
      </label>
      <input
        value={searchQuery}
        onInput={e => setSearchQuery(e.target.value)}
        type="text"
        id="header-search"
        className="search-form__input"
        placeholder="Search blog posts"
        name="s"
      />
    </form>
  )
}
