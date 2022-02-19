import { graphql } from 'gatsby'
import _ from 'lodash'
import React, { useMemo, useRef, useEffect, useState } from 'react'
import { Bio } from '../components/bio'
import { Category } from '../components/category'
import { Contents } from '../components/contents'
import { Head } from '../components/head'
import { HOME_TITLE } from '../constants'
import { useCategory } from '../hooks/useCategory'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useRenderedCount } from '../hooks/useRenderedCount'
import { useScrollEvent } from '../hooks/useScrollEvent'
import { Layout } from '../layout'
import * as Dom from '../utils/dom'
import * as EventManager from '../utils/event-manager'
import { Search } from '../components/search'
import { useFlexSearch } from 'react-use-flexsearch';

const BASE_LINE = 80

function getDistance(currentPos) {
  return Dom.getDocumentHeight() - currentPos
}


function unFlattenResults (results) {
  return results.map(post => {
    const { slug, excerpt, title, category, date, draft } = post;
    return { node :  {excerpt: excerpt, frontmatter: { title, category, date, draft }, fields : { slug }} };
})};

export default ({ data , location }) => {

  const { siteMetadata } = data.site
  const { countOfInitialPost } = siteMetadata.configs

  const { search } = window.location;
  const query = new URLSearchParams(search).get('s')
  const [searchQuery, setSearchQuery] = useState(query || '');
  console.log('indexData', data)
  const results = useFlexSearch(searchQuery, data.localSearchPages.index, data.localSearchPages.store);

  console.log('results', results);
  const posts = searchQuery ? unFlattenResults(results) : data.allMarkdownRemark.edges;


  
  
  const categories = useMemo(
    () => _.uniq(posts.map(({ node }) => node.frontmatter.category)),
    []
    )
  const bioRef = useRef(null)
  const [DEST, setDEST] = useState(316)
  const [count, countRef, increaseCount] = useRenderedCount()
  const [category, selectCategory] = useCategory(DEST)





  useEffect( tabRef => {
    setDEST(!bioRef.current ? 316 : bioRef.current.getBoundingClientRect().bottom + window.pageYOffset + 24 )
  }, [bioRef.current])

  useIntersectionObserver()
  useScrollEvent(() => {
    const currentPos = window.scrollY + window.innerHeight
    const isTriggerPos = () => getDistance(currentPos) < BASE_LINE
    const doesNeedMore = () =>
      posts.length > countRef.current * countOfInitialPost

    return EventManager.toFit(increaseCount, {
      dismissCondition: () => !isTriggerPos(),
      triggerCondition: () => isTriggerPos() && doesNeedMore(),
    })()
  })

  return (
    <Layout location={location} title={siteMetadata.title}>
      <Head title={HOME_TITLE} keywords={siteMetadata.keywords} />
      <Bio ref={bioRef} />
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Category
        categories={categories}
        category={category}
        selectCategory={selectCategory}
      />
      <Contents
        posts={posts}
        countOfInitialPost={countOfInitialPost}
        count={count}
        category={category}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    localSearchPages {
      index
      store
    }
    site {
      siteMetadata {
        title
        configs {
          countOfInitialPost
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { ne: null }, draft: { eq: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 200, truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            category
            draft
          }
        }
      }
    }
  }
`
