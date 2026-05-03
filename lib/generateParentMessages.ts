type GenerateParentMessagesOptions = {
  academyName: string;
  signature: string;
};

export function generateParentMessages(
  studentName: string,
  parentTitle: string,
  situation: string,
  memo: string,
  options: GenerateParentMessagesOptions = { academyName: "말모아", signature: "" },
) {
  const cleanMemo = memo.trim();
  const subject = cleanMemo || "오늘 수업에서 확인한 내용을 바탕으로 학습 흐름을 정리했습니다.";
  const signature = options.signature.trim();
  const suffix = signature ? `\n\n${signature}` : "";

  return {
    shortMessage: `${parentTitle}, 안녕하세요. ${options.academyName}입니다. ${studentName} 학생의 ${situation} 관련해 안내드립니다. ${subject} 가정에서도 한 번 확인 부탁드립니다.${suffix}`,
    softMessage: `${parentTitle}, 안녕하세요. ${options.academyName}입니다.\n\n${studentName} 학생이 수업에서 보여준 모습을 바탕으로 안내드립니다. ${subject} 지금 단계에서는 부담을 주기보다 학습 흐름을 다시 잡는 것이 중요해 보여, 다음 수업에서도 필요한 부분을 차분히 점검하겠습니다.${suffix}`,
    firmMessage: `${parentTitle}, 안녕하세요. ${options.academyName}입니다.\n\n${studentName} 학생의 ${situation} 상황을 공유드립니다. ${subject} 이 부분이 반복되면 학습 흐름이 끊길 수 있어, 이번 주 안에 필요한 정리와 확인이 이루어지면 좋겠습니다. 수업에서도 이어서 점검하겠습니다.${suffix}`,
  };
}
