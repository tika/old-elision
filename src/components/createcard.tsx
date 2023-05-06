import { FormattedInput, Input } from "./elisioninput";

export function CreateCard(
  props: Flashcard & { onChange: (card: Flashcard) => void }
) {
  return (
    <div className="border py-8 px-8 rounded-lg">
      {/* <Input
        label="Term"
        placeholder="Enter your term here..."
        value={props.term}
        onChange={(val) =>
          props.onChange({
            definition: props.definition,
            term: val,
          })
        }
      /> */}
      <FormattedInput />
      <div className="py-4" />
      <Input
        label="Definition"
        placeholder="Enter your definition here..."
        value={props.definition}
        onChange={(val) => {
          props.onChange({
            definition: val,
            term: props.term,
          });
        }}
      />
    </div>
  );
}
