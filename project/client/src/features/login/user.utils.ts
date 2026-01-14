import type { Revalidate } from 'next/dist/server/lib/cache-control';
import type { z } from 'zod';

export function convertHeaders(headers?: Headers) {
  return headers ? Object.fromEntries(headers.entries()) : {};
}

export async function fetchAndValidate<T extends z.ZodType>({
  url,
  options: {
    schema,
    tags = [] as string[],
    withCredentials = true,
    cache = 'force-cache',
    headers,
    revalidate = false, // dont set a revalidation timer by default
  },
}: {
  url: string
  options: {
    schema: T
    tags?: string[]
    withCredentials?: boolean

    // cacheable requests options
    cache?: RequestCache
    headers?: Headers
    revalidate?: Revalidate
  }
}): Promise<z.infer<T> | null> {
  // convert headers
  const initHeaders = {
    ...(headers ? convertHeaders(headers) : {}),
    'Content-Type': 'application/json',
  };

  // try to fetch
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: initHeaders,
      credentials: withCredentials ? 'include' : 'omit',
      cache,
      next: {
        tags,
        revalidate,
      },
    });

    if (response.status === 204)
      return null;

    const payload = await response.json();
    // no data from server
    if (payload.data === null)
      return null;

    // there is data, validate it
    const result = schema.safeParse(payload.data);

    return result.data;
  }
  catch (err) {
    console.log(err);
    return null;
  }
}
