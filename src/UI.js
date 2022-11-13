const MissionUtils = require("@woowacourse/mission-utils");
const ErrorCase = require("./ErrorCase");

const CASH_INPUT_MESSAGE = "구입금액을 입력해 주세요.\n";
const WINNING_NUMBERS_INPUT_MESSAGE = "당첨 번호를 입력해 주세요.\n";

const PURCHASE_AMOUNT_NOTICE_MESSAGE = "개를 구매했습니다.";

const CASH_INPUT_ERROR_MESSAGE = "[ERROR] 잘못된 금액입니다. 금액은 숫자로 입력해주세요.";
const WINNING_NUMBERS_ERROR_MESSAGE = "[ERROR] 1부터 45까지의 정수 중 중복되지 않는 수 6개를 쉼표로 분리해 입력해주세요.";

const getUserInput = (message, errorHandler) => {
  return new Promise((resolve, reject) =>
    MissionUtils.Console.readLine(message, (userInput) => {
      const isWrongInput = errorHandler(userInput);
      if (isWrongInput) reject();

      UI.makeSpaceAfterSection();

      resolve(userInput);
    })
  );
};

class UI {
  static makeSpaceAfterSection() {
    MissionUtils.Console.print("");
  }

  static async getCash() {
    try {
      const cash = await getUserInput(CASH_INPUT_MESSAGE, ErrorCase.isWrongCashInput);

      return cash;
    } catch {
      throw new Error(CASH_INPUT_ERROR_MESSAGE);
    }
  }

  static printPurchasedLottoAmount(purchased) {
    MissionUtils.Console.print(purchased.amount + PURCHASE_AMOUNT_NOTICE_MESSAGE);
  }

  static printPurchasedLottoList(purchased) {
    purchased.lottoArray.forEach((lotto) => {
      const lottoNumbers = lotto.showNumbers();
      MissionUtils.Console.print(lottoNumbers);
    });
  }

  static printPurchasedLottoStatus(purchased) {
    UI.printPurchasedLottoAmount(purchased);
    UI.printPurchasedLottoList(purchased);

    UI.makeSpaceAfterSection();
  }

  static async getBasicWinningNumbers() {
    try {
      const winningNumbers = await getUserInput(WINNING_NUMBERS_INPUT_MESSAGE, ErrorCase.isWrongWinningNumbersInput);

      return winningNumbers;
    } catch {
      throw new Error(WINNING_NUMBERS_ERROR_MESSAGE);
    }
  }
}

module.exports = UI;
