import { tryCall } from "../components/tryCall";

function invalidType(type: never): never {
  throw new Error(`Invalid type: ${type}`);
}

function processType(type: "cat" | "dog") {
  switch (type) {
    case "cat":
      return "This is a cat";
    case "dog":
      return "This is a dog";
    default:
      // safety-check - TS will complain if not every possible type is handled, but yet this will still protect us
      //   at runtime if someone manages to pass a value other than cat/dog
      invalidType(type);
  }
}

const EscapePage = () => (
  <div>
    <h3>Valid value: cat</h3>
    {tryCall(() => processType("cat"))}
    <h3>Valid value: dog</h3>
    {tryCall(() => processType("dog"))}
    <h3>
      Use <code>any</code> to pass an invalid value to the method
    </h3>
    {tryCall(() => processType("bird" as any))}
    <h3>
      Can also use <code>unknown</code> plus a cast to a valid value to pass an
      invalid value to the method
    </h3>
    {tryCall(() => processType("bird" as unknown as "cat"))}
  </div>
);

export default EscapePage;
