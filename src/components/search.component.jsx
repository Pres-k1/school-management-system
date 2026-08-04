import { useEffect, useMemo, useRef, useState } from "react";
import "../styles/search.styles.css";

function SearchComponent({
  value,
  defaultValue = "",
  onChange,
  onClear,
  onSelect,
  suggestions = [],
  placeholder = "Search...",
  ariaLabel = "Search",
  className = "",
  size = "md",
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);

  const isControlled = value !== undefined;
  const searchValue = isControlled ? value : internalValue;

  const filteredSuggestions = useMemo(() => {
    if (!Array.isArray(suggestions) || suggestions.length === 0) {
      return [];
    }

    const needle = searchValue.trim().toLowerCase();

    const items = suggestions.filter((item) => {
      const label = String(item).trim();
      if (!label) return false;
      if (!needle) return true;
      return label.toLowerCase().includes(needle);
    });

    return items.slice(0, 6);
  }, [searchValue, suggestions]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [searchValue]);

  function updateValue(nextValue) {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
  }

  function clearValue() {
    updateValue("");
    onClear?.();
    inputRef.current?.focus();
  }

  function handleSelect(item) {
    const nextValue = String(item);
    updateValue(nextValue);
    onSelect?.(nextValue);
    setIsFocused(false);
  }

  function handleKeyDown(event) {
    if (!filteredSuggestions.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredSuggestions.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? filteredSuggestions.length - 1 : prev - 1));
      return;
    }

    if (event.key === "Enter") {
      if (activeIndex >= 0) {
        event.preventDefault();
        handleSelect(filteredSuggestions[activeIndex]);
      }
      return;
    }

    if (event.key === "Escape") {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div className={`search-shell search-shell--${size} ${className}`.trim()}>
      <label className={`search-field ${isFocused ? "is-focused" : ""}`}>
        <span className="search-field__icon" aria-hidden="true">
          ⌕
        </span>

        <input
          ref={inputRef}
          type="text"
          className="search-field__input"
          value={searchValue}
          placeholder={placeholder}
          aria-label={ariaLabel}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 120)}
          onKeyDown={handleKeyDown}
          onChange={(event) => updateValue(event.target.value)}
        />

        {searchValue ? (
          <button
            type="button"
            className="search-field__clear"
            aria-label="Clear search"
            onClick={clearValue}
          >
            ×
          </button>
        ) : (
          <span className="search-field__hint">Search</span>
        )}
      </label>

      {isFocused && filteredSuggestions.length > 0 && (
        <ul className="search-suggestions" role="listbox" aria-label="Search suggestions">
          {filteredSuggestions.map((item, index) => (
            <li key={`${item}-${index}`} className="search-suggestion-item">
              <button
                type="button"
                className={`search-suggestion ${index === activeIndex ? "is-active" : ""}`}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect(item)}
              >
                <span className="search-suggestion__icon" aria-hidden="true">
                  ↳
                </span>
                <span>{item}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchComponent;
