import type { APIContext } from 'astro'
import { loadRenderers } from 'astro:container'
import { render } from 'astro:content'
import { getContainerRenderer } from '@astrojs/mdx'
import rss from '@astrojs/rss'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import sanitizeHtml from 'sanitize-html'
import config from 'virtual:config'

import { getBlogCollection, sortMDByDate } from 'astro-pure/server'

const GET = async (context: APIContext) => {
  const renderers = await loadRenderers([getContainerRenderer()])
  const container = await AstroContainer.create({ renderers })
  const allPostsByDate = sortMDByDate(await getBlogCollection())
  const siteUrl = context.site ?? new URL(import.meta.env.SITE)

  return rss({
    // Basic configs
    trailingSlash: false,
    xmlns: { h: 'http://www.w3.org/TR/html4/', atom: 'http://www.w3.org/2005/Atom' },
    stylesheet: '/scripts/pretty-feed-v3.xsl',

    // Contents
    title: config.title,
    description: config.description,
    site: import.meta.env.SITE,
    items: await Promise.all(
      allPostsByDate.map(async (post) => {
        const { title, description, publishDate, updatedDate, heroImage } = post.data
        const cover = typeof heroImage?.src === 'string' ? heroImage.src : heroImage?.src.src
        const link = new URL(`/blog/${post.id}`, siteUrl)
        const { Content } = await render(post)
        const html = await container.renderToString(Content, { request: new Request(link) })
        const content = sanitizeHtml(html, {
          allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img', 'details', 'summary'],
          transformTags: {
            a: (tagName, attrs) => ({
              tagName,
              attribs: { ...attrs, href: new URL(attrs.href || '', link).href }
            }),
            img: (tagName, attrs) => ({
              tagName,
              attribs: { ...attrs, src: new URL(attrs.src, link).href }
            })
          }
        })
        return {
          title,
          description,
          pubDate: publishDate,
          link: link.href,
          customData: [
            cover && `<h:img src="${new URL(cover, siteUrl).href.replaceAll('&', '&amp;')}" />`,
            updatedDate && `<atom:updated>${updatedDate.toISOString()}</atom:updated>`
          ]
            .filter(Boolean)
            .join(''),
          content
        }
      })
    )
  })
}

export { GET }
