import { Separator } from "./ui/separator";

const QuestionSection = ({ userQuestion }) => {
  return (
    <div className="p-2">
      <div className="font-bold text-2xl">{userQuestion.questionTitle}</div>
      <Separator className="my-3 " />
      <div dangerouslySetInnerHTML={{ __html: userQuestion.question }} />
    </div>
  );
};

export default QuestionSection;
