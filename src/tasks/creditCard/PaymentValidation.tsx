import { useState } from "react";
import "./PaymentValidation.css";

const CURRENT_YEAR = new Date().getFullYear();

const initialFields = {
  number: "",
  name: "",
  month: "",
  year: "",
  cvv: "",
};

type FieldKey = keyof typeof initialFields;

const validators = {
  number: (value: string) => /^\d{16}$/.test(value),
  name: (value: string) => /^[a-zA-Z]+$/.test(value),
  month: (value: string) => /^(0[1-9]|1[0-2])$/.test(value),
  year: (value: string) => {
    if (!/^\d{4}$/.test(value)) {
      return false;
    }
    const year = Number(value);
    return year >= CURRENT_YEAR && year <= CURRENT_YEAR + 3;
  },
  cvv: (value: string) => /^\d{3}$/.test(value),
};

const errorMessages = {
  number: "Invalid Card Number",
  name: "Invalid Card Name",
  month: "Invalid Month",
  year: "Invalid Year",
  cvv: "Invalid CVV",
};

const errorTestIds = {
  number: "numberInputError",
  name: "nameInputError",
  month: "monthInputError",
  year: "yearInputError",
  cvv: "cvvInputError",
};

const FIELD_KEYS: FieldKey[] = ["number", "name", "month", "year", "cvv"];

const createInitialErrors = () => ({
  number: { touched: false, hasError: false },
  name: { touched: false, hasError: false },
  month: { touched: false, hasError: false },
  year: { touched: false, hasError: false },
  cvv: { touched: false, hasError: false },
});

const PaymentValidation = () => {
  const [fields, setFields] = useState(() => ({ ...initialFields }));
  const [errors, setErrors] = useState(createInitialErrors);

  const allValid = FIELD_KEYS.every((field) => validators[field](fields[field]));
  const allTouched = FIELD_KEYS.every((field) => errors[field]?.touched);
  const submitEnabled = allValid && allTouched;

  const updateField = (field: FieldKey, value: string) => {
    if (!validators[field]) {
      return;
    }

    setFields((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({
      ...prev,
      [field]: { touched: true, hasError: !validators[field](value) },
    }));
  };

  const displayCardNumber = fields.number || "XXXXXXXXXXXXXXX";
  const displayHolderName = fields.name || "HOLDER NAME";
  const displayExpiry =
    fields.month || fields.year
      ? `${fields.month || "MM"}/${fields.year || "YYYY"}`
      : "MM/YYYY";
  const displayCvv = fields.cvv || "CVV";

  return (
    <div className="layout-column align-items-center">
      <div className="card outlined" style={{ width: "650px" }}>
        <div data-testid="debit-card" className="debit-card">
          <h3>Card Details</h3>
          <span className="debit-card-bank-name">Bank Name</span>
          <span className="debit-card-number">{displayCardNumber}</span>
          <div className="debit-card-stripe"></div>
          <span className="debit-card-holder-name">{displayHolderName}</span>
          <span className="debit-card-expiry">{displayExpiry}</span>
          <span className="debit-card-cvv">{displayCvv}</span>
        </div>
        <section className="pa-50">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="layout-column mb-15">
              <input
                placeholder="Card Number"
                data-testid="numberInput"
                value={fields.number}
                onChange={(e) => updateField("number", e.target.value)}
                onBlur={() => updateField("number", fields.number)}
              />
              {errors.number?.touched && errors.number?.hasError && (
                <p className="invalid-text" data-testid={errorTestIds.number}>
                  {errorMessages.number}
                </p>
              )}
            </div>
            <div className="layout-column mb-15">
              <input
                placeholder="Name On Card"
                data-testid="nameInput"
                value={fields.name}
                onChange={(e) => updateField("name", e.target.value)}
                onBlur={() => updateField("name", fields.name)}
              />
              {errors.name?.touched && errors.name?.hasError && (
                <p className="invalid-text" data-testid={errorTestIds.name}>
                  {errorMessages.name}
                </p>
              )}
            </div>
            <div className="flex justify-content-around align-items-center mb-30">
              <div className="layout-column mb-15">
                <input
                  placeholder="Expiry Month"
                  data-testid="monthInput"
                  value={fields.month}
                  onChange={(e) => updateField("month", e.target.value)}
                  onBlur={() => updateField("month", fields.month)}
                />
                {errors.month?.touched && errors.month?.hasError && (
                  <p className="invalid-text" data-testid={errorTestIds.month}>
                    {errorMessages.month}
                  </p>
                )}
              </div>
              <div className="layout-column mb-15">
                <input
                  placeholder="Expiry Year"
                  data-testid="yearInput"
                  value={fields.year}
                  onChange={(e) => updateField("year", e.target.value)}
                  onBlur={() => updateField("year", fields.year)}
                />
                {errors.year?.touched && errors.year?.hasError && (
                  <p className="invalid-text" data-testid={errorTestIds.year}>
                    {errorMessages.year}
                  </p>
                )}
              </div>
            </div>
            <div className="layout-column mb-30">
              <input
                placeholder="CVV"
                data-testid="cvvInput"
                value={fields.cvv}
                onChange={(e) => updateField("cvv", e.target.value)}
                onBlur={() => updateField("cvv", fields.cvv)}
              />
              {errors.cvv?.touched && errors.cvv?.hasError && (
                <p className="invalid-text" data-testid={errorTestIds.cvv}>
                  {errorMessages.cvv}
                </p>
              )}
            </div>
            <div className="layout-column mb-30">
              <button
                type="submit"
                className="mx-0"
                data-testid="submit-button"
                disabled={!submitEnabled}
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default PaymentValidation;
