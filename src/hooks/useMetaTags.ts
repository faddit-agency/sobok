import { useEffect } from 'react'

interface MetaTagsConfig {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
}

export function useMetaTags(config: MetaTagsConfig) {
  useEffect(() => {
    const baseUrl = 'https://sobok.kr'
    
    // Update title
    if (config.title) {
      document.title = config.title
      updateMetaTag('property', 'og:title', config.title)
      updateMetaTag('name', 'twitter:title', config.title)
    }
    
    // Update description
    if (config.description) {
      updateMetaTag('name', 'description', config.description)
      updateMetaTag('property', 'og:description', config.description)
      updateMetaTag('name', 'twitter:description', config.description)
    }
    
    // Update image
    if (config.image) {
      const imageUrl = config.image.startsWith('http') 
        ? config.image 
        : `${baseUrl}${config.image}`
      updateMetaTag('property', 'og:image', imageUrl)
      updateMetaTag('name', 'twitter:image', imageUrl)
    }
    
    // Update URL
    if (config.url) {
      const fullUrl = config.url.startsWith('http') 
        ? config.url 
        : `${baseUrl}${config.url}`
      updateMetaTag('property', 'og:url', fullUrl)
      updateMetaTag('rel', 'canonical', fullUrl)
    }
    
    // Update type
    if (config.type) {
      updateMetaTag('property', 'og:type', config.type)
    }
  }, [config])
}

function updateMetaTag(attribute: string, selector: string, content: string) {
  // Update or create meta tag
  let meta = document.querySelector(`meta[${attribute}="${selector}"]`) as HTMLMetaElement
  
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attribute, selector)
    document.head.appendChild(meta)
  }
  
  meta.setAttribute('content', content)
  
  // Handle canonical link separately
  if (attribute === 'rel' && selector === 'canonical') {
    let link = document.querySelector(`link[rel="canonical"]`) as HTMLLinkElement
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', content)
  }
}

