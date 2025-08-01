import React from 'react';
import { useTheme } from 'next-themes';

interface FilterPanelProps {
  filterType: '' | 'severity' | 'hostname' | 'message' | 'date';
  filterValue: string;
  setFilterType: (type: '' | 'severity' | 'hostname' | 'message' | 'date') => void;
  setFilterValue: (value: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filterType, filterValue, setFilterType, setFilterValue }) => {
  const { theme } = useTheme();

  const baseClass = 'border p-2 rounded';
  const lightClass = 'bg-white text-black';
  const darkClass = 'bg-gray-800 text-white';

  const containerClass = `${baseClass} ${theme === 'dark' ? darkClass : lightClass}`;

  return (
    <div className={`flex flex-wrap gap-4 p-4 rounded shadow items-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <select
        value={filterType}
        onChange={(e) => {
          setFilterType(e.target.value as any);
          setFilterValue('');
        }}
        className={containerClass}
      >
        <option value="">Filter by...</option>
        <option value="severity">Severity</option>
        <option value="hostname">Hostname</option>
        <option value="message">Message</option>
        <option value="date">Date</option>
      </select>
      {filterType === 'severity' && (
        <select
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className={containerClass}
        >
          <option value="">Select severity</option>
          <option value="critical">Critical</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
          <option value="success">Success</option>
        </select>
      )}
      {(filterType === 'hostname' || filterType === 'message') && (
        <input
          type="text"
          placeholder={`Filter by ${filterType}`}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className={`${containerClass} flex-grow min-w-[200px]`}
        />
      )}
      {filterType === 'date' && (
        <input
          type="date"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className={containerClass}
        />
      )}
    </div>
  );
};

export default FilterPanel;
