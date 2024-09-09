import { Article } from './models/article/article';

describe('Article', () => {
  it('should create an instance', () => {
    expect(new Article()).toBeTruthy();
  });
});