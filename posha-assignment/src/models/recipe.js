// Recipe model (dummy data for now)
export const recipes = [
  {
    recipe_id: 'p-001',
    name: 'Creamy Pasta with Chicken and Mushrooms',
    description: 'A rich and savoury one-pot pasta dish, perfect for a weeknight dinner.',
    ingredients: [
      { name: 'Penne Pasta', quantity: 280, unit: 'g' },
      { name: 'Button Mushroom', quantity: 200, unit: 'g' },
      { name: 'Boneless Chicken Thighs', quantity: 500, unit: 'g' },
      { name: 'Unsalted Butter', quantity: 3, unit: 'tbsp' },
      { name: 'White Wine', quantity: 60, unit: 'g' },
      { name: 'Dairy Cream Cheese', quantity: 35, unit: 'g' },
      { name: 'Parmesan Cheese', quantity: 30, unit: 'g' },
      { name: 'Oil', quantity: 25, unit: 'ml' },
      { name: 'Water', quantity: 1100, unit: 'ml' },
      { name: 'Salt', quantity: 6, unit: 'g' },
      { name: 'Black Pepper', quantity: 3, unit: 'g' },
      { name: 'Dried Herb Mix', quantity: 15, unit: 'g' }
    ],
    steps: [
      { step_number: 1, description: 'Heat oil in a large pan over medium-high heat' },
      { step_number: 2, description: 'Add mushrooms and butter, sauté until golden brown' },
      { step_number: 3, description: 'Add chicken pieces and cook until browned on all sides' },
      { step_number: 4, description: 'Season with half the salt and black pepper' },
      { step_number: 5, description: 'Add remaining salt and mix well' },
      { step_number: 6, description: 'Add pasta to the pan with the chicken and mushrooms' },
      { step_number: 7, description: 'Pour in water and bring to a boil' },
      { step_number: 8, description: 'Reduce heat and simmer for 10-12 minutes' },
      { step_number: 9, description: 'Cook pasta until al dente, stirring occasionally' },
      { step_number: 10, description: 'Add white wine and let it reduce for 2 minutes' },
      { step_number: 11, description: 'Stir in cream cheese and parmesan until melted' },
      { step_number: 12, description: 'Add dried herb mix and stir to combine' },
      { step_number: 13, description: 'Simmer for 2-3 more minutes until sauce thickens, then serve hot' }
    ]
  }
];
