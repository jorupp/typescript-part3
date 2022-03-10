// we can refer to custom elements
declare global {
    namespace JSX {
        interface IntrinsicElements {
            customFooter: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
        }
    }
}
const CustomFooter = () => <div/>
const lowerCaseCustomFooter = () => <div/>

const newCustomHtmlElement = <customFooter/>;
const newReactElement = <CustomFooter/>;

 // not allowed because it doesn't exist on JSX.IntrinsicElements even though it's a functional component
// const newLowercaseReactElement = <lowerCaseCustomFooter/>;

export {};