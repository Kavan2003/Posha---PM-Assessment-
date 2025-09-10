# Posha-PM-Assessment

## Which intents you chose and why.
## How to run your solution.
## Limitations and edge cases.
* **No Downstream Logic:** This MVP is only responsible for parsing user intent. It does not calculate the downstream effects of a change, such as adjusting cooking times or temperatures. A V2 would require a separate "Recipe Engine" to calculate these adjustments based on the structured JSON input.

* **No Culinary Validation:**
    * **Limitation:** The system currently trusts the user completely and does not perform a "recipe sanity check." A user can request to "remove all ingredients," and the system will generate that intent.
    * **Reasoning:** The MVP's core job is to prove we can reliably translate natural language into a structured format. Culinary validation is a separate, complex problem that would require building a sophisticated rules engine, which is out of scope for the initial build.
    * **Next Step:** A V2 would require a "Recipe Sanity Check" module to warn users about requests that might result in a broken or unpalatable dish.

* **Complex Intent Handling (e.g., "Make it Vegetarian"):**
    * **Limitation:** The MVP intentionally does not handle broad, multi-step intents like "make it vegetarian."
    * **Reasoning:** A request like "remove chicken" is a single, simple action. A request like "make it vegetarian" is a complex command that requires a higher level of logic:
        1.  `REMOVE` the chicken.
        2.  `SUBSTITUTE` with a contextually appropriate protein (e.g., paneer, which the AI would have to infer).
        3.  `CHECK` if other ingredients (like white wine) are vegetarian-friendly.
        4.  Potentially `ADJUST` cooking times for the new ingredient.
        This is not one intent; it's a bundle of them. To ensure a reliable MVP, I focused on solving the core, single-step intents first.
    * **Next Step:** A future version would build a dedicated `dietary_preference` intent that can intelligently orchestrate these multiple steps.

* **Ambiguity & Subjectivity:**
    * **Limitation:** The model will struggle with highly ambiguous requests like "make it healthier" or "make it taste better."
    * **Reasoning:** The goal is to solve for clear, objective intents first. Handling subjective requests requires a more advanced clarification and dialogue management system, which is beyond the scope of a core MVP.
    * **Next Step:** A V2 would build a clarification module that responds with questions like, "When you say 'healthier,' do you mean fewer calories, less salt, or a substitute for dairy cream?"
## If you had 2 more weeks, what you’d add next.
