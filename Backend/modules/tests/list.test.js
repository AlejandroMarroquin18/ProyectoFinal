const { createList, getList, deleteList } = require('../list/listService');

// Almacena las pruebas creadas durante los test para eliminarlas luego.
let createdLists = [];

describe('List Service', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  //Elimina cada lista de prueba para la realización de futuras pruebas.
  afterEach(async () => {
    for (const listName of createdLists) {
      try {
        await deleteList(listName);
        console.log(`Lista '${listName}' eliminada exitosamente`);
      } catch (error) {
        console.error(`Error al eliminar la lista '${listName}':`, error.message);
      }
    }
    createdLists = []; 
  });

  // Test para crear una nueva lista (CreateList).
  test('createList debería crear una nueva lista', async () => {
    const listName = 'New Test List';
    const result = await createList(listName);
    expect(result).toContain('creada exitosamente');
    createdLists.push(listName); 
  });

  // Test para obtener una lista creada de Firebase (getList).
  test('getList debería traer una lista existente', async () => {
    const listName = 'Existing List';
    await createList(listName); 
    createdLists.push(listName);
    const result = await getList(listName);
    expect(result).toHaveProperty('name', listName);
  });

  // Test para eliminar una lista creada de Firebase (deleteList).
  test('deleteList debería borrar una lista existente', async () => {
    const listName = 'Delete List';
    await createList(listName); 
    createdLists.push(listName); 
    const result = await deleteList(listName);
    expect(result).toContain('eliminada exitosamente');
  });
});

