/* eslint-disable */
import config from "@/config";

interface SearchResult {
  title: string;
  content: string;
  items: Array<{
    title: string;
    url: string;
    excerpt: string;
  }>;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const {
    queryKeyword,
    limitKeyword,
    excerptLengthKeyword,
    defaultMaxResults,
    defaultExcerptLength,
    defaultLanguage,
    minQueryLength,
  } = config.search;

  if (url.searchParams.get(queryKeyword) === null) {
    return Response.json(
      { error: "No search query provided" },
      { status: 200 }
    );
  }
  const script_src = `${url.origin}/docs`;

  if (typeof global.window === "undefined") {
    global.window = {
      location: {
        href: script_src,
        protocol: url.protocol,
        host: url.host,
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
      },
    } as any;
  }

  if (typeof global.document === "undefined") {
    global.document = {
      querySelector: () => ({
        getAttribute: () => defaultLanguage,
      }),
    } as any;
  }

  const query = url.searchParams.get(queryKeyword) || "";

  if (query.length < minQueryLength) {
    return Response.json({ error: "Search query too short" }, { status: 200 });
  }

  const limit = url.searchParams.get(limitKeyword) || defaultMaxResults;
  const excerptLength =
    url.searchParams.get(excerptLengthKeyword) || defaultExcerptLength;

  try {
    const pageFind = await import(
      /* webpackIgnore: true */ "../../../../public/_pagefind/pagefind"
    );

    await pageFind.options({
      basePath: `${url.origin}/_pagefind/`,
      excerptLength: parseInt(excerptLength.toString(), 10),
    });
    await pageFind.init();

    const search = await pageFind.search(query);
    const results = await Promise.all(
      search.results
        .slice(0, limit)
        .map((r: { data: () => unknown }) => r.data())
    );

    delete (global as any).document;
    delete (global as any).window;

    const formattedResults: SearchResult[] = results.map((result: any) => {
      return {
        title: result.meta.title,
        content: result.content,
        items: result.sub_results.map((item: any) => ({
          title: item.title,
          url: item.url.replace(/\.html(?=#|$)/, ""),
          excerpt: item.excerpt,
        })),
      };
    });

    return Response.json(formattedResults);
  } catch (error) {
    console.error("Search error:", error);
    return Response.json({ error: "Search failed" }, { status: 500 });
  }
}
