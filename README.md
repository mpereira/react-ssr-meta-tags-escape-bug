# react-ssr-meta-tags-escape-bug

This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
with the intention of demonstrating a potential bug with the React server-side
rendering of URLs in Open Graph metatags.

Since Next.js 13 it is possible to add Open Graph metadata via the [`generateMetadata`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) function in a `page.tsx` file. In this project, `app/page.tsx` looks like the following:

```typescript
const BASE_URL = "https://webhook.site/a4b648dd-64ad-481b-ac6e-3893ca157b1b";

export async function generateMetadata() {
  const ogImage = `${BASE_URL}?foo=1&bar=2`;

  return {
    openGraph: {
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      images: [ogImage],
    },
  };
}

export default function Home() {
  return (
    <main>
      <h1>react-ssr-meta-tags-escape-bug</h1>
    </main>
  );
}
```

Starting a development server with `npm run dev` and accessing `view-source:http://localhost:3000` will show the following Open Graph tags:

```html
<meta
  property="og:image"
  content="https://webhook.site/a4b648dd-64ad-481b-ac6e-3893ca157b1b?foo=1&amp;bar=2"
/>
<meta
  name="twitter:image"
  content="https://webhook.site/a4b648dd-64ad-481b-ac6e-3893ca157b1b?foo=1&amp;bar=2"
/>
```

The query string separator (`?`) is correctly not escaped in the resulting string, while the query string parameter separator (`&`) is incorrectly escaped to `&amp;`.

This results in a URL that won't behave as expected.
