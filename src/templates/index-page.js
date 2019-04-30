import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Features from '../components/Features'
import Videos from '../components/Videos'
import BlogRoll from '../components/BlogRoll'

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  videos,
  projects
}) => (
  <div>
    <div
      className='full-width-image margin-top-0'
      style={{
        backgroundImage: `url(${
          image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundColor: '#222629',
        backgroundPosition: `top center`,
        backgroundAttachment: `fixed`
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '100px',
          lineHeight: '1',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <h1
          className='has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen'
          style={{
            color: '#005571',
            backgroundColor: 'white',
            lineHeight: '1',
            padding: '0.25em'
          }}
        >
          {title}
        </h1>
        <h3
          className='is-size-6'
          style={{
            color: 'white',
            lineHeight: '1',
            padding: '0.25em'
          }}
        >
          {subheading}
        </h3>
      </div>
    </div>
    <section className='section section--gradient'>
      <div className='container'>
        <div className='section'>
          <div className='columns'>
            <div className='column is-10 is-offset-1'>
              <div className='content'>
                <div className='content'>
                  <div className='tile'>
                    <h1 className='title'>{mainpitch.title}</h1>
                  </div>
                  <div className='tile'>{mainpitch.description}</div>
                </div>
                <div className='columns' style={{ padding: '60px 0 0 0' }}>
                  <div className='column is-12'>
                    <h3 className='has-text-weight-semibold is-size-4'>
                      {heading}
                    </h3>
                    <p>{description}</p>
                  </div>
                </div>
                <div className='column is-12'>
                  <h3 className='has-text-weight-semibold is-size-2'>
                    Featured videos
                  </h3>
                </div>
                <Videos gridItems={videos} />
                <div className='column is-12'>
                  <h3 className='has-text-weight-semibold is-size-2'>
                    Featured Projects
                  </h3>
                </div>
                <Features gridItems={projects.blurbs} />
                <div className='columns'>
                  <div className='column is-12 has-text-centered'>
                    <Link className='btn' to='/projects'>
                      See all projects
                    </Link>
                  </div>
                </div>
                <div className='column is-12'>
                  <h3 className='has-text-weight-semibold is-size-2'>
                    Latest stories
                  </h3>
                  <BlogRoll />
                  <div className='column is-12 has-text-centered'>
                    <Link className='btn' to='/blog'>
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array
  }),
  projects: PropTypes.shape({
    blurbs: PropTypes.array
  }),
  videos: PropTypes.array
}

const IndexPage = ({ data }) => {
  const indexFrontMatter = data.index.frontmatter
  const projectsFrontMatter = data.projects.frontmatter

  const videos = data.allYoutubeVideo.edges
    .map(e => e.node)
    .map(n => {
      return {
        videoId: n.videoId,
        title: n.title,
        image: n.localThumbnail
      }
    })
  return (
    <Layout>
      <IndexPageTemplate
        image={indexFrontMatter.image}
        title={indexFrontMatter.title}
        heading={indexFrontMatter.heading}
        subheading={indexFrontMatter.subheading}
        mainpitch={indexFrontMatter.mainpitch}
        description={indexFrontMatter.description}
        intro={indexFrontMatter.intro}
        projects={projectsFrontMatter.intro}
        videos={videos}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    index: PropTypes.shape({
      frontmatter: PropTypes.object
    }),
    projects: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    index: markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
    projects: markdownRemark(
      frontmatter: { templateKey: { eq: "project-page" } }
    ) {
      frontmatter {
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
        }
      }
    }
    allYoutubeVideo(limit: 4) {
      edges {
        node {
          id
          title
          description
          videoId
          publishedAt
          privacyStatus
          localThumbnail {
            childImageSharp {
              fluid(maxWidth: 240, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
