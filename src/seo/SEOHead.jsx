import { useEffect } from 'react';
import { SEO_CONFIG } from './seoConfig.js';
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getWebSiteSchema,
} from './schemaData.js';

/**
 * Universal SEO Head Component
 * Dynamically updates document head, canonicals, Open Graph, Twitter Cards, and JSON-LD structured data.
 */
export default function SEOHead({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage,
  keywords,
  noIndex = false,
  schemas = [],
}) {
  // Prevent duplicate branding if title already includes "Penta Prizm"
  const fullTitle = !title
    ? SEO_CONFIG.defaultTitle
    : title.toLowerCase().includes('penta prizm')
    ? title
    : `${title} | ${SEO_CONFIG.siteName}`;

  const metaDescription = description || SEO_CONFIG.defaultDescription;
  const pageKeywords = keywords || SEO_CONFIG.defaultKeywords;
  const pageCanonical = canonicalUrl
    ? `${SEO_CONFIG.siteUrl}${canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`}`
    : SEO_CONFIG.siteUrl;
  const pageImage = ogImage
    ? ogImage.startsWith('http')
      ? ogImage
      : `${SEO_CONFIG.siteUrl}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`
    : SEO_CONFIG.defaultImage;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // Helper to set or create meta tag
    const setMetaTag = (attribute, value, content) => {
      let element = document.querySelector(`meta[${attribute}="${value}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to set or create link tag
    const setLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Primary Meta Tags
    setMetaTag('name', 'description', metaDescription);
    if (pageKeywords) {
      setMetaTag('name', 'keywords', pageKeywords);
    }
    setMetaTag(
      'name',
      'robots',
      noIndex
        ? 'noindex, nofollow'
        : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    );

    // 3. Canonical Link
    setLinkTag('canonical', pageCanonical);

    // 4. Open Graph Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', metaDescription);
    setMetaTag('property', 'og:url', pageCanonical);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', pageImage);
    setMetaTag('property', 'og:site_name', SEO_CONFIG.siteName);
    setMetaTag('property', 'og:locale', SEO_CONFIG.locale);

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', metaDescription);
    setMetaTag('name', 'twitter:image', pageImage);

    // 6. Verification Tags if provided
    if (SEO_CONFIG.verification.googleSiteVerification) {
      setMetaTag(
        'name',
        'google-site-verification',
        SEO_CONFIG.verification.googleSiteVerification
      );
    }
    if (SEO_CONFIG.verification.bingSiteVerification) {
      setMetaTag(
        'name',
        'msvalidate.01',
        SEO_CONFIG.verification.bingSiteVerification
      );
    }

    // 7. Inject Structured Data (JSON-LD)
    // Clear previously injected dynamic JSON-LD scripts
    document
      .querySelectorAll('script[data-penta-schema="dynamic"]')
      .forEach((el) => el.remove());

    // Filter out schemas that might already be statically present unless overriding
    const dynamicSchemas = schemas.filter(Boolean);

    dynamicSchemas.forEach((schemaObj, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-penta-schema', 'dynamic');
      script.setAttribute('data-schema-index', String(index));
      script.textContent = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    });

    // Cleanup on unmount / change
    return () => {
      document
        .querySelectorAll('script[data-penta-schema="dynamic"]')
        .forEach((el) => el.remove());
    };
  }, [
    fullTitle,
    metaDescription,
    pageCanonical,
    pageImage,
    ogType,
    keywords,
    noIndex,
    JSON.stringify(schemas),
  ]);

  return null;
}
