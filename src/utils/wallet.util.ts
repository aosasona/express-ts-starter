import randToken from "rand-token";
import walletConfig from "@configs/wallet.config";
import CustomException from "./handlers/error.handler";
import axios from "axios";

/////   Generate  /////
const generate = {
  ref: {
    deposit: () => {
      const txRef =
        walletConfig.constants.TXREF_DEPOSIT_PREFIX +
        randToken.generate(walletConfig.constants.TXREF_LENGTH);
      return txRef;
    },
    withdraw: () => {
      const txRef =
        walletConfig.constants.TXREF_WITHDRAW_PREFIX +
        randToken.generate(walletConfig.constants.TXREF_LENGTH);
      return txRef;
    },
    transfer: () => {
      const txRef =
        walletConfig.constants.TXREF_TRANSFER_PREFIX +
        randToken.generate(walletConfig.constants.TXREF_LENGTH);
    },
  },
};

/////  Validate /////

const validate = {
  //  Validate country
  country: (country: string) => {
    if (!country) throw new CustomException(400, "Please provide a country");
    country = country?.toUpperCase()?.trim();
    if (walletConfig.countries.includes(country)) {
      return true;
    } else {
      return false;
    }
  },

  //  Validate currency
  currency: (currency: string) => {
    if (!currency) throw new CustomException(400, "Please provide a currency");
    currency = currency?.toUpperCase()?.trim();
    if (walletConfig.currency[currency]) {
      return true;
    } else {
      return false;
    }
  },

  //  Validate amount
  amount: (amount: number) => {
    if (!amount) throw new CustomException(400, "Please provide an amount");
    if (isNaN(Number(amount)))
      throw new CustomException(400, "Amount must be a number");
    if (amount < 0) throw new CustomException(400, "Amount must be positive");
    if (amount > 1000000)
      throw new CustomException(400, "Amount must be less than 1,000,000");
    return true;
  },
};

/////  Get currency-country /////
const get = {
  // Get currency from country
  currency: (country: string) => {
    country = country?.toUpperCase()?.trim();
    if (!validate.country(country)) {
      throw new CustomException(400, "Invalid country!");
    }
    return walletConfig.country[country];
  },

  // Get country from currency

  country: (currency: string) => {
    currency = currency?.toUpperCase()?.trim();
    if (!validate.currency(currency)) {
      throw new CustomException(400, "Invalid currency!");
    }
    return walletConfig.currency[currency];
  },

  // Exchange currency to USD
  exchange: async (amount: number, base: string, target: string = "USD") => {
    const request = `${walletConfig.apiLayer.baseUrl}/convert?from=${base}&to=${target}&amount=${amount}`;

    const { data } = await axios.get(request, {
      headers: { apiKey: walletConfig.apiLayer.key },
    });

    if (!data) throw new CustomException(500, "Server error!");

    return data;
  },
};

//  Exports
const walletUtil = {
  generate,
  validate,
  get,
};

export default walletUtil;
