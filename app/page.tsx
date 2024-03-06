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
