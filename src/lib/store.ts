import { proxy } from 'valtio';

type State = {
  intro: boolean;
  colors: string[];
  decals: string[];
  color: string;
  decal: string;
};

const state = proxy<State>({
  intro: true,
  colors: ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
  decals: ['nike1', 'adidas1', 'pmndrs'],
  color: '#353934',
  decal: 'nike1',
});

export { state };
