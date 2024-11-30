import { selector, selectorFamily } from 'recoil';
import { postState } from '@/stores/atoms/postAtom';

export const activePostsSelector = selector({
  key: 'activePostsSelector',
  get: ({ get }) => {
    const posts = get(postState);
    return posts.filter(post => post.status === 'active');
  },
});

export const postByIdSelector = selectorFamily({
  key: 'postByIdSelector',
  get: (id: number) => ({ get }) => {
    const posts = get(postState);
    return posts.find(post => post.id === id) || null;
  },
});
