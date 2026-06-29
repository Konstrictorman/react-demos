# React: Payment Validation

Complete a component that accepts and validates credit card information. The component should display a live debit-card preview and a form with real-time validation.

**Primary file:** `PaymentValidation.jsx` (with companion `PaymentValidation.css`)

---

## Overview

Build a React component that:

1. Renders a visual debit card that reflects the user's input (card number, holder name, expiry, CVV).
2. Provides form fields for card details.
3. Validates each field and shows field-specific error messages when invalid.
4. Controls the submit button based on validation state and whether fields have been touched.

---

## UI Structure

### Debit card preview

The component includes a debit card display area (`data-testid="debit-card"`) showing:

- **Bank Name** (top left)
- **Card Number** (center; placeholder `XXXXXXXXXXXXXXX` when empty)
- **Holder Name** (bottom left)
- **Expiry Date** (bottom center, format `MM/YYYY`)
- **CVV** (bottom right)

These values should update as the user types in the corresponding form fields.

### Form fields

| Field        | Placeholder    | Test ID         |
| ------------ | -------------- | --------------- |
| Card Number  | `Card Number`  | `numberInput`   |
| Name On Card | `Name On Card` | `nameInput`     |
| Expiry Month | `Expiry Month` | `monthInput`    |
| Expiry Year  | `Expiry Year`  | `yearInput`     |
| CVV          | `CVV`          | `cvvInput`      |
| Submit       | `Submit`       | `submit-button` |

Error messages are rendered in `<p className="invalid-text">` elements below each input.

---

## Validation Rules

### Card number

- **Required**
- Must be exactly **16 digits** (numeric only)
- **Error message:** `Invalid Card Number`
- **Error element:** `<p data-testid="numberInputError">Invalid Card Number</p>`

### Cardholder name

- **Required**
- Must contain **English letters only** (no digits or special characters)
- **Error message:** `Invalid Card Name`
- **Error element:** `<p data-testid="nameInputError">Invalid Card Name</p>`

### Expiration month

- **Required**
- Must be exactly **2 digits** with a value from **01** to **12** (January–December)
- **Error message:** `Invalid Month`
- **Error element:** `<p data-testid="monthInputError">Invalid Month</p>`

### Expiration year

- **Required**
- Must be exactly **4 digits**
- Must be **greater than or equal to the current year** and **no more than 3 years in the future**
  - Example: if the current year is 2026, valid years are 2026–2029
- **Error message:** `Invalid Year`
- **Error element:** `<p data-testid="yearInputError">Invalid Year</p>`

### CVV / CVC

- **Required**
- Must be exactly **3 digits**
- **Error message:** `Invalid CVV`
- **Error element:** `<p data-testid="cvvInputError">Invalid CVV</p>`

---

## Submit Button Behavior

The submit button (`data-testid="submit-button"`) must follow these rules:

1. **Disabled by default** on initial render.
2. **Disabled** when any field is invalid.
3. **Enabled** only when **all fields are valid** and **all fields have been touched** (interacted with by the user).

The form should call `e.preventDefault()` on submit.

---

## Required Test IDs

Do **not** change the following `data-testid` attributes (they are required for automated tests):

### Inputs

| Element                | `data-testid`   |
| ---------------------- | --------------- |
| Card number input      | `numberInput`   |
| Cardholder name input  | `nameInput`     |
| Expiration month input | `monthInput`    |
| Expiration year input  | `yearInput`     |
| CVV / CVC input        | `cvvInput`      |
| Submit button          | `submit-button` |
| Debit card preview     | `debit-card`    |

### Error message elements

| Element                | `data-testid`      |
| ---------------------- | ------------------ |
| Card number error      | `numberInputError` |
| Cardholder name error  | `nameInputError`   |
| Expiration month error | `monthInputError`  |
| Expiration year error  | `yearInputError`   |
| CVV error              | `cvvInputError`    |

---

## Constraints

- Do **not** modify the existing `data-testid` attributes, CSS classes, or element IDs used for rendering and testing.
- Preserve the provided layout structure and CSS class names (e.g. `layout-column`, `invalid-text`, `debit-card-stripe`, etc.).
- Error messages should only be visible when the corresponding field is invalid (and typically after the field has been touched).

---

## Expected Invalid State (Reference)

When fields contain invalid values, red error messages appear below each input:

- `98761234` → **Invalid Card Number** (not 16 digits)
- Empty or invalid name → **Invalid Card Name**
- Invalid month → **Invalid Month**
- Invalid year → **Invalid Year**
- Invalid CVV → **Invalid CVV**

The submit button remains disabled until every field passes validation and has been touched.
