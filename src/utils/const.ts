import { ISortItem } from '../interface/interface';

const CATEGORIES: Array<string> = ['Все', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const SORT_ITEMS: ISortItem[] = [
  { name: 'популярности (DESC)', sortProperty: 'rating' },
  { name: 'популярности (ASK)', sortProperty: '-rating' },
  { name: 'цене (DESK)', sortProperty: 'price' },
  { name: 'цене (ASK)', sortProperty: '-price' },
  { name: 'алфавиту', sortProperty: 'name' },
];

const DEFAULT_LANGUAGER = 'en';

export { CATEGORIES, SORT_ITEMS, DEFAULT_LANGUAGER };
