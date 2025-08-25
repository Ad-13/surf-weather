import { type JSX, type ElementType } from 'react';

import Spinner from '@ui/Spinner';

import { type TObjectWithItemProp } from './types';

import styles from './List.module.scss';

type ListProps<T> = {
  items: T[] | null;
  pending: boolean;
  RenderItem: ElementType<TObjectWithItemProp<T>>;
  containerTag?: string;
  itemTag?: string;
  keyField?: keyof T;
  variant?: 'grid' | 'list';
};

const List = <T extends object>({
  items,
  containerTag = 'ul',
  itemTag = 'li',
  variant = 'grid',
  pending,
  RenderItem,
  keyField,
}: ListProps<T>) => {

  const Container = containerTag as keyof JSX.IntrinsicElements;
  const Item = itemTag as keyof JSX.IntrinsicElements;

  if (pending) return <Spinner width={25} />;

  return (
    <>
      {items?.length ? (
        <Container className={styles[variant]}>
          {items.map((item, i) => (
            <Item key={keyField ? (item[keyField] as string) : i} className={styles.item}>
              <RenderItem item={item} />
            </Item>
          ))}
        </Container>
      ) : (
        'No items found'
      )}
    </>
  );
};

export default List;
