export function getAuthErrorMessage(message: string) {
  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes("invalid login credentials")) {
    return "이메일 또는 비밀번호가 올바르지 않습니다.";
  }

  if (normalizedMessage.includes("email not confirmed")) {
    return "이메일 인증을 완료한 뒤 로그인해주세요.";
  }

  if (normalizedMessage.includes("user already registered") || normalizedMessage.includes("already registered")) {
    return "이미 가입된 이메일입니다. 로그인으로 진행해주세요.";
  }

  if (normalizedMessage.includes("password") && normalizedMessage.includes("6")) {
    return "비밀번호는 6자 이상 입력해주세요.";
  }

  if (normalizedMessage.includes("signup is disabled")) {
    return "현재 회원가입이 비활성화되어 있습니다. Supabase Auth 설정을 확인해주세요.";
  }

  if (normalizedMessage.includes("email")) {
    return "이메일 형식을 확인해주세요.";
  }

  return "요청을 처리하지 못했습니다. 입력값을 확인한 뒤 다시 시도해주세요.";
}
