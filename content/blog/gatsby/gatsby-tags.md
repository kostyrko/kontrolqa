---
title: 🎩 Gatsby dodanie tagów
date: 2022-03-05 22:02:71
category: gatsby
thumbnail: { thumbnailSrc }
draft: false
tags: ["Gatsby", "blog", "tags"]
---

Zapis w metadanych w postaci tablicy przechowującej łańcuchy znaków

```js
title: Gatsby dodanie tagów
date: 2022-03-05 22:02:71
category: gatsby
thumbnail: { thumbnailSrc }
draft: true
tags: ["Gatsby", "blog", "tags"]
```

`gatsby-node.js`

```js
return graphql(
`
    {
    allMarkdownRemark(
        filter: { frontmatter: { category: { ne: null }, draft: { eq: false } } }
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
    ) {
        edges {
        node {
            fields {
            slug
            }
            frontmatter {
            title
            category
            tags <====
            }
        }
```

---
GraphQL query
```js
query MyQuery {
  allMarkdownRemark {
    group(field: frontmatter___tags) {
      fieldValue
      totalCount
    }
  }
}
```

Zwrot 

```js
{
  "data": {
    "allMarkdownRemark": {
      "group": [
        {
          "fieldValue": "Gatsby",
          "totalCount": 1
        },
        {
          "fieldValue": "blog",
          "totalCount": 1
        },
        {
          "fieldValue": "tags",
          "totalCount": 1
        }
      ]
    }
  }
}
```
---

dodanie wartości do zapytania GraphQL

`templates/blog-post.js`

```js
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
        comment {
          disqusShortName
          utterances
        }
        sponsor {
          buyMeACoffeeId
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 280)
      html
      frontmatter {
        title
        date(formatString: " DD/MM/YYYY")
        tags <====
      }
    }
  }
`
```

oraz do renderowanie
```js
import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
//[...]
import { Tags } from '../components/tags'


export default ({ data, pageContext, location }) => 

  //[...]
  const post = data.markdownRemark
  const { title: postTitle, date, tags } = post.frontmatter

  return (
    <Layout location={location} title={title}>
      <Head title={postTitle} description={post.excerpt} />
      <PostTitle title={postTitle} />
      <PostDate date={date} />
      <PostContainer html={post.html} />
      <Tags tags={tags}/>
      //[..]
```
---
docelowo tu pojawią się tagi w formie linków `<a>` odprowadzających do stron z tagami

`tags/index.jsx`
```js
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
```

---
Źródła: 

[How to add Tags to your Gatsby Blog](https://fek.io/blog/how-to-add-tags-to-your-gatsby-blog)

[]()