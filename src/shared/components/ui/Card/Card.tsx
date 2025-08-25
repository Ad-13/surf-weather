import type { ReactNode } from "react";
import cl from "classnames";

import styles from "./Card.module.scss";

interface IProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

const Card = ({ children, title, className }: IProps) => {
  return (
    <div className={cl(styles.card, className)}>
      {title && <h4 className={styles.title}>{title}</h4>}
      {children}
    </div>
  );
};

export default Card;
