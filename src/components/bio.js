/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="https://avatars.githubusercontent.com/u/22021261?s=400&u=c90b81355c09fac579644fc36aa6975f430c7cdd&v=4"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
      {author?.name && (
        <p>
          Hi there, 👋 I'm <strong>{author.name}</strong> {author?.summary || null}
          {` `}
          <p>
            Find me on:<br/>
            <a href="https://www.linkedin.com/in/abdularis">LinkedIn</a><br/>
            <a href="https://github.com/abdularis">Github</a>
          </p>
        </p>
      )}
    </div>
  )
}

export default Bio
