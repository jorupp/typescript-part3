import { forwardRef, useEffect, useRef } from "react";

type Props = {
  label: string;
};

const Search = ({ label }: Props) => {
  return (
    <div>
      <label htmlFor="search">{label}</label>
      <input type="search" id="search" />
    </div>
  );
};

const SearchWithRef = forwardRef<HTMLInputElement, Props>(
  function SearchWithRefInner({ label }: Props, ref) {
    return (
      <div>
        <label htmlFor="search">{label}</label>
        <input type="search" id="search" ref={ref} />
      </div>
    );
  }
);

const RefPage = () => {
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, []);

  return (
    <div>
      <input type="text" />
      {/* this isn't valid because `Search` doesn't have a `ref` parameter */}
      {/* <Search label="search" ref={input} /> */}
      <SearchWithRef label="search" ref={input} />
      <input type="text" />
    </div>
  );
};

export default RefPage;
