import { Injectable } from '@nestjs/common';
import { MeiliSearch, SearchResponse } from 'meilisearch';

@Injectable()
export class AppService {
  private client = new MeiliSearch({
    host: 'http://127.0.0.1:7700',
    apiKey: 'Dw27p9TYm3PbZQ7jraB3owk6ys2HHKZbJiT54oxmEdA',
  });

  getHello(): string {
    return 'Hello World!';
  }

  async addDocument(): Promise<string> {
    const index = this.client.index('movie');
    const movieJSON = (await import('../movies.json')) as unknown as MovieData;

    const res = await index.addDocuments(movieJSON);
    console.log(res);
    /* 응답
    EnqueuedTask {
      taskUid: 0,
      indexUid: 'movie',
      status: 'enqueued',
      type: 'documentAdditionOrUpdate',
      enqueuedAt: 2024-05-15T08:10:58.319Z
    }
  */

    return 'done';
  }

  async search(searchText: string): Promise<SearchResponse> {
    const index = this.client.index('movie');
    const result = await index.search(searchText);
    // 응답 예시
    // {
    //   hits: [
    //     {
    //       id: 268,
    //       title: 'Batman',
    //       overview:
    //         'Batman must face his most ruthless nemesis when a deformed madman calling himself "The Joker" seizes control of Gotham\'s criminal underworld.',
    //       genres: ['Fantasy', 'Action'],
    //       poster:
    //         'https://image.tmdb.org/t/p/w500/hztwplhxe2X9sq24CIcvkUy2DHZ.jpg',
    //       release_date: 614563200,
    //     },
    //     ...생략
    //   ],
    //   query: 'batman',
    //   processingTimeMs: 1,
    //   limit: 20,
    //   offset: 0,
    //   estimatedTotalHits: 68,
    // };

    return result;
  }
}

type Movie = {
  id: number;
  title: string;
  overview: string;
  genres: string[];
  poster: string;
  release_date: number;
};

type MovieData = Array<Movie>;
