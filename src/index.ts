import banksList from "./data/banksList.json";

type BankInfo = {
  id: string;
  bankName: string;
  iBan: string;
  prefixes: string[];
  logo: string;
  bgColor: string;
  textColor: string;
};

const BASE_LOGO_URL =
  "https://cdn.jsdelivr.net/gh/4limirzaei/iran-bank-assets/logos/";

function attachLogoPath(bank: BankInfo): BankInfo {
  return {
    ...bank,
    logo: BASE_LOGO_URL + bank.logo,
  };
}

function cleanIBanCode(code: string): string {
  return code.trim().replace(/^ir/i, "");
}

export function getBankByIBanCode(iBan: string): BankInfo | null {
  const cleanedCode = cleanIBanCode(iBan);
  const bank = banksList.find(
    (item) => item.iBan && cleanedCode.startsWith(item.iBan)
  );
  return bank ? attachLogoPath(bank) : null;
}

export function getBankByCardNumber(cardNumber: string): BankInfo | null {
  const bin = cardNumber.slice(0, 6);
  const bank = banksList.find((bank) => bank.prefixes.includes(bin)) || null;
  return bank ? attachLogoPath(bank) : null;
}
