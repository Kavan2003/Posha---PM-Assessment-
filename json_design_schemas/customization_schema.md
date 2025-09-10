# The Customization JSON Schema (LLM Response)

This schema defines the structure of the JSON object that the AI model returns after processing a user's natural language request. It is designed to be programmatically applied to the main Recipe JSON to create the customised version.

---

##### **Top-Level Object**

| Field | Type | Description |
| :--- | :--- | :--- |
| `status` | Object | **[CRITICAL]** An object indicating the outcome of the parsing attempt. See Status Object below. |
| `customisations` | Array<Object> | An array of all identified and valid customisation intents. Will be an empty array if status is "failure". See Customisation Object below. |
| `original_request`| String | A direct copy of the user's raw text input, useful for logging and debugging. |

---

##### **Status Object**

This object provides a clear indication of success or failure for the entire request.

| Field | Type | Description |
| :--- | :--- | :--- |
| `state` | String | The overall outcome. **Required.** Options: `"success"`, `"failure"`. |
| `reason` | String | `null` on success. On failure, it provides a machine-readable error code. **Required.** Options: `"ambiguous_request"`, `"unsupported_intent"`, `"invalid_ingredient"`. |

---

##### **Customization Object**

Each object in the `customisations` array represents one specific change requested by the user.

| Field | Type | Description |
| :--- | :--- | :--- |
| `intent` | String | **[CRITICAL]** The core action the user wants to perform. **Required.** Options: `"remove_ingredient"`, `"add_ingredient"`, `"substitute_ingredient"`, `"adjust_quantity"`. |
| `target_ingredient`| String | The name of the existing ingredient to be acted upon. **Required** for all intents except `add_ingredient`. |
| `new_ingredient` | Object | An object describing the ingredient to be added or used as a substitute. **Required** for `add_ingredient` and `substitute_ingredient`. See New Ingredient Object below. |
| `modifier` | String | The desired change in quantity. **Required** for `adjust_quantity`. Options: `"less"`, `"more"`, `"half"`, `"double"`. |

---

##### **New Ingredient Object**

This object defines the properties of an ingredient being added or substituted into the recipe.

| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | The name of the new ingredient (e.g., "Olive Oil"). |
| `quantity` | Number | The numeric value for the amount. |
| `unit` | String | The unit of measurement (e.g., "tbsp", "cloves"). |

##### Example 1: A Successful Multi-Step Request
This shows how the system handles multiple, valid requests in a single sentence.

User Input: "No chicken, use olive oil instead of butter, and add more salt"

LLM JSON Output:

```JSON

{
  "status": {
    "state": "success",
    "reason": null
  },
  "customisations": [
    {
      "intent": "remove_ingredient",
      "target_ingredient": "Boneless Chicken Thighs"
    },
    {
      "intent": "substitute_ingredient",
      "target_ingredient": "Unsalted Butter",
      "new_ingredient": {
        "name": "Olive Oil",
        "quantity": 3,
        "unit": "tbsp"
      }
    },
    {
      "intent": "adjust_quantity",
      "target_ingredient": "Salt",
      "modifier": "more"
    }
  ],
  "original_request": "no chicken, use olive oil instead of butter, and add more salt"
}
```
##### Example 2: A Successful Single Request with a New Ingredient
This shows how the system handles a simple addition of a new ingredient with a quantity.

User Input: "Can you add 2 cloves of garlic?"

LLM JSON Output:

```json

{
  "status": {
    "state": "success",
    "reason": null
  },
  "customizations": [
    {
      "intent": "add_ingredient",
      "new_ingredient": {
        "name": "Garlic",
        "quantity": 2,
        "unit": "cloves",
        "notes": "Minced"
      }
    }
  ],
  "original_request": "can you add 2 cloves of garlic"
}
```
##### Example 3: A Failed Request Due to Ambiguity
This shows how the system gracefully handles a subjective and unsupported request.

User Input: "make it taste better"

LLM JSON Output:

```json

{
  "status": {
    "state": "failure",
    "reason": "ambiguous_request"
  },
  "customisations": [],
  "original_request": "make it taste better"
}
```
