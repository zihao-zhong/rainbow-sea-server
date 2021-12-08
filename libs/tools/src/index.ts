/**
 * 获取六位数的验证码
 * @param codeLen {number} 生成验证码的长度
 */
export function getAuthCode(codeLen = 6): string {
  //所有候选组成验证码的字符
  const selectChar: Array<string | number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  return Array(codeLen)
    .fill('')
    .map(() => selectChar[Math.floor(Math.random() * selectChar.length)])
    .join('');
}

