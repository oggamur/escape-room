export default function MetaScreen(): JSX.Element {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="description" content="Escape Room — квесты в Санкт-Петербурге" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link
        rel="manifest"
        href="../markup/favicon/site.webmanifest"
        crossOrigin="use-credentials"
      />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#141414" />
      <link rel="shortcut icon" href="favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#141414" />
      <meta name="theme-color" content="#141414" />
      <link rel="preload" href="fonts/raleway-800.woff2" as="font" crossOrigin="anonymous" />
      <link rel="preload" href="fonts/raleway-600.woff2" as="font" crossOrigin="anonymous" />
      <link rel="stylesheet" href="/markup/css/style.min.css" />
    </>
  );
}
