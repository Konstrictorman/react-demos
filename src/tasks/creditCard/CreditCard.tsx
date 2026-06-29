import Markdown from "react-markdown";
import INSTRUCTIONS from "./INSTRUCTIONS.md?raw";
import PaymentValidation from "./PaymentValidation";

const CreditCard = () => {
  return (
    <>
      <div className="markdown-container">
        <Markdown>{INSTRUCTIONS}</Markdown>
      </div>

      <div className="task-preview">
        <PaymentValidation />
      </div>
    </>
  );
};

export default CreditCard;
