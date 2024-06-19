import {
  initialState,
  addIngredient,
  removeIngredient,
  clearBurgerConstructor,
  burgerConstructorReducer
} from './burgerConstructorSlice';

describe('Тестирование burgerConstructorSlice', () => {
  const mockState = {
    ...initialState,
    bun: {
      id: '1',
      _id: '1',
      name: 'test',
      type: 'bun',
      proteins: 100,
      fat: 100,
      carbohydrates: 100,
      calories: 100,
      price: 100,
      image: 'image',
      image_mobile: 'image_mobile',
      image_large: 'image_large',
      __v: 0
    },
    ingredients: [
      {
        id: '2',
        _id: '2',
        name: 'test',
        type: 'main',
        proteins: 100,
        fat: 100,
        carbohydrates: 100,
        calories: 100,
        price: 100,
        image: 'image',
        image_mobile: 'image_mobile',
        image_large: 'image_large',
        __v: 0
      },
      {
        id: '3',
        _id: '3',
        name: 'test',
        type: 'sauce',
        proteins: 100,
        fat: 100,
        carbohydrates: 100,
        calories: 100,
        price: 100,
        image: 'image',
        image_mobile: 'image_mobile',
        image_large: 'image_large',
        __v: 0
      }
    ]
  };

  it('тестируем добавление ингредиента в конструктор', () => {
    const newIngredient = {
      id: '4',
      _id: '4',
      name: 'test',
      type: 'main',
      proteins: 100,
      fat: 100,
      carbohydrates: 100,
      calories: 100,
      price: 100,
      image: 'image',
      image_mobile: 'image_mobile',
      image_large: 'image_large',
      __v: 0
    };

    const oldLength = mockState.ingredients.length;
    const newState = burgerConstructorReducer(mockState, addIngredient(newIngredient));
    const addedIngredient = newState.ingredients[newState.ingredients.length - 1];

    expect(newState.ingredients.length).toBe(oldLength + 1);
    expect(addedIngredient._id).toEqual(newIngredient._id);
  });

  it('тестируем удаление ингредиента из конструктора', () => {
    const oldLength = mockState.ingredients.length;
    const deletedIngredient = mockState.ingredients[0];
    const expectedState = {
      ...mockState,
      ingredients: [...mockState.ingredients.filter((ingredient) => ingredient._id !== deletedIngredient._id)]
      
    };
    const newState = burgerConstructorReducer(mockState, removeIngredient(deletedIngredient));
    expect(newState.ingredients.length).toBe(oldLength - 1);
    expect(newState).toEqual(expectedState);
  });

  it('тестируем очистку конструктора', () => {
    const newState = burgerConstructorReducer(mockState, clearBurgerConstructor());
    expect(newState).toEqual({ ...initialState });
  });
});
