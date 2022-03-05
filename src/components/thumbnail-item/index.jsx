import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'
import { Tags } from '../tags'

import './index.scss'

export const ThumbnailItem = ({ node }) =>
  <Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug}>
    <div key={node.fields.slug}>
      <h3 className="thumbnail-title">{node.frontmatter.title || node.fields.slug}</h3>
      <Tags tags={node.frontmatter.tags} thumbnail= {true} />
      <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
    </div>
  </Link>

