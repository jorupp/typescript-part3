// we can refer to custom elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      customfooter: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
const CustomFooter = () => (
  <div>
    This is a React component that outputs a HTML <code>div</code> element
  </div>
);
const lowerCaseCustomFooter = () => <div />;

const newCustomHtmlElement = <customfooter />;
const newReactElement = <CustomFooter />;

// not allowed because it doesn't exist on JSX.IntrinsicElements even though it's a functional component
// const newLowercaseReactElement = <lowerCaseCustomFooter/>;

const page = () => {
  return (
    <>
      <h3>CustomFooter</h3>
      <CustomFooter />
      <h3>customfooter</h3>
      <customfooter>
        This is a custom HTML element named <code>customfooter</code>
      </customfooter>
    </>
  );
};

export default page;
