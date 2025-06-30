import React from 'react';

import cn from 'classnames';

import styles from './index.module.css';

// import { CardsPageItem } from '..';

export const CardItem: React.FC<{
  card: {
    title: string;
    description: string;
    buttonTitle: string;
    listItems: string[]; // TO DO
  }; // CardsPageItem; // TO DO
  onSelect: () => void;
  selected: boolean;
}> = ({ card, onSelect, selected }) => {
  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>{card.title}</h3>
      {card.description ? <p className={styles.description}>{card.description}</p> : null}
      {card.listItems ? (
        <ul className={styles.list}>
          {card.listItems?.map((item, index) => (
            <li className={styles.listItem} key={item + index}>
              {item}
            </li>
          ))}
        </ul>
      ) : null}
      <button
        className={cn(styles.button, { [styles.selected]: selected })}
        type="button"
        onClick={onSelect}>
        {card.buttonTitle}
      </button>
    </div>
  );
};
