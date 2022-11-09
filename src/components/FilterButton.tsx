import { ReactElement } from 'react';
import { Filter } from 'types';

interface FilterButtonProps {
  title: Filter;
  isActive: boolean;
  onClick: (clickedButton: Filter) => void;
}

export default function FilterButton({
  title,
  isActive,
  onClick,
}: FilterButtonProps): ReactElement {
  return (
    <button
      id={`todo-filter-${title}`}
      className={isActive ? 'button active' : 'button clickable'}
      onClick={() => onClick(title)}
      style={{ marginRight: '1rem' }}
    >
      Show {title}
    </button>
  );
}
