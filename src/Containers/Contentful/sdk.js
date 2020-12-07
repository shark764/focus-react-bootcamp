import * as contentful from 'contentful';
import { truncateString } from './utils';

export const BASE_URL = 'https://cdn.contentful.com';
export const ENVIRONMENT = 'master';
export const SPACE_ID = 'srlpekq85luo';
export const ACCESS_TOKEN = 'evMFF1eK--2PX6Qqrlq8glrKOurVH1pdvaI-FRgmufU';

export const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

export function dataTransformer(data) {
  return data.map(({ fields, sys }) => ({
    ...fields,
    id: sys.id,
    createdAt: sys.createdAt,
    description: fields.description ? truncateString(fields.description, 500) : null,
  }));
}

export function entryTransformer({ fields, sys }) {
  return {
    ...fields,
    id: sys.id,
    createdAt: sys.createdAt,
    description: fields.description ? truncateString(fields.description, 500) : null,
    image: fields.image
      ? {
        ...fields.image.fields,
        id: fields.image.sys.id,
      }
      : { file: {} },
    ...(fields.tracklist
      ? {
        tracklist: fields.tracklist.map((track) => ({
          ...track.fields,
          id: track.sys.id,
        })),
      }
      : {}),
    ...(fields.cast
      ? {
        cast: fields.cast.map((actor) => ({
          ...actor.fields,
          id: actor.sys.id,
        })),
      }
      : {}),
  };
}

export function coursesTransformer(courses) {
  return dataTransformer(courses).map((item) => ({
    ...item,
    image: item.image
      ? {
        ...item.image.fields,
        id: item.image.sys.id,
      }
      : { file: {} },
  }));
}

export function recordsTransformer(records) {
  return dataTransformer(records).map((item) => ({
    ...item,
    url: item.listenUrl,
    shortDescription: truncateString(item.description, 100),
    image: item.image
      ? {
        ...item.image.fields,
        id: item.image.sys.id,
      }
      : { file: {} },
    tracklist:
      item.tracklist && item.tracklist.map
        ? item.tracklist.map((track) => ({
          ...track.fields,
          id: track.sys.id,
        }))
        : [],
  }));
}

export function moviesTransformer(movies) {
  return dataTransformer(movies).map((item) => ({
    ...item,
    image: item.poster
      ? {
        ...item.poster.fields,
        id: item.poster.sys.id,
      }
      : { file: {} },
    cast:
      item.cast && item.cast.map
        ? item.cast.map((actor) => ({
          ...actor.fields,
          id: actor.sys.id,
        }))
        : [],
  }));
}

export async function getEntries(query) {
  try {
    const entries = await client.getEntries(query);
    switch (query.content_type) {
      case 'course':
        return coursesTransformer(entries.items);
      case 'records':
        return recordsTransformer(entries.items);
      case 'movies':
        return moviesTransformer(entries.items);
      default:
        return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getEntry(entryId) {
  try {
    const entry = await client.getEntry(entryId);
    return entryTransformer(entry);
  } catch (error) {
    console.error(error);
    return {};
  }
}
