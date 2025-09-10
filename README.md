# Posha-PM-Assessment

## Which intents you chose and why.
## How to run your solution.
## Limitations and edge cases.
  This MVP is a focused first step, and as such, it has several intentional limitations. Acknowledging these is key to defining the roadmap for a more robust V2.

* **No Culinary Validation:** The system currently trusts the user completely. It does not perform a "recipe sanity check." A user can request to "remove all ingredients" or "use no salt," and the system will generate that intent. Building a guardrail to warn users about requests that might break a recipe is a critical next step.

* **Ambiguity Handling:** The model will struggle with highly ambiguous or subjective requests like "make it healthier" or "cook it like my mom does." A future version would need a clarification module to handle such inputs.

* **Statelessness:** The current implementation is stateless. It processes each request independently and has no memory of a user's long-term dietary preferences (e.g., vegan, gluten-free). Integrating with a user profile to check for contradictions is a feature for a more advanced version.

* **Best-Effort Quantity Parsing:** The model's ability to extract precise quantities for new ingredients (e.g., "add **2 cloves of** garlic") is a best-effort attempt and may not always be perfectly accurate.
## If you had 2 more weeks, what you’d add next.
