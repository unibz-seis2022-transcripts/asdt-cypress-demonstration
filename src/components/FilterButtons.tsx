import { ReactElement } from 'react';
import { Filter, filters } from 'types';
import FilterButton from './FilterButton';

interface FilterButtonsProps {
  activeButton: Filter;
  onButtonClick: (clickedButton: Filter) => void;
}

export default function FilterButtons({
  activeButton,
  onButtonClick,
}: FilterButtonsProps): ReactElement {
  return (
    <>
      {filters.map(filter => (
        <FilterButton
          title={filter}
          isActive={activeButton === filter}
          onClick={onButtonClick}
        />
      ))}
    </>
  );
}
