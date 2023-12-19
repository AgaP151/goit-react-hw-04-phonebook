import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import styled from 'styled-components';

import { FilterWrapper } from './Filter.styled';

import { Label } from '../ContactForm/ContactForm.styled';

const FilterInput = styled(DebounceInput)`
  min-width: 50%;
  border-radius: 8px;
  font-size: 20px;
  placeholder: grey;
  padding: 12px 16px;
  margin-left: 16px;
  box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #fff;
`;

export const Filter = ({ value, onChange }) => {
  return (
    <FilterWrapper>
      <Label>
        Find contacts by name
        <FilterInput
          type="text"
          name="filter"
          placeholder="Enter contact to search"
          value={value}
          onChange={onChange}
          debounceTimeout={500}
        />
      </Label>
    </FilterWrapper>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
